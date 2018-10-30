import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.services";
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';

declare var $:any;

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  public usuarios = [];
  public identity;
  public token;
  public cargandoUsuarios = false;

  constructor(private _router: Router, private _srvUser: UserService) {
    this.identity = this._srvUser.getIDentity();
    this.token = this._srvUser.getToken();
  }

  ngOnInit() {
    console.log("Componente usuarios");
    if (!this.identity) {
      this._router.navigate(["/login"]);
    } else if (this.identity.role !== "ADMIN") {
      this._router.navigate(["/home"]);
    } else {
      this.cargarTablaUsuarios();
    }
  }

  cargarTablaUsuarios() {
    this.cargandoUsuarios = true;
    this._srvUser.obtenerUsuarios().subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp;
      this.cargandoUsuarios = false;
    });
  }
}
