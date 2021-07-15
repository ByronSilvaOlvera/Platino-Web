

export interface GridTable {
    campo1?:  string;
    campo2?:  string;
    campo3?:  string;
    campo4?:  string;
    uid?:  string;
}


export interface HeaderGridTable {
    camponame?:  string;
}

export interface GridTb{
    header?: HeaderGridTable[];
    body?: GridTable[];
}

