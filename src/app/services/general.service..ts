import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import swal from "sweetalert";
import { Router } from "@angular/router";
import { throwError } from "rxjs/internal/observable/throwError";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: "root"
})
export class GeneralService {
  public urlMapas: String;

  constructor(public http: HttpClient,  public router: Router) {
    this.urlMapas = environment.url;
  }

  obtenerClima($codigoCiudad) {
    console.log("Se obtiene el clima de la ciudad");
    const URL = "http://apidev.accuweather.com/currentconditions/v1/" + $codigoCiudad + ".json?language=es&apikey=hoArfRosT1215";
    return this.http.get(URL).pipe(map((resp: any) => {
      console.log(resp[0].WeatherText);
      return resp[0];
    }), catchError(error => {
      return "sin posición";
    }));
  }



  obtenerPosicion($ciudad, $estado, $cp, $calle) {
    console.log("Se obtienen la posición geográfica");
    const URL = "https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=" + $ciudad + "," + $estado + "," + $cp + "," + $calle +"&key=AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14";
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
