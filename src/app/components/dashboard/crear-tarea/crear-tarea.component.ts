import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-crear-tarea",
  templateUrl: "./crear-tarea.component.html"
})
export class CrearTareaComponent implements OnInit {
  public identity;
  public token;
  public registrandoTarea = false;

  public tareaNueva: any = {
    titulo: "",
    descripcion: "",
    fechaentrega: "",
    usuario: ""
  };

  constructor(private _router: Router, private _srvUser: UserService) {
    this.identity = this._srvUser.getIDentity();
    this.token = this._srvUser.getToken();
    this.tareaNueva.usuario = this.identity.id;
  }

  ngOnInit() {
    console.log("Componente crear-tarea");
    if (!this.identity) {
      this._router.navigate(["/login"]);
    }  
    }



  registrarTarea(formulario: NgForm) {
    console.log("se va a registrar una tarea");
    // Se evalua que el formulario es válido

      this.registrandoTarea = true;
    console.log(formulario.controls);
    console.log(formulario.controls.titulo.value);
    console.log(formulario.controls.descripcion.value);
    console.log(formulario.controls.fechaentrega.value);

      console.log(this.tareaNueva);

      this._srvUser.registrarTarea(this.tareaNueva).subscribe((resp: any) => {
        if (resp.status === 400) {
          console.log(resp);
          swal("Error al registrar", resp.detalle, "error");
        } else {
          console.log(resp);
          swal(
            "Usuario registrado",
            "Se ha registrado el usuario en la BD",
            "success"
          );
          this.prepararTareaNueva();
        }
        this.registrandoTarea = false;
      }); 

  }

  prepararTareaNueva() {
    this.tareaNueva = {
      titulo: "",
      descripcion: "",
      fechaentrega: "",
      usuario: this.identity.id
    };
  }

  }



