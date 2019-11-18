import { Request, Response } from "express";
import { EstadoController } from "../controllers/estado.controller";

const estadoController = new EstadoController();
const resource = '/estados';
export default [
    {
        path: resource,
        method: 'get',
        handler: async (req: Request, res: Response) => {
            res.send(estadoController.getEstados());
        }
    }
]