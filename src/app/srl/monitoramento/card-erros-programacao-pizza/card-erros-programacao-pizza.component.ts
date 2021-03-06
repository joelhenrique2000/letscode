import { Component, OnInit, Input } from '@angular/core';
import Erro from 'src/app/model/errors/erro';
import { TipoErro } from 'src/app/model/tipoErro';
import { ErroCompilacao } from 'src/app/model/errors/analise-compilacao/erroCompilacao';
import { LabelCategoriasErros } from 'src/app/model/errors/enum/labelCategoriasErro';
import { CategoriaErro } from 'src/app/model/errors/enum/categoriasErro';

@Component({
  selector: 'app-card-erros-programacao-pizza',
  templateUrl: './card-erros-programacao-pizza.component.html',
  styleUrls: ['./card-erros-programacao-pizza.component.css']
})
export class CardErrosProgramacaoPizzaComponent implements OnInit {

  @Input() erros;
  dadosProcessados;
  grafico;

  constructor() { }

  ngOnInit() {
    this.grafico = {
      data: this.dadosProcessados,
      labels: [],
      datasets: [
        {
          data: this.dadosProcessados,
          backgroundColor: []
        }]
    };
  
    if(this.erros != undefined){
      this.dadosProcessados = ErroCompilacao.calcularFrequenciaPorTipoErro(this.erros);
      this.construirGraficoPizza();
    }
      
  }

  construirGraficoPizza() {
    // TODO: Colocar os objetos da função calcularFrequencia em um array. Percorrer o array nessa lista.
    let labels = [];
    let backgroundColors = []
    let data = []

    Object.keys(this.dadosProcessados).forEach(chave=>{
      if(this.dadosProcessados[chave] > 0){
        labels.push(LabelCategoriasErros[chave]);
        backgroundColors.push(this.getCorErro(CategoriaErro[chave]));
        data.push(this.dadosProcessados[chave]);
      }
    })

    this.grafico = {
      data: data,
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors
        }]
    };

  }

  getCorErro(tipo){
    switch(tipo){
        case 1:
            return "#FFBF00";
        case 2:
            return "#80FF00";
        case 3:
            return "#A9F5F2";
        case 4:
            return "#08298A";
        
        default:
            return "";
    }
}

  /*construirGraficoPizza() {



    let labels = [];
    let backgroundColors = []
    let data = []

    if (this.dadosProcessados.ComparacaoApenasUmaIgualdade > 0) {
      labels.push(TipoErro.comparacaoApenasUmaIgualdadeTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.comparacaoApenasUmaIgualdade));
      data.push(this.dadosProcessados.comparacaoApenasUmaIgualdade);
    } 
    if (this.dadosProcessados["declaracaoVariavelComDoisIguais"] > 0) {
      labels.push(TipoErro.declaracaoVariavelComDoisIguaisTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.declaracaoVariavelComDoisIguais));
      data.push(this.dadosProcessados.declaracaoVariavelComDoisIguais);
    } if (this.dadosProcessados.espacoNoNomeVariavel > 0) {
      labels.push(TipoErro.espacoNoNomeVariavelTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.espacoNoNomeVariavel));
      data.push(this.dadosProcessados.espacoNoNomeVariavel);
    } if (this.dadosProcessados.faltaDoisPontosCondicaoTexto > 0) {
      labels.push(TipoErro.faltaDoisPontosCondicaoTexto);
      data.push(this.dadosProcessados.faltaDoisPontosCondicao);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaDoisPontosCondicao));
    } if (this.dadosProcessados.faltaDoisPontosFuncao > 0) {
      labels.push(TipoErro.faltaDoisPontosFuncaoTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaDoisPontosFuncao));
      data.push(this.dadosProcessados.faltaDoisPontosFuncao);
    } if (this.dadosProcessados.faltaParentesis > 0) {
      labels.push(TipoErro.faltaParentesisTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaParentesis));
      data.push(this.dadosProcessados.faltaParentesis);
    } if (this.dadosProcessados.faltaVirgulaParametros > 0) {
      labels.push(TipoErro.faltaVirgulaParametrosTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.faltaVirgulaParametros));
      data.push(this.dadosProcessados.faltaVirgulaParametros);
    } if (this.dadosProcessados.numeroDecimalComVirgula > 0) {
      labels.push(TipoErro.numeroDecimalComVirgulaTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.numeroDecimalComVirgula));
      data.push(this.dadosProcessados.numeroDecimalComVirgula);
    } if (this.dadosProcessados.parDadosComparacao > 0) {
      labels.push(TipoErro.parDadosComparacaoTexto);
      backgroundColors.push(Erro.getCorErro(TipoErro.parDadosComparacao));
      data.push(this.dadosProcessados.parDadosComparacao);
    } if (this.dadosProcessados.variavelNaoDeclarada > 0) {
      labels.push(TipoErro.variavelNaoDeclaradaTexto);
      data.push(this.dadosProcessados.variavelNaoDeclarada);
      backgroundColors.push(Erro.getCorErro(TipoErro.variavelNaoDeclarada));
    }


    this.grafico = {
      data: data,
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors
        }]
    };

  }*/

}
