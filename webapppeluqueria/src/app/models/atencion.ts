

export interface AtencionResponse {
    ok?: boolean;
    atencion?: Atencion;
}

export interface AtencionPage {
    ok?: boolean;
    atencion?: Atencion[];
    page?: number;
}

export interface Atencion {
    _id?:        string;
    fecha?:      Date;
    hora?:       string;
    idcita?:     string;
    idcliente?:  IdclienteAt;
    idservicio?: Idservicio[];
    createdAt?: Date;
    updatedAt?: Date;
    __v?:        number;
}

export interface Idservicio {
    _id?: string;
    uidService?: string;
}



export interface IdclienteAt {
    _id?:       string;
    nombres?:   string;
    apellidos?: string;
}


