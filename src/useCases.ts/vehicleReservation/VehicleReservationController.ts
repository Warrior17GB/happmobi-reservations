import { Request, Response } from 'express';
import { VehicleReservationUseCase } from './VehicleReservationUseCase'

class VehicleReservationController {
    async handle(request: Request, response: Response) {
        const { ID } = request.body;

        const vehicleReservationUseCase = new VehicleReservationUseCase();

        const vehicle = await vehicleReservationUseCase.execute({
            ID: parseInt(ID)
        });

        return response.json(vehicle);
    }
}

export { VehicleReservationController };