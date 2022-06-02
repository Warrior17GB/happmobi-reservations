import { Request, Response } from 'express';
import { VehicleReservationUseCase } from './VehicleReservationUseCase'

class VehicleReservationController {
    async handle(request: Request, response: Response) {
        const { userID, vehicleID } = request.body;

        const vehicleReservationUseCase = new VehicleReservationUseCase();

        const vehicle = await vehicleReservationUseCase.execute({
            userID: parseInt(userID),
            vehicleID: parseInt(vehicleID)
        });

        return response.json(vehicle);
    }
}

export { VehicleReservationController };