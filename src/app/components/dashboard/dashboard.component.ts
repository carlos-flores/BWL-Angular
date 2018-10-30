import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.services";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public identity;
  public token;

  constructor(private _router: Router, private _srvUser: UserService) {
    this.identity = this._srvUser.getIDentity();
    this.token = this._srvUser.getToken();
  }

  ngOnInit() {
    console.log("Componente usuarios");
    if (!this.identity) {
      this._router.navigate(["/login"]);
    } else if (this.identity.role !== "ADMIN" && this.identity.role!== "USER") {
      console.log('se debe tener rol ADMIN/USER para entrar a esta página');
      this._router.navigate(["/home"]);
    } else {
      console.log('Se puede navegar sin problema');
    }
  }
}
