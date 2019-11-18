import { BancoRepository } from "../repositories/banco.repository";
import { Banco } from "../model/banco.mode";
import { Response } from "express";
import { ErrorResponse } from "../model/error.model";

export class BancoController {
    private repository = new BancoRepository();

    async insert(banco: Banco, res: Response) {
        try {
            await this.repository.insert(banco);
            res.status(201).send();
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }

    }
    async update(banco: Banco, res: Response) {
        try {
            await this.repository.update(banco);
            res.status(200).send(banco);
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }

    }
    async findOne(id: number, res: Response) {
        try {
            const banco = await this.repository.findOne(id);
            res.status(200).send(banco);
        } catch (err) {            
            res.status(500).send(new ErrorResponse(err));
        }
    }
    async findAll(descricao: string = '', res: Response) {
        try {
            const bancos = await this.repository.findAll(descricao);
            res.status(200).send(bancos);
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }
    async delete(id: number, res: Response) {
        try {
            await this.repository.delete(id);
            res.status(200).send();
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }
}