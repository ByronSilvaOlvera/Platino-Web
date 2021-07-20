import { createReducer, on , Action} from '@ngrx/store';
import { Paginacion } from '../models/menu';
import { increment, decrement, reset, movimiento, bloqueada, completa, incompleta, countpage, componente } from './page.actions';

export const page:Paginacion={ page:1, completa:true, numberPage:0 };
export const pageEstado:boolean=true;

const _pageReducer = createReducer(
  page,
  on(increment, (state  ) => ( { ...state , page : state.page! + 1}) ),
  on(completa, (state ) => ( { ...state , completa : false, page : state.page! - 1 }) ),
  on(incompleta, (state ) => ( { ...state , completa : true }) ),
  on(componente, (state,{ componente } ) => ( { ...state , componente : componente }) ),
  on(decrement, (state, ) => ({ ...state , page : state.page! - 1  }) ),
  on(countpage, (state, { numberPage } ) => ({ ...state , numberPage : numberPage  }) ),
  
  on(reset, (state) => ({ page:1,completa:true }))
);

export function pageReducer(state:Paginacion | undefined, action: Action) {
  return _pageReducer(state, action);
}




// const _pageCompletaReducer = createReducer(
//   pageEstado,
//   on( movimiento, (state) => true ),
//   on( bloqueada,  (state) => false )
// );

// export function pageCompletaReducer(state:any, action : Action){
//   return _pageCompletaReducer(state, action);
// }