import { Component, OnInit, Input } from '@angular/core';
import QuestaoFechada from 'src/app/model/questaoFechada';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-listar-questoes-fechadas',
  templateUrl: './listar-questoes-fechadas.component.html',
  styleUrls: ['./listar-questoes-fechadas.component.css']
})
export class ListarQuestoesFechadasComponent implements OnInit {

  @Input("assunto") assunto?;
  
  questoes;
  selectedQuestao: QuestaoFechada;
  selectQuestoes: QuestaoFechada[];
  items: MenuItem[];
  minhasQuestions;
  usuario;
  constructor(private messageService: MessageService,private router:Router) { 
    
  }

  ngOnInit() {
    this.usuario = Usuario.getUsuarioLogado();
    // QuestaoFechada.getAll().subscribe(questoes=>{this.questoes= questoes});

    this.items = [
      { label: 'Update', icon: 'pi pi-check', command: (event) => this.alterarQuestao(this.selectedQuestao) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => this.deleteQuestao(this.selectedQuestao) },
      { label: 'View', icon:  'pi pi-search', command: (event) => this.viewQuestao(this.selectedQuestao) }
      ];

  }

  cadastrar(){
    this.router.navigate(["main", { outlets: { principal: ['cadastro-questao-fechada'] } }]);
  }

  abrirEditor(questao){
    this.router.navigate(["main", { outlets: { principal: ['editor', this.assunto.pk(), questao.id] }}]);
  }

  alterarQuestao(questao: QuestaoFechada) {
    if(questao != undefined){
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-questao-fechada', questao.id()] } } ] );
    }
    
  }

  deleteQuestao(questao:QuestaoFechada) {
    //  QuestaoFechada.delete(questao.pk()).subscribe(resultado=>{
      
    //   QuestaoFechada.getAll().subscribe(questoes=>{this.questoes= questoes});
    //   this.messageDelete();
       
    // });
  }

  viewQuestao(questao:QuestaoFechada) {
    this.router.navigate(["main", { outlets: { principal: ['visualizacao-questao-fechada', questao.id()] } } ] );
    this.messageView();
  }
  messageDelete() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:" foi excluido do banco de questões"});
  }
  messageView(){
    this.messageService.add({severity:'info', summary:'Questao visualizado', detail:'informações sobre a questão'});
  }
  
  
}