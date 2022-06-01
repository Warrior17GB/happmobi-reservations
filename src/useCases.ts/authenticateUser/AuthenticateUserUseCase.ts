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

        const token = sign({}, "e31ec1aa-86de-4107-a748-3e542a9574b9", {
            subject: `${userAlreadyExist.id}`,
            expiresIn: "1d"
        })

        return { token }
    }
}

export { AuthenticateUserUseCase }