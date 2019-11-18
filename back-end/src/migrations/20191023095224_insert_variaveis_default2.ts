import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex('variaveis').insert([
        { chave: 'codigo', valor: 'id', propriedade: 'id', descricao: 'Código Interno do Cliente' },
        {
            chave: 'Cpf', valor: `               
                function getCpfMask(value) {
                    const cpfMask = value => {
                        return value
                            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
                            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
                            .replace(/(\d{3})(\d)/, '$1.$2')
                            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                            .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
                    }

                    return cpfMask(value);
                }

                `, propriedade: 'cpf', descricao: 'Cpf'
        },
        { chave: 'fone', valor: 'telefone', propriedade: 'telefone', descricao: 'Telefone' },
        { chave: 'cel', valor: 'celular', propriedade: 'celular', descricao: 'Celular' },
        {
            chave: 'ec', valor: `
                function getEstadoCivil(value, cliente) {
                    cliente = cliente ? cliente : {sexo: 'F'}
                    if (cliente.sexo == 'M') {
                        switch (value) {
                            case 'S':
                                return 'Solteiro';
                            case 'C':
                                return 'Casado';
                            case 'V':
                                return 'Viuvo';
                            case 'D':
                                return 'Divorciado';
                            default:
                                return '';
                        }
                    }
                    else if (cliente.sexo == 'F') {
                        switch (value) {
                            case 'S':
                                return 'Solteira';
                            case 'C':
                                return 'Casada';
                            case 'V':
                                return 'Viuva';
                            case 'D':
                                return 'Divorciada';
                            default:
                                return '';
                        }
                    }
                }
                `, propriedade: 'estado_civil', descricao: 'Estado Civil'
        },
        {
            chave: 'sex2', valor: `
                function getSexoExtenso(propValue) {
                    if(propValue.toUpperCase() == 'F') {
                        return 'Feminimo';
                    }
                    if(propValue.toUpperCase() == 'M') {
                        return 'Masculino';
                    }
                    return 'Não informado';
                }` , propriedade: 'sexo', descricao: 'Sexo'
        },

        { chave: 'banco', valor: 'descricao', propriedade: 'descricao', descricao: 'Descrição do Banco' },
        { chave: 'agencia', valor: 'agencia', propriedade: 'agencia', descricao: 'Agencia do banco' },
        { chave: 'cc', valor: 'conta_corrente', propriedade: 'conta_corrente', descricao: 'Conta corrente' },
        { chave: 'end', valor: 'endereco', propriedade: 'endereco', descricao: 'Endereço do cliente' },
        { chave: 'cid', valor: 'cidade', propriedade: 'cidade', descricao: 'Cidade' },
        { chave: 'est', valor: 'estado', propriedade: 'estado', descricao: 'Estado' },
        { chave: 'uf', valor: 'uf', propriedade: 'uf', descricao: 'UF' },
        { chave: 'num', valor: 'numero', propriedade: 'numero', descricao: 'Numero do endereco' },
        { chave: 'cep', valor: 'cep', propriedade: 'cep', descricao: 'CEP' },
        {
            chave: 'nome', valor: `
                function getNome(value, cliente) {
                    cliente = cliente ? cliente : {capitalizeFn: (e) =>  e};
                    return cliente.capitalizeFn(value);
                }`, propriedade: 'nome', descricao: 'nome'
        },
        {
            chave: 'tratamento', valor: `
                function getTratamento(sexo) {
                    if (sexo === 'M') {
                        return 'ao Srº'
                    }
                    if(sexo === 'F') {
                        return 'a Sraº'
                    }
                    return sexo;
                }`, propriedade: 'sexo', descricao: 'Pronome de tratamento'
        },
        {
            chave: 'rg', valor: `
                function getRg(value, cliente) {
                    const oe = cliente ?  cliente.orgao_expedidor : ''
                    if(value) {
                        return value + ' ' +  oe;
                    }else {
                        return '';
                    }
                }
                `, propriedade: 'rg', descricao: 'Rg'
        },
        { chave: 'outrodoc', valor: 'outro_documento', propriedade: 'outro_documento', descricao: 'Outro documento cadastrado para o cliente' },
        { chave: 'custorede', valor: 'remunerar', propriedade: 'remunerar', descricao: 'Custo da rede' },
        { chave: 'uc', valor: 'unidade_consumidora', propriedade: 'unidade_consumidora', descricao: 'Unidade consumidora do cliente' },
        {
            chave: 'custoextenso', valor: `
        
                function getValueRemunerar(propValue) {
                    String.prototype.extenso = function (c) {
                        var ex = [
                            ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
                            ["dez", "vinte", "trinta", "quarenta", "cinqüenta", "sessenta", "setenta", "oitenta", "noventa"],
                            ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
                            ["mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão"]
                        ];
                        var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
                        for (var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []) {
                            j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
                            if (!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
                            for (a = -1, l = v.length; ++a < l; t = "") {
                                if (!(i = v[a] * 1)) continue;
                                i % 100 < 20 && (t += ex[0][i % 100]) ||
                                    i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
                                s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
                                    ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
                            }
                            a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
                            a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
                        }
                        return r.join(e);
                    }
                    return (propValue + '').extenso(true);
                }

        `, propriedade: 'remunerar', descricao: 'Custo da rede por extenso'
        },

    ]);
}


export async function down(knex: Knex): Promise<any> {
    return knex.raw('delete from variaveis');
}

