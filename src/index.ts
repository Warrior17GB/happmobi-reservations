import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import cors from 'cors';
import dotenv from 'dotenv'
import swaggerUI from 'swagger-ui-express'


import { routes } from './routes';
import swaggerDocs from './swagger.json'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use("/v1", routes);
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.status(400).json({
    status: "Error",
    message: error.message,
  })
})

app.listen(process.env.PORT || 3333, () => {
  console.log(`API execultando em http://localhost:${process.env.PORT || '3333'}`);
});