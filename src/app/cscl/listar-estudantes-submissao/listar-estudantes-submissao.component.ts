import { Component, OnInit } from '@angular/core';
import Submissao from 'src/app/model/submissao';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/juiz/login.service';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';
import Estudante from 'src/app/model/estudante';


@Component({
  selector: 'app-listar-estudantes-submissao',
  templateUrl: './listar-estudantes-submissao.component.html',
  styleUrls: ['./listar-estudantes-submissao.component.css']
})
export class ListarEstudantesSubmissaoComponent implements OnInit {
  
  private submissoesDaQuestao;
  private questao;
  private submissoes;
  private estudante;
  private assuntoId
  private json;
  


  constructor(private messageService: MessageService,private router:Router, public login:LoginService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.questao= params['questaoId'];
    
      
     
      Submissao.getAll(new Query("questaoId","==",this.questao)).subscribe(resultado =>{
        this.submissoes =resultado;
        

        this.filtrarSubmissoesConcluidas(resultado);
      });
    });
  }



  filtrarSubmissoesConcluidas(submissoesQuestao){
   // Filtrando todas as submissões que o seu resultadosTestsCase não seja undefined
		var submissaoFiltrada = submissoesQuestao.filter(submissao => {
      return submissao.resultadosTestsCases !== undefined
      
   })
   // Filtrando toda as submissões que tem todos os seus testsCases com status true
   .filter(submissao => {
     
     // Retornar um array vazio caso o resultadosTestsCases tenha todos os elementos com status true. Caso não, o array vai retornar 
     // com pelo menos um elemento com status false
     var filterFalseTestsCases = submissao.resultadosTestsCases.filter(el => el.status === false)

     // Se a submissão tiver todos seus status true, então retorne-a
     if(filterFalseTestsCases.length === 0) {return submissao} 
   
        
    });
 
     this.BuscarEstudante(submissaoFiltrada);

  }




  BuscarEstudante(submissoesQuestao){
    for(let i=0;i<submissoesQuestao.length;i++){

      Usuario.get(submissoesQuestao[i].estudanteId).subscribe(resultado=>{this.estudante=resultado
        submissoesQuestao[i].estudante=this.estudante.nome;
        
      });
    }
   this.submissoesDaQuestao=submissoesQuestao;

  }




 
  visualizarSubmissao(submissao){
    this.router.navigate(["main", { outlets: { principal: ['listar-submissao-questao', submissao.id] } } ] );
  }

  
 
}
  


