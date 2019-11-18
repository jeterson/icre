import { VariaveisRepository } from "../repositories/variaveis.repository";
import { Request, Response } from "express";
import { ErrorResponse } from "../model/error.model";

export class VariaveisController {
    repository = new VariaveisRepository();

    async findAll(res: Response) {
        try {
            const data = await this.repository.findAll();
            res.send(data);
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }

    async findOne(id: number, res: Response) {
        try {
            const data = await this.repository.findOne(id);
            res.send(data);
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }

    async update(obj: any, res: Response) {
        try {
            await this.repository.update(obj);
            res.send();
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }
}