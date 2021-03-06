import { Document, Collection } from './firestore/document';
import { Observable, forkJoin } from 'rxjs';
import { Questao } from './questao';
import Usuario from './usuario';
import Submissao from './submissao';
import { Util } from './util';
import QuestaoFechada from './questaoFechada';
import { RespostaQuestaoFechada } from './respostaQuestaoFechada';
import { Assuntos } from './enums/assuntos';

@Collection("assuntos")
export class Assunto extends Document {

    sequencia;
    questoesProgramacao;
    questoesFechadas;
    objetivosEducacionais:[];

    constructor(id, public nome) {
        super(id);
        this.questoesFechadas = [];
        this.questoesProgramacao = [];
        this.objetivosEducacionais = [];
    }

    objectToDocument() {
        let document = super.objectToDocument();
        if (this.questoesProgramacao != null && this.questoesProgramacao.length > 0) {
            let questoes = [];
            this.questoesProgramacao.forEach(questao => {
                if (typeof questao.objectToDocument === "function")
                    questoes.push(questao.objectToDocument());
            })

            document["questoesProgramacao"] = questoes;
        }
        if (this.questoesFechadas != null && this.questoesFechadas.length > 0) {
            let questoesFechadas = [];
            this.questoesFechadas.forEach(questao => {
                if (typeof questao.objectToDocument === "function")
                    questoesFechadas.push(questao.objectToDocument());
            })

            document["questoesFechadas"] = questoesFechadas;
        }

        if( this.objetivosEducacionais.length > 0){
            document["questoeobjetivosEducacionaissFechadas"] = this.objetivosEducacionais;
        }

        return document;
    }

    getQuestaoProgramacaoById(questaoId) {
        let questaoLocalizada = null;
        this.questoesProgramacao.forEach(questao => {
            if (questao.id == questaoId)
                questaoLocalizada = questao;
        })

        return questaoLocalizada;
    }

    getQuestaoFechadaById(questaoId) {
        let questaoLocalizada = null;
        this.questoesFechadas.forEach(questao => {
            if (questao.id == questaoId)
                questaoLocalizada = questao;
        })

        return questaoLocalizada;
    }

    static get(id) {

        return new Observable(observer => {
            super.get(id).subscribe(assunto => {
                assunto["questoesProgramacao"] = Questao.construir(assunto["questoesProgramacao"]);
                assunto["questoesFechadas"] = QuestaoFechada.construir(assunto["questoesFechadas"]);
                observer.next(assunto);
                observer.complete();
            }, err => {
                observer.error(err);
            });
        })

    }

    static isQuestoesProgramacaoFinalizadas(assunto: Assunto, estudante, margemAceitavel = 0.6) {
        return new Observable(observer => {
            this.calcularPercentualConclusaoQuestoesProgramacao(assunto, estudante, margemAceitavel).subscribe(percentual => {
                if (percentual >= margemAceitavel) {
                    observer.next(true);
                    observer.complete();
                } else {
                    observer.next(false);
                    observer.complete();
                }
            })
        });
    }


    validar() {
        if (this.nome == undefined || this.nome == null) {
            return false;
        }

        return true;
    }

    calcularPercentualConclusao(usuario){
        return new Observable(observer=>{
            forkJoin([Assunto.calcularPercentualConclusaoQuestoesFechadas(this, usuario), Assunto.calcularPercentualConclusaoQuestoesProgramacao(this, usuario, 0.6)]).subscribe(resultado=>{
                let percentualConclusao = 0;
                resultado.forEach(percentual=>{
                    percentualConclusao += percentual;
                });

                percentualConclusao /= 2;
                observer.next(percentualConclusao*100);
                observer.complete();
            })
        })
    }

    /**
     * Recupera as submissões mais recentes do estudante. As submissões são referentes a diferentes questões de programação.
     * @param assunto 
     * @param usuario 
     */
    static getTodasSubmissoesProgramacaoPorEstudante(assunto, usuario) {
        let submissoes = {}
        assunto.questoesProgramacao.forEach(questao => {
            if (questao.testsCases != undefined && questao.testsCases.length > 0) {
                questao.testsCases.forEach(testCase => {
                    submissoes[questao.id] = Submissao.getRecentePorQuestao(questao, usuario);
                })
            }
        })

        return submissoes;
    }

    static calcularPercentualConclusaoQuestoesFechadas(assunto: Assunto, usuario: Usuario): Observable<number> {
        // Recuperar todas as questões de um assunto
        return new Observable(observer => {
            let totalRespostas = 0;
            let respostas = [];
            assunto.questoesFechadas.forEach(questao => {
                // Recuperar todas as respostas às questões fechadas

                respostas.push(RespostaQuestaoFechada.getRespostaQuestaoEstudante(questao, usuario));
            });

            if (respostas.length > 0 && assunto.questoesFechadas.length == respostas.length) {
                forkJoin(respostas).subscribe(respostas => {

                    for(let i = 0; i < assunto.questoesFechadas.length; i++){
                        if (respostas[i] != null) {
                            //let resultado = QuestaoFechada.isRespostaCorreta(assunto.questoesFechadas[i], respostas[i]);
                            //if (resultado) {
                                totalRespostas++;
                            //}
                        }
                    }
                    
                    let percentual = totalRespostas / assunto.questoesFechadas.length;
                    observer.next(percentual);
                    observer.complete();
                })
            } else {
                observer.next(0);
                observer.complete();
            }
        })


    }

    /**
     * Calcula o percentual de questões de programação que o estudante resolveu.
     * @param assunto 
     * @param usuario 
     * @param margemAceitavel 
     */
    static calcularPercentualConclusaoQuestoesProgramacao(assunto: Assunto, usuario: Usuario, margemAceitavel): Observable<number> {
        // Pegar todas as questões de um assunto
        return new Observable(observer => {
            if (assunto != undefined && usuario != undefined) {
                let submissoes = this.getTodasSubmissoesProgramacaoPorEstudante(assunto, usuario);
                if (!Util.isObjectEmpty(submissoes)) {
                    forkJoin(submissoes).subscribe(submissoes => {
                        let s: any = submissoes;
                        if (!Util.isObjectEmpty(s)) {
                            let totalQuestoes = assunto.questoesProgramacao.length;
                            let questoesRespondidas = [];
                            assunto.questoesProgramacao.forEach(questao => {
                                let questaoRespondida = true;
                                //for (let j = 0; j < questao.testsCases.length; j++) {
                                let resultadoAtualTestCase = null;

                                for (let questaoId in s) {
                                    if (questaoId == questao.id) {
                                        let totalTestsCases = questao.testsCases.length;
                                        let totalAcertos = 0;
                                        if (s[questaoId] != null && s[questaoId].resultadosTestsCases.length != 0) {
                                            s[questaoId].resultadosTestsCases.forEach(resultadoTestCase => {
                                                if (resultadoTestCase.status)
                                                    totalAcertos++;
                                            })

                                            let percentual = totalAcertos / totalTestsCases;
                                            if (percentual >= margemAceitavel)
                                                questoesRespondidas.push(questao);
                                        }

                                    }
                                }
                                //}
                            })

                            observer.next(questoesRespondidas.length / totalQuestoes);
                            observer.complete();
                        } else {
                            observer.next(0);
                            observer.complete();
                        }

                    });
                } else {
                    observer.next(0);
                    observer.complete();
                }

            }

        })

    }

    static ordenar(arrayAssuntos:Assunto[]){

        let assuntos = [];

        arrayAssuntos.forEach(assunto=>{
            let sequencia = assunto["sequencia"]-1 // O índice do array começa em 0 e as ordens das disciplinas em 1.
            assuntos[sequencia] = assunto;
            
        })

        return assuntos;
    }
}