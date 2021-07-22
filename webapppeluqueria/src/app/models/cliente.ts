export interface ResponseCliente {
    ok:      boolean;
    cliente: Cliente;
    msg: string;
    listado: number;
}

export interface Cliente {
    _id?:            string;
    nombres?:        string;
    apellidos?:      string;
    identificacion?: string;
    telefono?:       string;
    email?:          string;
    direccion?:      string;
    fechanacio?:     Date;
    createdAt?:      Date;
    updatedAt?:      Date;
    __v?:            number;
}


// export interface ResponseCliente {
//     ok:      boolean;
//     cliente: Cliente;
// }

export interface PaginacionCliente {
    ok:      boolean;
    clientes: Cliente[];
    
}

export enum TitulosCliente {
    List   = "Listado de Clientes",
    Create = "Crear un nuevo Cliente",
    Update = "Actualizar un Cliente",
    Delete = "Eliminar un Cliente",
    Detail = "Detalle del Cliente",
}