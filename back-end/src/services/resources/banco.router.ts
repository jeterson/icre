import { Request, Response } from "express";
import { BancoController } from "../controllers/banco.controller";


const resource = '/bancos'
const controller = new BancoController();

export default [

    {
        path: resource,
        method: 'post',
        handler: async (req: Request, res: Response) => {
            const banco = req.body;
            await controller.insert(banco, res);
        }
    },
    {
        path: resource,
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const descricao = req.query.descricao;
            await controller.findAll(descricao, res);
        }

    },

    {
        path: resource,
        method: 'put',
        handler: async (req: Request, res: Response) => {
            const banco = req.body
            await controller.update(banco, res);
        }
    },

    {
        path: `${resource}/:id`,
        method: 'delete',
        handler: async (req: Request, res: Response) => {
            const id = <number>(<unknown>req.params.id);
            await controller.delete(id, res);
        }
    },

    {
        path: `${resource}/:id`,
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const id = <number>(<unknown>req.params.id);
            await controller.findOne(id, res);
        }
    },

]