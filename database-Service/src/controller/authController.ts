import { Request, Response } from 'express';
import { generateToken } from '../middleware/authMiddleware.js';

/**
 * Simula um login e gera um token JWT
 * Em uma aplicação real, você verificaria as credenciais no banco de dados
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validação básica
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username e password são obrigatórios'
      });
    }

    // *** SIMULAÇÃO DE AUTENTICAÇÃO ***
    // Em uma aplicação real, você verificaria no banco de dados
    // Por exemplo: const user = await db.one('SELECT * FROM users WHERE username = $1', [username]);
    
    // Para este exemplo, vamos aceitar qualquer usuário com senha "123456"
    if (password !== '123456') {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Dados que vão no payload do token
    const payload = {
      id: 1,
      username: username,
      role: 'user',
      iat: Math.floor(Date.now() / 1000) // timestamp de criação
    };

    // Gerar o token (expira em 24 horas)
    const token = generateToken(payload, '24h');

    console.log(`Login realizado com sucesso para usuário: ${username}`);

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      token: token,
      user: {
        id: payload.id,
        username: payload.username,
        role: payload.role
      }
    });

  } catch (error: any) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Rota protegida de exemplo que retorna dados do usuário logado
 */
export const profile = async (req: any, res: Response) => {
  try {
    // Os dados do usuário vêm do middleware de autenticação
    const user = req.user;

    res.status(200).json({
      success: true,
      message: 'Dados do perfil obtidos com sucesso',
      user: user
    });

  } catch (error: any) {
    console.error('Erro ao obter perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Validar se um token é válido (útil para verificação do frontend)
 */
export const validateToken = async (req: any, res: Response) => {
  try {
    // Se chegou até aqui, o token é válido (passou pelo middleware)
    res.status(200).json({
      success: true,
      message: 'Token válido',
      user: req.user
    });

  } catch (error: any) {
    console.error('Erro na validação do token:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};
