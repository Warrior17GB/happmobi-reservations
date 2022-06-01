import { prisma } from '../../prisma/client';

interface IRelease {
    ID: number
}

class VehicleReleaseUseCase {
    async execute({ ID }: IRelease) {
        if (isNaN(ID)) {
            throw new Error("ID inválido.")
        }

        const vehicleExists = await prisma.vehicle.findUnique({
            where: {
                id: ID
            }
        });

        if (!vehicleExists) {
            throw new Error("Veículo não encontrado.");
        }

        if (vehicleExists.available == true) {
            throw new Error("Este veículo já foi liberado.");
        }

        const vehicleReleased = await prisma.vehicle.update({
            where: {
                id: ID
            },
            data: {
                available: true
            }
        })

        return { status: "success", message: "Veículo liberado com sucesso!", vehicle: vehicleReleased };
    }
}

export { VehicleReleaseUseCase };