import { gaussianRandom } from "@/utils/DataUtils";
import { Player, Position } from "@/utils/PlayerTypes";

export default function GenerationHeight(): Player {
    // Player variable that we will return with its pos and height
    let player: Player = {
        awards: undefined,
        born: undefined,
        first: undefined,
        last: undefined,
        college: undefined,
        tID: undefined,
        pID: undefined,
        ratings: undefined,
        pos: undefined,
        hgtInches: undefined,
        wingSpanInches: undefined,
        badges: undefined,
    };

    const meanHeight = 79; // Average height of NBA player is 6 ft 7 in
    const stdHeight = 3.2; // Standard deviation for player height

    const pos: Position[] = ["PG", "SG", "SF", "PF", "C"]; // Position bank

    let heightInches = gaussianRandom(meanHeight, stdHeight);

    // Min height = 5'8" Max height = 7'7"
    if (heightInches < 68) heightInches = 68;
    if (heightInches > 91) heightInches = 91;

    player.hgtInches = heightInches;
    // Position based on height
    if (heightInches <= 76) { // Height between 5'8" and 6'4"
        const temp = Math.random();

        if (temp > 0.92) {
            player.pos = "SF";
        } else if (temp > 0.47) {
            player.pos = "SG";
        } else {
            player.pos = "PG";
        }
    }

    else if (heightInches < 82 && heightInches > 76) { // Height between 6'4" and 6'10"
        const temp = Math.random();

        if (temp > 0.95) {
            player.pos = "C";
        } else if (temp > 0.90) {
            player.pos = "PF";
        } else if (temp > 0.70) {
            player.pos = "SF";
        } else if (temp > 0.35) {
            player.pos = "SG";
        } else {
            player.pos = "PG";
        }
    }

    else { // Height between 6'10" and 7'7"
        const temp = Math.random();

        if (temp > 0.97) {
            player.pos = "SG";
        } else if (temp > 0.90) {
            player.pos = "SF";
        } else if (temp > 0.60) {
            player.pos = "PF";
        } else {
            player.pos = "C";
        }
    }

    // Return edited player
    return player;
}