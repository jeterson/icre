import { ParametroController } from "../controllers/parametro.controller";
import { Request, Response } from "express";

const resource = '/parametros';
const controller = new ParametroController();
export default [

    {
        path: resource,
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const search = req.query.search;
            if (search)
                controller.findAll(search, res);
            else
                controller.findAll('', res);
        }
    },
    {
        path: `${resource}/:name`,
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const name = req.params.name;
            controller.findOne(name, res);
        }
    },
    {
        path: resource,
        method: 'put',
        handler: async (req: Request, res: Response) => {
            const parametro = req.body;
            controller.update(parametro, res);
        }
    },
]