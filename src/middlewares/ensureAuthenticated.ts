import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({
            status: "Unauthorized",
            message: "Esse usuário não está autenticado."
        })
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, `${process.env.PRIVATE_KEY}`)

        return next();
    } catch (error) {
        return response.status(401).json({
            status: "Unauthorized",
            message: "Token inválido."
        })
    }
    
}