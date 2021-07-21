import { createAction, props } from '@ngrx/store';
import { Paginacion } from '../models/menu';


export const uidComponente = createAction('[Page Component] Uid' ,
 props<{uid : string } >()  );

export const increment = createAction('[Page Component] Increment' );

export const decrement = createAction('[Page Component] Decrement' ); // ,   props<{completa : boolean } >() 

export const componente = createAction('[Page Component] Componente'
, props<{componente : string } >() );

export const reset = createAction('[Page Component] Reset');

export const completa = createAction('[Page Component] Completa');

export const incompleta = createAction('[Page Component] InCompleta');

export const countpage = createAction('[Page Component] CountPage'
, props<{ numberPage : number } >() );


export const movimiento = createAction('[Page Component] Completa');

export const bloqueada = createAction('[Page Component] Bloqueada');