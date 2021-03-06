import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import { Groups } from 'src/app/model/experimento/groups';
import TipAutorregulacao from 'src/app/model/srl/tipAutorregulacao';

@Component({
  selector: 'app-tips-regulacao',
  templateUrl: './tips-regulacao.component.html',
  styleUrls: ['./tips-regulacao.component.css']
})
export class TipsRegulacaoComponent implements OnInit {

  display;
  tip;

  constructor(public login:LoginService) { 

    

  }

  ngOnInit() {
    TipAutorregulacao.getAleatorio().subscribe(tip=>{
      let usuario = this.login.getUsuarioLogado();
      let dialogExibida = sessionStorage.getItem("dialogTipsAutorregulacao");
      if(usuario != null && usuario.grupoExperimento != Groups.control && tip != null && (dialogExibida == null || dialogExibida != "true")){
        this.display = true;
        this.tip = tip;
        sessionStorage.setItem('dialogTipsAutorregulacao', "true");
      }
      
    })
  }

}
