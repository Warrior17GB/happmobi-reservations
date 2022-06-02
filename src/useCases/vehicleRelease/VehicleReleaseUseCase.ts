import { prisma } from '../../prisma/client';

interface IRelease {
    vehicleID: number
}

class VehicleReleaseUseCase {
    async execute({ vehicleID }: IRelease) {
        if (!vehicleID) {
            throw new Error("vehicleID é obrigatórios.")
        }

        if (isNaN(vehicleID)) {
            throw new Error("ID do veículo inválido.")
        }

        const vehicleExists = await prisma.vehicle.findUnique({
            where: {
                id: vehicleID
            },
            include: {
                user: true
            }
        });

        if (!vehicleExists) {
            throw new Error("Veículo não encontrado.");
        }

        if (!vehicleExists.user) {
            throw new Error("Este veículo não foi reservado.");
        }

        const vehicleReleased = await prisma.vehicle.update({
            where: {
                id: vehicleID
            },
            data: {
                available: true,
                userId: null
            }
        })

        return { status: "success", message: "Veículo liberado com sucesso!", vehicle: vehicleReleased };
    }
}

export { VehicleReleaseUseCase };