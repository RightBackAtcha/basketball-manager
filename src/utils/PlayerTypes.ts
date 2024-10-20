// Define types for players
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

export type Badge = {
    name: string;
    boost: string;
}

export type Born = {
    year: number;
    location: string;
}

export type College = {
    name: string;
    weight: number;
}

export type Player = {
    awards: Awards;
    born: Born;
    first: string;
    last: string;
    college: string;
    tID: number;
    pID: number;
    ratings: Ratings;
    pos?: string;
    hgtInches?: number;
    wingSpanInches?: number;
    badges?: Badge[];

}

export type Country = {
    id: number;
    name: string;
    weight: number;
}

export type Region = {
    name: string;
    country_id: number;
}

export type Names = {
    firstNames: {
        [key: string]: string[];
    };
    lastNames: {
        [key: string]: string[];
    }
}