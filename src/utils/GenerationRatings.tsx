import { Ratings, Position } from "@/utils/PlayerTypes";
import { gaussianRandom } from "@/utils/DataUtils";

const ratingsWeight = [
    0.09, 0.09, 0.06, 0.06, 0.08, 0.06, 0.07, 0.07, 0.05,
    0.06, 0.06, 0.05, 0.04, 0.06, 0.06, 0.05, 0.06];

const positionRatings = {
    PG: {
        ovr: { mean: 0, std: 0 },
        pot: { mean: 0, std: 0 },
        offIQ: { mean: 65, std: 5 },
        defIQ: { mean: 58, std: 5 },
        driveDunk: { mean: 45, std: 5 },
        block: { mean: 30, std: 5 },
        speed: { mean: 70, std: 5 },
        stamina: { mean: 65, std: 5 },
        passAcc: { mean: 70, std: 5 },
        perDef: { mean: 60, std: 5 },
        post: { mean: 35, std: 5 },
        standDunk: { mean: 20, std: 5 },
        steal: { mean: 65, std: 5 },
        ballHandle: { mean: 75, std: 5 },
        threeRange: { mean: 60, std: 5 },
        midRange: { mean: 55, std: 5 },
        freeThrow: { mean: 70, std: 5 },
        intDef: { mean: 35, std: 5 },
        strength: { mean: 45, std: 5 },
        close: { mean: 60, std: 5 },
        agility: { mean: 70, std: 5 },
    },
    SG: {
        ovr: { mean: 0, std: 0 },
        pot: { mean: 0, std: 0 },
        offIQ: { mean: 63, std: 5 },
        defIQ: { mean: 55, std: 5 },
        driveDunk: { mean: 55, std: 5 },
        block: { mean: 30, std: 5 },
        speed: { mean: 65, std: 5 },
        stamina: { mean: 63, std: 5 },
        passAcc: { mean: 60, std: 5 },
        perDef: { mean: 55, std: 5 },
        post: { mean: 35, std: 5 },
        standDunk: { mean: 25, std: 5 },
        steal: { mean: 62, std: 5 },
        ballHandle: { mean: 70, std: 5 },
        threeRange: { mean: 63, std: 5 },
        midRange: { mean: 60, std: 5 },
        freeThrow: { mean: 68, std: 5 },
        intDef: { mean: 35, std: 5 },
        strength: { mean: 45, std: 5 },
        close: { mean: 62, std: 5 },
        agility: { mean: 65, std: 5 },
    },
    SF: {
        ovr: { mean: 0, std: 0 },
        pot: { mean: 0, std: 0 },
        offIQ: { mean: 61, std: 5 },
        defIQ: { mean: 54, std: 5 },
        driveDunk: { mean: 58, std: 5 },
        block: { mean: 32, std: 5 },
        speed: { mean: 64, std: 5 },
        stamina: { mean: 62, std: 5 },
        passAcc: { mean: 58, std: 5 },
        perDef: { mean: 54, std: 5 },
        post: { mean: 48, std: 5 },
        standDunk: { mean: 35, std: 5 },
        steal: { mean: 60, std: 5 },
        ballHandle: { mean: 68, std: 5 },
        threeRange: { mean: 62, std: 5 },
        midRange: { mean: 61, std: 5 },
        freeThrow: { mean: 67, std: 5 },
        intDef: { mean: 40, std: 5 },
        strength: { mean: 50, std: 5 },
        close: { mean: 64, std: 5 },
        agility: { mean: 62, std: 5 },
    },
    PF: {
        ovr: { mean: 0, std: 0 },
        pot: { mean: 0, std: 0 },
        offIQ: { mean: 59, std: 5 },
        defIQ: { mean: 53, std: 5 },
        driveDunk: { mean: 60, std: 5 },
        block: { mean: 36, std: 5 },
        speed: { mean: 58, std: 5 },
        stamina: { mean: 60, std: 5 },
        passAcc: { mean: 55, std: 5 },
        perDef: { mean: 52, std: 5 },
        post: { mean: 52, std: 5 },
        standDunk: { mean: 40, std: 5 },
        steal: { mean: 55, std: 5 },
        ballHandle: { mean: 60, std: 5 },
        threeRange: { mean: 60, std: 5 },
        midRange: { mean: 58, std: 5 },
        freeThrow: { mean: 65, std: 5 },
        intDef: { mean: 45, std: 5 },
        strength: { mean: 55, std: 5 },
        close: { mean: 60, std: 5 },
        agility: { mean: 58, std: 5 },
    },
    C: {
        ovr: { mean: 0, std: 0 },
        pot: { mean: 0, std: 0 },
        offIQ: { mean: 58, std: 5 },
        defIQ: { mean: 58, std: 5 },
        driveDunk: { mean: 50, std: 5 },
        block: { mean: 38, std: 5 },
        speed: { mean: 55, std: 5 },
        stamina: { mean: 58, std: 5 },
        passAcc: { mean: 55, std: 5 },
        perDef: { mean: 50, std: 5 },
        post: { mean: 55, std: 5 },
        standDunk: { mean: 45, std: 5 },
        steal: { mean: 52, std: 5 },
        ballHandle: { mean: 52, std: 5 },
        threeRange: { mean: 48, std: 5 },
        midRange: { mean: 55, std: 5 },
        freeThrow: { mean: 60, std: 5 },
        intDef: { mean: 55, std: 5 },
        strength: { mean: 60, std: 5 },
        close: { mean: 58, std: 5 },
        agility: { mean: 54, std: 5 },
    },
};

function calculateOverall(ratings: Ratings): number {
    return (
        ratings.offIQ * ratingsWeight[0] + ratings.defIQ * ratingsWeight[1] + ratings.driveDunk * ratingsWeight[2] +
        ratings.block * ratingsWeight[3] + ratings.speed * ratingsWeight[4] + ratings.stamina * ratingsWeight[5] +
        ratings.stamina * ratingsWeight[6] + ratings.passAcc * ratingsWeight[7] + ratings.perDef * ratingsWeight[8] +
        ratings.post * ratingsWeight[9] + ratings.standDunk * ratingsWeight[10] + ratings.steal * ratingsWeight[11] +
        ratings.ballHandle * ratingsWeight[12] + ratings.threeRange * ratingsWeight[13] + ratings.midRange * ratingsWeight[14] +
        ratings.freeThrow * ratingsWeight[15] + ratings.intDef * ratingsWeight[16] + ratings.strength * ratingsWeight[17] +
        ratings.close * ratingsWeight[18] + ratings.agility * ratingsWeight[19]);
}

function generatePotential(_basePot = 60, ovr: number, age: number): number {
    let pot = gaussianRandom(ovr + 10, 5);

    if (age >= 29) {
        const agePenalty = (age - 28) * 2.0;
        pot -= (agePenalty * Math.random());
    } else {
        const baseBoost = 5;
        pot += (baseBoost * Math.random());
    }

    return pot;
}

const GenerationRatings = (position: Position | undefined, age: number): Ratings => {
    // Variable needed for ratings generation <--TEMP-->
    let ratings: Ratings = {
        ovr: 0,
        pot: 0,
        offIQ: 0,
        defIQ: 0,
        driveDunk: 0,
        block: 0,
        speed: 0,
        stamina: 0,
        passAcc: 0,
        perDef: 0,
        post: 0,
        standDunk: 0,
        steal: 0,
        ballHandle: 0,
        threeRange: 0,
        midRange: 0,
        freeThrow: 0,
        intDef: 0,
        strength: 0,
        close: 0,
        agility: 0,
    };
    if(position !== undefined) {
        // Generates different ratings based on position and age
        for (const attribute of Object.keys(positionRatings[position]) as Array<keyof Ratings>) {
            const { mean, std } = positionRatings[position][attribute];
            ratings[attribute] = gaussianRandom(mean, std);
        }

        // Calculate ovr after ratings are randomly generated by position
        ratings.ovr = calculateOverall(ratings);
        ratings.pot = generatePotential(60, ratings.ovr, age);

        ratings.ovr = Math.min(ratings.pot, ratings.ovr);
    }

    return ratings;
};

export default GenerationRatings;