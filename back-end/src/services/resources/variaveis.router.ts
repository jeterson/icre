import { Request, Response } from "express";
import { VariaveisController } from "../controllers/variaveis.controller";

const resource = '/variaveis';
const controller = new VariaveisController();
export default [

    {
        path: resource,
        method: 'get',
        handler: async (req: Request, res: Response) => {
            controller.findAll(res);
        }
    },
    {
        path: `${resource}/:id`,
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const id = <number>(<unknown>req.params.id);
            controller.findOne(id, res);
        }
    },
    {
        path: resource,
        method: 'put',
        handler: async (req: Request, res: Response) => {
            const obj = req.body;
            controller.update(obj, res);
        }
    },
]