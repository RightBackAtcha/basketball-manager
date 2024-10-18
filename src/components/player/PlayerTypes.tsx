// Define types for game
export type Awards = {
    season?: number;
    type?: string;
}

export type Born = {
    year: number;
    location: string;
}

export type Player = {
    awards: Awards;
    born: Born;
    first: string;
    last: string;
    tID: number;
    pID?: number;
}

export type Country = {
    id: number;
    name: string;
    weight: number;
}

export type Name = {
    name: string;
    country_id: number;
}