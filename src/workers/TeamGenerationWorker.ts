// Offload team generation and assigning players to teams
import {Team} from "@/utils/teams/TeamTypes";

function createTeam(numTeams: number, teams: Team[]): Team[] {
    const teamsSliced = teams.slice(0, numTeams);

    // Determine conference and division for teams
    for (let i = 0; i < numTeams; i++) {
        teamsSliced[i].conference = i < 15 ? "East" : "West";
        teamsSliced[i].division = Math.floor(i / 5) + 1;
        teamsSliced[i].roster = [];
        teamsSliced[i].cap = 0;
    }

    return teamsSliced;
}

// Handle messages from main thread
onmessage = function(e: MessageEvent) {
    const { numTeams, teams } = e.data;

    // Check if teams is array and not empty
    if (!Array.isArray(teams) || teams.length === 0) {
        console.error("Invalid teams data received:", teams);
        postMessage([]);
        return;
    }

    // Create teams
    let generatedTeams = createTeam(numTeams, teams);

    // Send teams back to main thread
    postMessage(generatedTeams);
}