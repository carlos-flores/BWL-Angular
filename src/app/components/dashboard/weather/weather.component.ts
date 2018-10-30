import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service.';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.services';

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html"
})
export class WeatherComponent implements OnInit {
  public identity;
  public token;
  public datosClima:any;

  constructor(
    private _router: Router,
    private _srvGeneral: GeneralService,
    private _srvUser: UserService
  ) {
    this.identity = this._srvUser.getIDentity();
    this.token = this._srvUser.getToken();
    this.obtenerClima();
  
  }

  ngOnInit() {
    if (!this.identity) {
      this._router.navigate(["/login"]);
    } else {
    }  
  }

  obtenerClima() {
    console.log("obteniendo clima");
    this._srvGeneral.obtenerClima(236231).subscribe((resp: any) => {
          console.log(resp);
          this.datosClima=resp;
        });
    
  }
}
