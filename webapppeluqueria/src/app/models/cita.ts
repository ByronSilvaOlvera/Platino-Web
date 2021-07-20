

export interface ResponseCita {
    ok:   boolean;
    cita: Cita;
    msg?:string;
}

export interface Cita {
    estado?:      string;
    _id?:         string;
    fecha?:       Date;
    hora?:        string;
    descripcion?: string;
    idcliente:   Idcliente;
    createdAt?:   Date;
    updatedAt?:   Date;
    __v?:         number;
}

export interface CitaPaginacion {
    ok:    boolean;
    page:  string;
    citas: Cita[];
}


export interface Idcliente {
    _id?:       string;
    nombres?:   string;
    apellidos?: string;
}
