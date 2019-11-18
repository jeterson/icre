import { Request, Response } from "express";
import { ClienteController } from "../controllers/cliente.controller";

const resource = '/clientes';
const controller = new ClienteController();

export default [
    {
        path: resource,
        method: 'post',
        handler: async (req: Request, res: Response) => {
            const cliente = req.body;
            controller.insert(cliente, res);
        }
    },
    {
        path: resource,
        method: 'put',
        handler: async (req: Request, res: Response) => {
            const cliente = req.body;
            controller.update(cliente, res);
        }
    },
    {
        path: `${resource}/uc/:uc`,
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const uc = req.params.uc;
            controller.findByUc(uc, res);
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
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const params = req.query;
            controller.findAll(params, res);
        }
    },

    {
        path: `${resource}/:id`,
        method: 'delete',
        handler: async (req: Request, res: Response) => {
            const id = <number>(<unknown>req.params.id);
            controller.delete(id, res);
        }
    }
]