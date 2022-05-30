import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { routes } from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log(`API execultando em http://localhost:${process.env.PORT || '3333'}`);
});