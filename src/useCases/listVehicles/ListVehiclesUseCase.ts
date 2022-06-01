import { prisma } from "../../prisma/client";

class ListVehiclesUseCase {
    async execute() {
        const allVehicles = await prisma.vehicle.findMany()

        if (!allVehicles) {
            throw new Error("Não foram encontrados veículos.")
        }

        return { allVehicles }
    }
}

export { ListVehiclesUseCase }