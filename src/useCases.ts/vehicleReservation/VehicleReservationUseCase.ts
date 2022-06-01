import { prisma } from '../../prisma/client';

interface IReservation {
    ID: number
}

class VehicleReservationUseCase {
    async execute({ ID }: IReservation) {
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

        if (vehicleExists.available == false) {
            throw new Error("Este veículo já foi reservado.");
        }

        const vehicleReservation = await prisma.vehicle.update({
            where: {
                id: ID
            },
            data: {
                available: false
            }
        })

        return { status: "success", message: "Veículo reservado com sucesso!", vehicle: vehicleReservation };
    }
}

export { VehicleReservationUseCase };