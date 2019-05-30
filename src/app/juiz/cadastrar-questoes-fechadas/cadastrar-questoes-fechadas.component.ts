import { Component, OnInit } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import QuestaoFechada from 'src/app/model/questaoFechada';
import { Assunto } from 'src/app/model/assunto';
import { Dificuldade } from 'src/app/model/dificuldade';
import Alternativa from 'src/app/model/alternativa';

@Component({
  selector: 'app-cadastrar-questoes-fechadas',
  templateUrl: './cadastrar-questoes-fechadas.component.html',
  styleUrls: ['./cadastrar-questoes-fechadas.component.css']
})
export class CadastrarQuestoesFechadasComponent implements OnInit {
  

  questao;
  dificuldades: SelectItem[];
  assuntos;
  isAlterar:Boolean;
 

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService) {
   

  }

  ngOnInit() {

    this.questao = new QuestaoFechada(null, null, null, null, [], null, []);

    this.activatedRoute.params
      .subscribe(params => {
        if (params["id"] != undefined) {
          this.isAlterar=true;
          QuestaoFechada.get(params["id"]).subscribe(questao => {
            this.questao = questao;
          })
        }

      });


    Assunto.getAll().subscribe(assuntos => { this.assuntos = assuntos});
   

    this.dificuldades = [
      { label: 'Selecione uma dificuldade', value: null },
      { label: 'Difícil', value: Dificuldade.dificil },
      { label: 'intermediário', value: Dificuldade.medio },
      { label: 'Facíl', value: Dificuldade.facil },
    ];
    

  }

  adicionarAlternativa() {
    this.questao.alternativas.push(new Alternativa(null, null, null, this.questao))
  }

  messageCadastro() {
    this.messageService.add({severity:'success', summary:'Cadastrado!', detail: this.questao.nome+" foi adicionada ao banco de questões"});
  }

  messageErro() {
    this.messageService.add({severity:'warn', summary:'Falha ao cadastrar questão', detail: 'A questão não foi cadastrado'});
  }

  messageInformarDados(){
    this.messageService.add({severity:'warn', summary:'Falha ao cadastrar questão', detail: 'reveja se vc preencheu todos os dados corretamente ou certifique-se que há pelo menos duas alternativas!'});
  }

  messageErroAlternativa(){
    this.messageService.add({severity:'warn', summary:'Falha ao cadastrar questão', detail: 'ops... Deve haver, obrigatoriamente, uma alternativa certa!'});
  }

  cadastrarQuestao() {
    if(this.questao.validar() && Alternativa.calcularQuantasAlternativasCertas((this.questao.alternativas))==1) {

      this.questao.save().subscribe(resultado => {
      this.router.navigate(["main", { outlets: { principal: ['listagem-questoes-fechadas'] } }]);

      }, err => {
      this.messageErro();

      });
    } 
    
    if(Alternativa.calcularQuantasAlternativasCertas(this.questao.alternativas)!=1){
      this.messageErroAlternativa();
     alert("ops... Deve haver, obrigatoriamente, uma alternativa certa!")
    }

    if(!this.questao.validar()) {
      this.messageInformarDados();
      alert("reveja se vc preencheu todos os dados corretamente ou certifique-se que há pelo menos duas alternativas!");
    }

    
    


  }


  
 
}






