import { prisma } from "../../prisma/client";
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

interface IRequest {
    email: string;
    password: string;
}

class AuthenticateUserUseCase {
    async execute({ email, password }: IRequest) {
        const userAlreadyExist = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!userAlreadyExist) {
            throw new Error("Email ou senha incorreta.");
        }

        const passwordMatch = await compare(password, userAlreadyExist.password)

        if (!passwordMatch) {
            throw new Error("Email ou senha incorreta.");
        }

        const token = sign({}, `${process.env.PRIVATE_KEY}`, {
            subject: `${userAlreadyExist.id}`,
            expiresIn: "1d"
        })

        return { token }
    }
}

export { AuthenticateUserUseCase }