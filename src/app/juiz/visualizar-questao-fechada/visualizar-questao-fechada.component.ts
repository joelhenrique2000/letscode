import { Component, OnInit } from '@angular/core';
import QuestaoFechada from 'src/app/model/questaoFechada';
import { Router, ActivatedRoute } from '@angular/router';
import { Assunto } from 'src/app/model/assunto';
import { LoginService } from '../login.service';
import Submissao from 'src/app/model/submissao';
import RespostaQuestaoFechada from 'src/app/model/respostaQuestaoFechada';

@Component({
  selector: 'app-visualizar-questao-fechada',
  templateUrl: './visualizar-questao-fechada.component.html',
  styleUrls: ['./visualizar-questao-fechada.component.css']
})
export class VisualizarQuestaoFechadaComponent implements OnInit {
  


  private assunto;
  private questao?;
  private id: number;
  private sub: any;
  private questoes = [];
  private  resposta;
  // private respostaQuestaofechada:RespostaQuestaoFechada;


  constructor(private route: ActivatedRoute, private router: Router,private login: LoginService) {
    this.questao = new QuestaoFechada(null, null, null, null, [], []);
    
   



  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["assuntoId"] != undefined && params["questaoId"] != undefined) {
        Assunto.get(params["assuntoId"]).subscribe(assunto => {
          this.assunto = assunto;
          if (assunto["questoesFechadas"] != undefined && assunto["questoesFechadas"].length > 0) {
            assunto["questoesFechadas"].forEach(questao => {
              if (questao.id == params["questaoId"]) {
                this.questao = questao;
                console.log(this.questao);
              }
            });
          }
          });
        
      } else {
        throw new Error("Não é possível visualizar uma questão, pois não foram passados os identificadores de assunto e questão.")
      }

    });

 

  }

  
  alterarQuestao(questao: QuestaoFechada) {
    if (questao != undefined) {
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-questao', questao.id] } }]);
    }
  }

  responder(){
      alert("parabéns você respondeu uma questão!");
    
   }
   
  

}