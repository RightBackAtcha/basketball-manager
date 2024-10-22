import Dexie, { EntityTable } from 'dexie';

import { Player } from "@/utils/player/PlayerTypes"
import { Team } from "@/utils/teams/TeamTypes"
import { Metadata } from "@/utils/league/LeagueTypes";

const openDexieLeague = (saveID: number) => {
    const db = new Dexie(`league${saveID}`) as Dexie & {
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

    return db;
}

const openMetadata = () => {
    const dbMeta = new Dexie(`meta`) as Dexie & {
        metadata: EntityTable<
            Metadata,
            'mID'   // mID primary key
        >
    }

    dbMeta.version(1).stores({
        metadata: `++mID, startingSeason, season, tID`
    })

    return dbMeta;
}

export { openDexieLeague, openMetadata };