export interface Menu {
    icon?:  string;
    title?: string;
    link?:  string;
}

export interface Menu {
    icon?:  string;
    title?: string;
    link?:  string;
    num?: number;
    componente?: string;
    submenus?: Menu[];
}


export interface CardData {
    icon?:  string;
    numero?: number;
    title?:  string;
    subtitle?:  string;
    tipo?:  string;
    position?: number;
}

export interface uidTipo{
    uid?: string;
    tipo?: string;
}

export interface Paginacion{
    page?: number;
    completa?: boolean;
    numberPage?: number;
    componente?: string;
}

export interface AppState{
    page?:Paginacion
  }