import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { Cliente } from "src/app/models/cliente";
import { EntidadComponente } from "src/app/models/menu";

export interface ComponenteState {
    dataComponente: EntidadComponente;
    entidad: Cliente ;
  }
  
  @Injectable()
  export class ClientesStore extends ComponentStore<ComponenteState> {
    
    constructor() {
      super({entidad : {} , dataComponente : {} });
    }

    //readonly clientes$ = this.select(state => state.clientes);

    selectEntidad() : Observable<Cliente> {
        return this.select((state) => state.entidad);
    }
    
    selectEstdoComponente() : Observable<EntidadComponente> {
        return this.select((state) => state.dataComponente);
        
    }



  }
