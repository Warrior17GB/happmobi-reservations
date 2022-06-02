import { Request, Response } from 'express';
import { VehicleReleaseUseCase } from './VehicleReleaseUseCase';

class VehicleReleaseController {
    async handle(request: Request, response: Response) {
        const { vehicleID } = request.body;

        const vehicleReleaseUseCase = new VehicleReleaseUseCase();

        const vehicle = await vehicleReleaseUseCase.execute({
            vehicleID: parseInt(vehicleID)
        });

        return response.json(vehicle);
    }
}

export { VehicleReleaseController };