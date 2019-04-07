import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanejamentoService } from './planejamento.service';
import { SelfInstructionComponent } from './self-instruction/self-instruction.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SelecionarPlanejamentoComponent } from './selecionar-planejamento/selecionar-planejamento.component';
import { CadastroPlanejamentoComponent } from './cadastro-planejamento/cadastro-planejamento.component';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';

@NgModule({
  declarations: [
    SelfInstructionComponent,
    SelecionarPlanejamentoComponent,
    CadastroPlanejamentoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    InputTextareaModule,
    DropdownModule,

    TableModule,
    SliderModule,
  ],
  providers:[PlanejamentoService]

})
export class SrlModule { }
