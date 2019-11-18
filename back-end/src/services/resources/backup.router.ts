import { Request, Response } from "express";
import { BancoController } from "../controllers/banco.controller";
import { GerenciadorBackup } from "../backup/backup.manager";
import { BackupRepository } from "../repositories/backup.repository";
import { ErrorResponse } from "../model/error.model";


const resource = '/backup'
const controller = new GerenciadorBackup();
const repository = new BackupRepository();

export default [

    {
        path: resource,
        method: 'post',
        handler: async (req: Request, res: Response) => {
            controller.executeBackup(res);
        }
    },

    {
        path: `${resource}/last`,
        method: 'get',
        handler: async (req: Request, res: Response) => {
            try {
                let data: any[] = await repository.findLastBackup();
                data = data.length > 0 ? data[0] : null;
                res.send(data);
            } catch (err) {
                res.status(500).send(new ErrorResponse(err));
            }
        }
    },
    {
        path: `${resource}/alterconfig`,
        method: 'put',
        handler: async (req: Request, res: Response) => {
            const config = req.body;
            controller.alterConfig(config, res);
        }
    },
    {
        path: `${resource}/getconfig`,
        method: 'get',
        handler: async (req: Request, res: Response) => {
            controller.getConfig(res);
        }
    },
    {
        path: `${resource}/dirbackup`,
        method: 'get',
        handler: async (req: Request, res: Response) => {
            const DIR_BKP = process.env.ICRE_DIR_BACKUP;
            if (DIR_BKP) {
                res.send({ dir: DIR_BKP, ok: true })
            } else {
                res.send({ dir: 'C:/bkp_icre', ok: false })
            }
        }
    }

]