

export interface GridTable {
    campo1?:  string;
    campo2?:  string;
    campo3?:  string;
    campo4?:  string;
}


export interface HeaderGridTable {
    campo1?:  string;
    campo2?:  string;
    campo3?:  string;
    campo4?:  string;
}

export interface GridTb{
    header?: HeaderGridTable;
    body?: GridTable[];
}

