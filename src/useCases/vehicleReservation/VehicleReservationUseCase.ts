import { prisma } from '../../prisma/client';

interface IReservation {
    userID: number,
    vehicleID: number
}

class VehicleReservationUseCase {
    async execute({ userID, vehicleID }: IReservation) {
        if (!userID || !vehicleID) {
            throw new Error("userID e vehicleID são obrigatórios.")
        }

        if (isNaN(userID)) {
            throw new Error("ID do usuário inválido.")
        }

        if (isNaN(vehicleID)) {
            throw new Error("ID do veículo inválido.")
        }

        const userExists = await prisma.user.findUnique({
            where: {
                id: userID
            },
            include: {
                Vehicle: true
            }
        })

        const vehicleExists = await prisma.vehicle.findUnique({
            where: {
                id: vehicleID
            },
            include: {
                user: true
            }
        });

        if (!userExists) {
            throw new Error("Usuário não encontrado.");
        }

        if (!vehicleExists) {
            throw new Error("Veículo não encontrado.");
        }

        if (userExists.Vehicle.length > 0) {
            throw new Error("Esse usuário já reservou um veículo.")
        }

        if (vehicleExists.user) {
            throw new Error("Este veículo já foi reservado.");
        }

        const vehicleReservation = await prisma.vehicle.update({
            where: {
                id: vehicleID
            },
            data: {
                available: false,
                userId: userExists.id
            }
        })

        return { status: "success", message: "Veículo reservado com sucesso!", vehicle: vehicleReservation };
    }
}

export { VehicleReservationUseCase };