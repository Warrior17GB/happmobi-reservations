import { Request, Response } from 'express';
import { VehicleReleaseUseCase } from './VehicleReleaseUseCase';

class VehicleReleaseController {
    async handle(request: Request, response: Response) {
        const { ID } = request.body;

        const vehicleReleaseUseCase = new VehicleReleaseUseCase();

        const vehicle = await vehicleReleaseUseCase.execute({
            ID: parseInt(ID)
        });

        return response.json(vehicle);
    }
}

export { VehicleReleaseController };