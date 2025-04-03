// function to select the player for the daily game
// the logic consist of getting a player from the top 60 players in the world
// and then using the date as a seed to select a player
function daysPassedThisYear() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diff = now - startOfYear;
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}


const dailySelectedPlayer = (players) => {
    // use the amount of days since the year started as seed
    const seed = daysPassedThisYear();
    const player = players[seed % players.length];
    console.log(player);
    return player;
}

export default dailySelectedPlayer;