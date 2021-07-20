import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import  {  createFeatureSelector  } from '@ngrx/store' ; 



export const selectRouter = createFeatureSelector<RouterReducerState>('enrutador');

export  const  { 
    selectCurrentRoute ,  // selecciona la ruta actual 
    selectFragment ,  // selecciona el ruta actual fragmento de 
    selectQueryParams ,  // seleccione los consulta de la ruta actual parámetros de 
    selectQueryParam ,  // función de fábrica para seleccionar un parámetro de consulta 
    selectRouteParams ,  // seleccione los ruta actual parámetros de la 
    selectRouteParam ,  // función de fábrica para seleccionar un parámetro de ruta 
    selectRouteData ,  // selecciona los datos de la ruta actual 
    selectUrl ,  // selecciona la URL actual 
    }  =  getSelectors ( selectRouter ); 