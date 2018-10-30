import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
//import { GLOBAL } from "./global";
import swal from "sweetalert";
import { UserService } from './user.services';
import { Router } from "@angular/router";
import { throwError } from "rxjs/internal/observable/throwError";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: "root"
})
export class MapaService {
  public urlClientes: String;
  constructor(public http: HttpClient, public usuarioService: UserService, public router: Router) {
    this.urlClientes = environment.urlClientes;
//    this.urlMapas = GLOBAL.url;
  }

  obtenerTodosClientes() {
    console.log("Se obtienen todos los clientes");
    const URL = this.urlClientes;
    return this.http.get(URL + "").pipe(
      map((resp: any) => {
        return resp;
      }), catchError(error => {
        this.router.navigate(['/login']);
        swal('Error', 'Detalle: ' + error.error.text, 'error');
        return throwError(error);
      })
    );
  }

  obtenerClientesPorEstados(estados) {
    console.log("Se obtienen los clientes por estado");
    const URL = this.urlClientes;
    return this.http.get(URL + "/"+estados).pipe(
      map((resp: any) => {
        return resp;
      }), catchError(error => {
        this.router.navigate(['/login']);
        swal('Error', 'Detalle: ' + error.error.text, 'error');
        return throwError(error);
      })
    );
  }

  obtenerPosicion($ciudad, $estado, $cp, $calle) {
    console.log("Se obtienen la posición geográfica");
    const headers = new HttpHeaders({
      Authorization: this.usuarioService.getToken()
    });
//    const URL = "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=" + $ciudad + "," + $estado + "," + $cp + "," + $calle + "&key=AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14";
    const URL = "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=" + $ciudad + "," + $estado + "," + $cp + "&key=AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14";
    return this.http.get(URL).pipe( map((resp: any) => {
        if (resp.status === "OK") {
          return resp.results[0].geometry.location;
        } else {
          return "sin posición";
        }
      }), catchError(error => {
        return "sin posición";
      }) );
  }




}
