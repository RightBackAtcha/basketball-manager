// Define different types for player, country and names
type Player = {
    country: string;
    first: string;
    last: string;
}

type Country = {
    id: number;
    name: string;
    weight: number;
}

type Name = {
    name: string;
    country_id: number;
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

// Generate player
function generatePlayer(countries: Country[], firstNames: Name[], lastNames: Name[]): Player {
    // All country weights
    let countryWeights = countries.map(country => country.weight);

    // Randomly select country with weights
    let randCountryID = weightedRandom(countryWeights);
    let countryData = countries[randCountryID - 1];

    // Filter first and last names based on country
    const filteredFirstNames = firstNames.filter(name => name.country_id === countryData.id);
    const filteredLastNames = lastNames.filter(name => name.country_id === countryData.id);

    // Randomly select name
    const firstName = filteredFirstNames[Math.floor(Math.random() * filteredFirstNames.length)].name;
    const lastName = filteredLastNames[Math.floor(Math.random() * filteredLastNames.length)].name;

    // Return generated player object
    return {
        country: countryData.name,
        first: firstName,
        last: lastName,
    };
}

// Handle messages from main thread
onmessage = function (e: MessageEvent) {
    const { countries, firstNames, lastNames, totalPlayers } = e.data;
    const generatedPlayers: Player[] = [];

    // Generate requested number of players
    for (let i = 0 ; i < totalPlayers; i++) {
        generatedPlayers.push(generatePlayer(countries, firstNames, lastNames));
    }

    // Send generated players back to main thread
    postMessage(generatedPlayers);
}