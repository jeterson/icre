import { ClienteRepository } from "../repositories/cliente.repository";
import { Cliente } from "../model/cliente.model";
import { Response } from "express";
import { ErrorResponse } from "../model/error.model";
import { Validations } from "../utils/validations";
import { BancoRepository } from "../repositories/banco.repository";
import { ParametroController } from "./parametro.controller";
import { ParametroRepository } from "../repositories/parametro.repository";
import { EstadoController } from "./estado.controller";

export class ClienteController {
    repository = new ClienteRepository();
    bancoRepository = new BancoRepository();
    validations = new Validations();
    parametroRepository = new ParametroRepository();
    estadoController = new EstadoController();

    async insert(cliente: Cliente, res: Response) {
        try {
            if (this.validatePayload(cliente, res)) {
                const permiteDuplicado = await this.parametroRepository.findOne('PERMITEDOCUMENTODUPLICADO');
                if (permiteDuplicado.valor === 'N') {
                    const existeCPF = await this.repository.findByCPF(cliente.cpf);
                    const existeRG = await this.repository.findByRG(cliente.rg);
                    if (existeCPF) {
                        res.status(400).send(new ErrorResponse({ message: 'Já existe um cliente com esse CPF cadastrado. O sistema nao permite documentos duplicados. Verificar Parametro' }));
                        return;
                    }
                    if (existeRG) {
                        res.status(400).send(new ErrorResponse({ message: 'Já existe um cliente com esse RG cadastrado. O sistema nao permite documentos duplicados. Verificar Parametro' }));
                        return;
                    }
                }
                cliente.dataCadastro = new Date();
                await this.repository.insert(cliente);
                res.status(201).send();
            }
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }

    async findAll(params: any, res: Response) {
        try {
            let clientes: any = await this.repository.findAll(params);
            clientes = clientes.map((c: any) => {                
                const estado = this.estadoController.getEstados().find(e => e.uf === c.estado);
                return { ...c, ufDesc: estado.estado };
            });
            res.send(clientes);
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }

    async delete(id: number, res: Response) {
        try {
            await this.repository.delete(id);
            res.send();
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }

    async update(cliente: Cliente, res: Response) {
        try {
            if (this.validatePayload(cliente, res)) {
                await this.repository.update(cliente);
                res.status(200).send();
            }
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }


    async findOne(id: number, res: Response) {
        try {
            const cliente = await this.repository.findOne(id);
            cliente.sexoDesc = this.sexoLabel(cliente.sexo);
            cliente.estadoCivilDesc = this.estadoCiviLabel(cliente);
            cliente.banco = await this.bancoRepository.findOne(cliente.banco);
            cliente.bancoDesc = cliente.banco.descricao
            cliente.rede_financ_proj_luz_campoDesc = this.decodeSAndN(cliente.rede_financ_proj_luz_campo);
            cliente.rede_pago_avistaDesc = this.decodeSAndN(cliente.rede_pago_avista);
            cliente.poste_concretoDesc = this.decodeSAndN(cliente.poste_concreto);
            cliente.doacao_rede_ceronDesc = this.decodeSAndN(cliente.doacao_rede_ceron);
            cliente.recibosDesc = this.decodeSAndN(cliente.recibos);
            cliente.notas_fiscaisDesc = this.decodeSAndN(cliente.notas_fiscais);
            cliente.juntar_copia_projeto_redeDesc = this.decodeSAndN(cliente.juntar_copia_projeto_rede);

            res.send(cliente);
        } catch (err) {
            res.status(500).send(new ErrorResponse(err));
        }
    }

    decodeSAndN(value: string) {
        if (value === 'S')
            return 'Sim';
        else if (value === 'N')
            return 'Não'
    }


    private sexoLabel(sigla: string) {
        if (sigla === 'F')
            return 'Feminino';
        if (sigla === 'M')
            return 'Masculino';
        else
            return 'Não Informado';
    }


    private estadoCiviLabel(cliente: any) {
        const { estado_civil, sexo } = cliente;

        switch (sexo) {
            case 'F':
                switch (estado_civil) {
                    case 'S':
                        return 'Solteira';
                    case 'C':
                        return 'Casada';
                    case 'D':
                        return 'Divorciada';
                    case 'V':
                        return 'Viuva';
                    default:
                        return '';
                }
            case 'M':
                switch (estado_civil) {
                    case 'S':
                        return 'Solteiro';
                    case 'C':
                        return 'Casado';
                    case 'D':
                        return 'Divorciado';
                    case 'V':
                        return 'Viuvo';
                    default:
                        return '';
                }
            default:
                switch (estado_civil) {
                    case 'S':
                        return 'Solteiro(a)';
                    case 'C':
                        return 'Casado(a)';
                    case 'D':
                        return 'Divorciado(a)';
                    case 'V':
                        return 'Viuvo(a)';
                    default:
                        return '';
                }
        }
    }


    validatePayload(cliente: Cliente, res: Response) {
        try {
            this.validations.existsOrError(cliente, 'Objeto deve ser passado no request body');
            this.validations.existsOrError(cliente.nome, 'O Nome é obrigatório');
            this.validations.existsOrError(cliente.unidadeConsumidora, 'Unidade Consumidora é obrigatório');
            this.validations.existsOrError(cliente.rg, 'RG é obrigatório');
            this.validations.existsOrError(cliente.cpf, 'CPF é obrigatório');
            this.validations.existsOrError(cliente.endereco, 'Endereço é obrigatório');
            this.validations.existsOrError(cliente.bairro, 'Bairro é obrigatório');
            this.validations.existsOrError(cliente.cidade, 'Cidade é obrigatório');
            this.validations.existsOrError(cliente.estado, 'Estado é obrigatório');
            this.validations.existsOrError(cliente.cep, 'CEP é obrigatório');
            this.validations.existsOrError(cliente.sexo, 'Sexo é obrigatório');
            this.validations.existsOrError(cliente.estadoCivil, 'Estado Civil é obrigatório');
            return true;
        } catch (err) {
            res.status(400).send(new ErrorResponse(err));
            return false;
        }
    }

    async findByUc(uc: string, res: Response) {
        try {
            let ucs = await this.repository.findByUc(uc);
            ucs = ucs.map(u => {
                return { label: u.unidade_consumidora + '', value: u.unidade_consumidora };
            })
            res.send(ucs);
        } catch (err) {
            console.log(err);
            res.status(500).send(new ErrorResponse(err));
        }
    }
}