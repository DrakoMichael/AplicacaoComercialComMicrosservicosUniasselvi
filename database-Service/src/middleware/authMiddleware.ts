import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Interface para estender o Request com dados do usuário
interface AuthenticatedRequest extends Request {
  user?: any;
}

// Chave secreta (em produção, deve estar no .env)
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura';

/**
 * Middleware para verificar token JWT
 */
export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Buscar o token no header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso não fornecido'
      });
    }

    // Verificar se o header está no formato correto: "Bearer token"
    const parts = authHeader.split(' ');
    
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        message: 'Formato do token inválido. Use: Bearer <token>'
      });
    }

    const token = parts[1];

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Adicionar os dados do usuário na requisição
    req.user = decoded;
    
    console.log('Token validado com sucesso para usuário:', decoded);
    
    // Continuar para a próxima função
    next();
    
  } catch (error: any) {
    console.error('Erro na verificação do token:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Erro interno na verificação do token'
    });
  }
};

/**
 * Função para gerar um token JWT (útil para login)
 */
export const generateToken = (payload: any, expiresIn: string = '1h'): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
};

/**
 * Middleware opcional - verifica token se fornecido, mas não bloqueia se não tiver
 */
export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    // Se não tem token, continua sem autenticação
    return next();
  }
  
  // Se tem token, usa a verificação normal
  verifyToken(req, res, next);
};
