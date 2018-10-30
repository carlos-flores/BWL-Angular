import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: "app-tareas",
  templateUrl: "./tareas.component.html"
})
export class TareasComponent implements OnInit {
  public identity;
  public token;
  public tareas = [];

  constructor(private _router: Router, private _srvUser: UserService) {
    this.identity = this._srvUser.getIDentity();
    this.token = this._srvUser.getToken();
    this.obtenerTareas();
  }

  ngOnInit() {
    if (!this.identity) {
      this._router.navigate(["/login"]);
    } else {
    }
  }

  obtenerTareas() {
    console.log("obteniendo lista de tareas");
    this._srvUser.obtenerTareas(this.identity.id).subscribe((resp: any) => {
      console.log(resp);
      this.tareas = resp.detalle;
    });
  }
}
