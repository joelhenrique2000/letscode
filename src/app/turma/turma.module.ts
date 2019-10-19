import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarTurmaComponent } from './visualizar-turma/visualizar-turma.component';
import { CsclModule } from '../cscl/cscl.module';
import { ButtonModule } from 'primeng/button';
import { CadastrarEstudantesComponent } from './cadastrar-estudantes/cadastrar-estudantes.component';
import { CadastrarTurmaComponent } from './cadastrar-turma/cadastrar-turma.component';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule, InputTextModule, CardModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { ListarEstudantesComponent } from './listar-estudantes/listar-estudantes.component';
import { TableModule } from 'primeng/table';
import { SrlModule } from '../srl/srl.module';
import { ListarTurmaComponent } from './listar-turma/listar-turma.component';
import {ContextMenuModule,MenuItem} from 'primeng/primeng';
import { ListarTurmaProfessorComponent } from './listar-turma-professor/listar-turma-professor.component';
import { ListarProfessoresComponent } from './listar-professores/listar-professores.component';


@NgModule({
  declarations: [ListarTurmaComponent, ListarTurmaProfessorComponent,
    ListarProfessoresComponent, VisualizarTurmaComponent, CadastrarEstudantesComponent, CadastrarTurmaComponent, ListarEstudantesComponent],
  imports: [
    CsclModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    AutoCompleteModule,
    ToastModule,
    InputTextModule,
    TableModule,
    SrlModule,
    ContextMenuModule,
    CardModule
  ],
  exports:[VisualizarTurmaComponent, ListarEstudantesComponent]
})
export class TurmaModule { }
