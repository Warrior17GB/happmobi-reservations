import { prisma } from './prisma/client'
import { CreateUserController } from './useCases.ts/createUser/CreateUserController';
import express from 'express';
import { AuthenticateUserController } from './useCases.ts/authenticateUser/AuthenticateUserController';

export const routes = express.Router()

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const getAllVehicles = async () => {
    const allVehicles = await prisma.vehicle.findMany()
    return allVehicles
}

const vehicleReservation = async (id: number) => {
    try {
        const vehicle = await prisma.vehicle.update({
            where: { id: id },
            data: { available: false }
        })
        return vehicle
    } catch (error) {
        throw error
    }
}

const vehicleRelease = async (id: number) => {
    try {
        const vehicle = await prisma.vehicle.update({
            where: { id: id },
            data: { available: true }
        })
        return vehicle
    } catch (error) {
        throw error
    }
}

routes.post("/register", createUserController.handle)

routes.post("/login", authenticateUserController.handle)

routes.get('/list', async (req, res) => {
    const vehicles = await getAllVehicles()
    res.status(200).send(vehicles);
})

routes.post('/reservation', async (req, res) => {
    const { ID } = req.body

    if (ID) {
        if (!isNaN(parseInt(ID))) {
            try {
                const vehicle = await vehicleReservation(parseInt(ID))
                res.status(200).send(vehicle)
            } catch (error: any) {
                error.code === "P2025" ? res.status(404).send({ error: "Veículo não encontrado" }) : res.status(500).send(error)
            }
        } else {
            res.status(400).send({ error: "ID inválido." })
        }
    } else {
        res.status(400).send({ error: "ID é obrigatório." })
    }
})

routes.post('/release', async (req, res) => {
    const { ID } = req.body

    if (ID) {
        if (!isNaN(parseInt(ID))) {
            try {
                const vehicle = await vehicleRelease(parseInt(ID))
                res.status(200).send(vehicle)
            } catch (error: any) {
                error.code === "P2025" ? res.status(400).send({ error: "Veículo não encontrado" }) : res.status(500).send(error)
            }
        } else {
            res.status(400).send("ID inválido.")
        }
    } else {
        res.status(400).send("ID é obrigatório.")
    }
})