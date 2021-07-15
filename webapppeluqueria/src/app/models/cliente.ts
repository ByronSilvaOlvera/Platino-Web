export interface ResponseCliente {
    ok:      boolean;
    cliente: Cliente;
    msg: string;
}

export interface Cliente {
    _id:            string;
    nombres:        string;
    apellidos:      string;
    identificacion: string;
    telefono:       string;
    email:          string;
    direccion:      string;
    fechanacio:     Date;
    createdAt:      Date;
    updatedAt:      Date;
    __v:            number;
}


// export interface ResponseCliente {
//     ok:      boolean;
//     cliente: Cliente;
// }

export interface PaginacionCliente {
    ok:      boolean;
    clientes: Cliente[];
    
}
