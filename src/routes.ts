import express from 'express';

export const routes = express.Router()

routes.get('/', (req, res) => {
    res.status(201).send('API no ar!');
});