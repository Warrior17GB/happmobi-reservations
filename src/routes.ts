import express from 'express';
import { CreateUserController } from './useCases/createUser/CreateUserController';
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController';
import { ListVehiclesController } from './useCases/listVehicles/ListVehiclesController';
import { VehicleReservationController } from './useCases/vehicleReservation/VehicleReservationController';
import { VehicleReleaseController } from './useCases/vehicleRelease/VehicleReleaseController';

export const routes = express.Router()

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const listVehiclesController = new ListVehiclesController();
const vehicleReservationController = new VehicleReservationController();
const vehicleReleaseController = new VehicleReleaseController();

routes.post("/register", createUserController.handle)

routes.post("/login", authenticateUserController.handle)

routes.get('/list', listVehiclesController.handle)

routes.post('/reservation', vehicleReservationController.handle)

routes.post('/release', vehicleReleaseController.handle)