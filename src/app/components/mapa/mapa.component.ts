import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, FormArray, NgForm} from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from "../../services/user.services";
import swal from "sweetalert";
import { MapaService } from '../../services/mapa.service';
import { Marker } from '../../models/marker';
import { Select2OptionData } from "ng2-select2";
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

declare var $: any;

@Component({
  selector: "app-mapa",
  templateUrl: "./mapa.component.html",
  styleUrls: ["./mapa.component.css"]
})
export class MapaComponent implements OnInit {
  public identity;
  public token;

  public lstPuntos: Marker[] = [];
  public lstProductos = [];
  public lstClientes = [];

  public cargandoPuntos=false;

  public erroresValidacion = "";
  public zoom: number = 5;
  public lat: number = 22.207917;
  public lng: number = -101.657618;

  public datosBase: any = {
    banderaEstado: true,
  };

  public estadosData: Array<Select2OptionData>;
  public optionsEstados: Select2Options;
  public estadosValue: string[];
  public estadosCadena: string=null;

  constructor(
    private _router: Router,
    private _srvUser: UserService,
    private _srvMapa: MapaService
  ) {
    this.identity = this._srvUser.getIDentity();
    this.token = this._srvUser.getToken();
  }

  ngOnInit() {
    if (!this.identity) {
      this._router.navigate(["/login"]);
    } else {
      this.obteniendoEstadosData();
    }
  }

  /**********************************************
   *              E V E N T O S
   **********************************************/

  /*
  Evento ligado al detectarse un cambio en los estados seleccionados.
  Crea una cadena se estados separados por una coma
  */
  estadosSeleccionados(data: { value: string[] }) {
    this.estadosCadena = data.value.join(",");
  }

  /*
  Evento ligado al detectarse un click sobre el mapa.
  */
  mapaPresionado(evento: any) {
    console.log("Se ha dado click sobre el mapa...");
    console.log(evento);
  }

  /*
  Evento ligado al detectarse un click sobre un marcador.
  */

  marcadorPresionado(marcador: Marker, index: number) {
    console.log("Se ha dado click sobre el marcador...");
    console.log(marcador);
    console.log(index);
  }

  /*
  Evento ligado al detectarse un drag and drop sobre un marcador.
  */
  marcadorArrastrado(marcador: Marker, evento: any) {
    console.log("Se ha reubicado el marcador");
    console.log(marcador);
    console.log(evento);
  }

  /*
  Evento ligago al cerrado de la ventana de un marcador
   */
  cerrarWindow() {
    console.log("Se ha cerrado la ventana del marcador");
  }

  /*
  Evento ligado al botón para buscar clientes en base a los valores de los filtros.
  Acciones:
  1. Evalua el formulario
  2. Determina que WS se debe invocar para obtener los resultados
  */
  buscarClientes(formulario: NgForm) {
    console.log("Se deben de obtener las posiciones");
    console.log(formulario);
    console.log("estados");
    console.log(this.estadosValue);
    console.log("->" + this.estadosCadena);
    const prueba = true;
    let mntINI = -1;
    let mntFIN = -1;


    this.cargandoPuntos = true;
   if(this.estadosCadena!==""){
     console.log('Se obtienen clientes por estado');
     this._srvMapa.obtenerClientesPorEstados(this.estadosCadena).subscribe((resp: any) => {
       
       if (resp.detalle.length > 0) {
         console.log("total de registros:", resp.detalle.length);
         console.log(resp.detalle);
         this.obtenerPosiciones(resp.detalle);
       } else {
         this.lstPuntos = [];
         swal("Sin Datos", "No se han encontrado datos para estos criterios de busqueda", "warning");
         this.cargandoPuntos = false;
       }
     }); 
   }else{
     console.log('se deben obtener TODOS los clientes');
     this._srvMapa.obtenerTodosClientes()
       .subscribe((resp: any) => {

         if (resp.detalle.length > 0) {
           console.log("total de registros:", resp.detalle.length);
           console.log(resp.detalle);
           this.obtenerPosiciones(resp.detalle);
         } else {
           this.lstPuntos = [];
           swal(
             "Sin Datos",
             "No se han encontrado datos para estos criterios de busqueda",
             "warning"
           );
           this.cargandoPuntos = false;
         }
       }); 
   }   

    

  }



  /**************************************************
   *     M e t o d o s    d e    U t i l i d a d
   **************************************************/


  obteniendoEstadosData() {
    this.estadosValue = [];
    this.optionsEstados = {
      multiple: true,
      placeholder: "Selecciona al menos un estado"
    };
    this.estadosCadena = "";
    this.estadosData = [];
    this.estadosData.push({ id: "Aguascalientes", text: "Aguascalientes" });
    this.estadosData.push({ id: "Baja California Norte", text: "Baja California Norte" });
    this.estadosData.push({ id: "Baja California Sur", text: "Baja California Sur" });
    this.estadosData.push({ id: "Campeche", text: "Campeche" });
    this.estadosData.push({ id: "Chiapas", text: "Chiapas" });
    this.estadosData.push({ id: "Chihuahua", text: "Chihuahua" });
    this.estadosData.push({ id: "Ciudad de México", text: "Ciudad de México" });
    this.estadosData.push({ id: "Coahuila", text: "Coahuila" });
    this.estadosData.push({ id: "Colima", text: "Colima" });
    this.estadosData.push({ id: "Durango", text: "Durango" });
    this.estadosData.push({ id: "Estado de México", text: "Estado de México " });
    this.estadosData.push({ id: "Guanajuato", text: "Guanajuato" });
    this.estadosData.push({ id: "Guerrero", text: "Guerrero" });
    this.estadosData.push({ id: "Hidalgo", text: "Hidalgo" });
    this.estadosData.push({ id: "Jalisco", text: "Jalisco" });
    this.estadosData.push({ id: "Michoacán", text: "Michoacán" });
    this.estadosData.push({ id: "Morelos", text: "Morelos" });
    this.estadosData.push({ id: "Nayarit", text: "Nayarit" });
    this.estadosData.push({ id: "Nuevo León", text: "Nuevo León" });
    this.estadosData.push({ id: "Oaxaca", text: "Oaxaca" });
    this.estadosData.push({ id: "Puebla", text: "Puebla" });
    this.estadosData.push({ id: "Querétaro", text: "Querétaro" });
    this.estadosData.push({ id: "Quintana Roo", text: "Quintana Roo" });
    this.estadosData.push({ id: "San Luis Potosí", text: "San Luis Potosí" });
    this.estadosData.push({ id: "Sinaloa", text: "Sinaloa" });
    this.estadosData.push({ id: "Sonora", text: "Sonora" });
    this.estadosData.push({ id: "Tabasco", text: "Tabasco" });
    this.estadosData.push({ id: "Tamaulipas", text: "Tamaulipas" });
    this.estadosData.push({ id: "Tlaxcala", text: "Tlaxcala" });
    this.estadosData.push({ id: "Veracruz", text: "Veracruz" });
    this.estadosData.push({ id: "Yucatán", text: "Yucatán" });
    this.estadosData.push({ id: "Zacatecas", text: "Zacatecas" });
  }

  obtenerPosiciones(lstPosicionesCliente) {
    console.log("obteniendo posiciones");
    this.lstPuntos = [];
    this.lstClientes = [];
    lstPosicionesCliente.forEach(cliente => {
      this._srvMapa
        .obtenerPosicion(
          cliente.ciudad,
          cliente.estado,
          cliente.cp,
          cliente.calle
        )
        .subscribe((respPos: any) => {
          if (respPos !== "sin posición") {
            let nuevoMarcador: Marker = {
              id: cliente.id,
              nombre: cliente.cliente,
              latitud: respPos.lat,
              longitud: respPos.lng,
              descripcion: "Sin descripción",
              ciudad: cliente.ciudad,
              estado: cliente.estado,
              totalFacturas: 0,
              calle: cliente.calle,
              codigo_postal: cliente.cp,
              arrastrable: false,
              localizado: true
            };

            this.lstPuntos.push(nuevoMarcador);
            this.lstClientes.push(nuevoMarcador);
          } else {
            console.log(cliente.cliente + " -- SIN POSICION --");
            let nuevoMarcador: Marker = {
              id: cliente.id,
              nombre: cliente.cliente,
              descripcion: "Sin descripción",
              ciudad: cliente.ciudad,
              estado: cliente.estado,
              totalFacturas: 0,
              calle: cliente.calle,
              codigo_postal: cliente.cp,
              localizado: false
            };
            this.lstClientes.push(nuevoMarcador);
          }
        });
    });
    this.cargandoPuntos = false;
  }
}


