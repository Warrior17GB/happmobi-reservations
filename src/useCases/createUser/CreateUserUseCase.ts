import { hash } from 'bcryptjs';

import { prisma } from '../../prisma/client';

interface IUserRequest {
    email: string;
    password: string;
}

class CreateUserUseCase {
    async execute({ email, password }: IUserRequest) {
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (userAlreadyExists) {
            throw new Error("Esse usuário já está cadastrado.");
        }

        const passwordHash = await hash(password, 8);

        const user = await prisma.user.create({
            data: {
                email,
                password: passwordHash
            }
        })

        return user;
    }
}

export { CreateUserUseCase }