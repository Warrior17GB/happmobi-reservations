import { Request, Response } from "express"
import { ListVehiclesUseCase } from "./ListVehiclesUseCase"

class ListVehiclesController {
    async handle(request: Request, response: Response) {
        const listVehiclesUseCase = new ListVehiclesUseCase();

        const vehicles = await listVehiclesUseCase.execute()

        return response.json(vehicles)
    }
}

export { ListVehiclesController }