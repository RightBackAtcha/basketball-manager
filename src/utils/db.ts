import Dexie, { EntityTable } from 'dexie';

import { Player } from "@/utils/PlayerTypes"
import { Team } from "@/utils/TeamTypes"

const db = new Dexie(`league`) as Dexie & {
    players: EntityTable<
        Player,
        'pID'   // playerID primary key
    >;
    teams: EntityTable<
        Team,
        'tID'   // teamID primary key
    >;
};

// Schema declaration
db.version(1).stores({
    players: `
        pID, born, first, last, college, awards, tID, ratings, pos, hgtInches, wingSpanInches,
        badges
    `,
    teams: `tID, region, name, roster, conference, division`
});

export { db };