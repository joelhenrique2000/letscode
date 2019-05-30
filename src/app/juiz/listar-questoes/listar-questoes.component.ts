import { Component, OnInit, Input } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { MenuItem } from 'primeng/components/common/menuitem';
import { MessageService } from 'primeng/api';
import { Questao } from 'src/app/model/questao';
import TestCase from 'src/app/model/testCase';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-questoes',
  templateUrl: './listar-questoes.component.html',
  styleUrls: ['./listar-questoes.component.css']
})
export class ListarQuestoesComponent implements OnInit  {
  
  @Input("assunto") assunto?;

  selectedQuestao: Questao;
  items: MenuItem[];
  constructor(private messageService: MessageService, private router:Router) { 
    
  }

  ngOnInit() {
    this.items = [
      { label: 'Update', icon: 'pi pi-check', command: (event) => this.alterarQuestao(this.selectedQuestao) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteQuestao(this.selectedQuestao) },
      { label: 'View', icon:  'pi pi-search', command: (event) => this.viewQuestao(this.selectedQuestao) }
      ];

  }

  abrirEditor(questao){
    this.router.navigate(["main", { outlets: { principal: ['editor', this.assunto.pk(), questao.id] }}]);
  }

  alterarQuestao(questao: Questao) {
    if(questao != undefined){
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-questao', questao.id] } } ] );
    }
    
  }

  deleteQuestao(questao:Questao) {
     /*Questao.delete(questao.pk()).subscribe(resultado=>{
      
      Questao.getAll().subscribe(questoes=>{this.questoes= questoes});
       
    });*/
  }

  viewQuestao(questao:Questao) {
    this.router.navigate(["main", { outlets: { principal: ['visualizacao-questao', questao.id] } } ] );
    this.messageView();
  }
  messageDelete() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:" foi excluido do banco de questões"});
  }
  messageView(){
    this.messageService.add({severity:'info', summary:'Questao visualizado', detail:'informações sobre a questão'});
  }
  
  cadastrar(){
    this.router.navigate(["main", { outlets: { principal: ['cadastro-questao'] } }]);
  }
  
}