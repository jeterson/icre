import { ParametroRepository } from "../repositories/parametro.repository";
import { Response } from "express";
import { ErrorResponse } from "../model/error.model";
import { Parametro } from "../model/parametros.model";

export class ParametroController {

    parametroRepository = new ParametroRepository();

    async findAll(descricao: string, res: Response) {
        try {
            const params = await this.parametroRepository.findAll(descricao);            
            res.send(params);
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }

    async findOne(name: string, res: Response) {
        try {
            const param = await this.parametroRepository.findOne(name);
            res.send(param);
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }

    async update(parametro: Parametro, res: Response) {
        try {
            await this.parametroRepository.update(parametro);
            res.send();
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }
}