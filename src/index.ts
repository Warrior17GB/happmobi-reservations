import express from 'express';
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

app.listen(process.env.PORT || 3333, () => {
  console.log(`API execultando em http://localhost:${process.env.PORT || '3333'}`);
});