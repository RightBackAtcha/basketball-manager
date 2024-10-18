// Define types for game
export type Awards = {
    season?: number;
    type?: string;
}

export type Ratings = {
    speed: number;
    agility: number;
    strength: number;
    stamina: number;
    close: number;
    midRange: number;
    threeRange: number;
    freeThrow: number;
    driveDunk: number;
    standDunk: number;
    post: number;
    passAcc: number;
    ballHandle: number;
    intDef: number;
    perDef: number;
    steal: number;
    block: number;
    offIQ: number;
    defIQ: number;
    ovr: number;
    pot: number;
    year: number;
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
    ratings: Ratings[];
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