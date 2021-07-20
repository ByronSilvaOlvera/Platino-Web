
export interface ResponseSerProducto {
    ok:        boolean;
    page:      string;
    servicios: Servicio[];
}

export interface Servicio {
    _id?:    string;
    nombre?: string;
    precio?: number;
    tiempo?: string;
    __v?:    number;
}
