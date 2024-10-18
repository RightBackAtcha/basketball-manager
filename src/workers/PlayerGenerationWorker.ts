// Offloads player generation onto a separate thread using a web worker

import { Awards, Born, Country, Name, Player, Ratings } from "@/utils/PlayerTypes";

// Weights for player age
const ageDistribution = [
    { age: 19, weight: 2 },
    { age: 20, weight: 3 },
    { age: 21, weight: 4 },
    { age: 22, weight: 5 },
    { age: 23, weight: 8 },
    { age: 24, weight: 12 },
    { age: 25, weight: 14 },
    { age: 26, weight: 16 },
    { age: 27, weight: 13 },
    { age: 28, weight: 10 },
    { age: 29, weight: 8 },
    { age: 30, weight: 5 },
    { age: 31, weight: 3 },
    { age: 32, weight: 2 },
    { age: 33, weight: 1.5 },
    { age: 34, weight: 1.33 },
    { age: 35, weight: 1.25 },
    { age: 36, weight: 1.1 },
    { age: 37, weight: 1 },
    { age: 38, weight: 0.75 },
    { age: 39, weight: 0.5 },
    { age: 40, weight: 0.3 },
    { age: 41, weight: 0.25 }, // Very low weight but still possible
    { age: 42, weight: 0.2 }, // Low but possible
    { age: 43, weight: 0.15 },
    { age: 44, weight: 0.1 }, // Even lower probability
    { age: 45, weight: 0.1 }, // Lower probability
    { age: 46, weight: 0.05 }, // Least likely, but still possible
];

function weightedRandomAge(ageDistribution: { age: number; weight: number }[]) {
    // Calculate total weight
    const totalWeight = ageDistribution.reduce((sum, item) => sum + item.weight, 0);

    // Generate random number between 0 and totalWeight
    const randomNum = Math.random() * totalWeight;

    let cumulativeWeight = 0;

    // Find age based on cumulative weight
    for (const item of ageDistribution) {
        cumulativeWeight += item.weight;
        if (randomNum <= cumulativeWeight) {
            return item.age;
        }
    }

    // Return error if no age found
    return ageDistribution[ageDistribution.length - 1].age;
}

// Weighted random function
function weightedRandom(weights: number[]): number {
    let totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    let random = Math.random() * totalWeight;

    for(let i = 0; i < weights.length; i++) {
        if (random < weights[i]) {
            return i + 1; // Country ID starts from 1, so return index + 1
        }
        random -= weights[i];
    }

    // Error return
    return -1;
}

// Generate player base
function generatePlayerBase(countries: Country[], firstNames: Name[], lastNames: Name[], regions: Name[], tID: number): Player {
    // All country weights
    let countryWeights = countries.map(country => country.weight);

    // Randomly select country with weights
    let randCountryID = weightedRandom(countryWeights);
    let countryData = countries[randCountryID - 1];

    // Filter first names, last names and regions based on country
    const filteredFirstNames = firstNames.filter(name => name.country_id === countryData.id);
    const filteredLastNames = lastNames.filter(name => name.country_id === countryData.id);
    const filteredRegions = regions.filter(name => name.country_id === countryData.id);

    // Randomly select values
    const firstName = filteredFirstNames[Math.floor(Math.random() * filteredFirstNames.length)].name;
    const lastName = filteredLastNames[Math.floor(Math.random() * filteredLastNames.length)].name;
    const region = filteredRegions[Math.floor(Math.random() * filteredRegions.length)];

    const awards: Awards = {};

    const ratings: Ratings[] = [];

    const born: Born = {
        year: 2024 - weightedRandomAge(ageDistribution),
        location: (region.name + ', ' + countryData.name)
    };

    // Return generated player object
    return {
        first: firstName,
        last: lastName,
        awards,
        born,
        tID,
        ratings
    };
}

// Handle messages from main thread
onmessage = function (e: MessageEvent) {
    const { countries, firstNames, lastNames, regions, totalPlayers, tID } = e.data;
    const generatedPlayers: Player[] = [];

    // Generate requested number of players
    for (let i = 0 ; i < totalPlayers; i++) {
        generatedPlayers.push(generatePlayerBase(countries, firstNames, lastNames, regions, tID));
    }

    // Send generated players back to main thread
    postMessage(generatedPlayers);
}