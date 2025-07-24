import express from "express";
import db from "./config/database-config.js";
import routes from "./routes/routes.js";
import cors from "cors";

const app = express();
export const appPort = 3332;

app.use(
  cors({
    origin: "http://localhost:3333",
  })
);

app.use(express.json());

app.use(routes);

app.listen(appPort, () => {
  console.log(`Servidor rodando em http://localhost:${appPort}`);
});

export const appInstance = app;
