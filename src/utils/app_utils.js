export const MatchType = {
    EXACT: 'exact',
    PARTIAL: 'partial',
    NONE: 'none'
}

export const getMatches = (player, targetPlayer) => {
    let nationMatch = player.nation === targetPlayer.nation ? MatchType.EXACT : MatchType.NONE;
    let leagueMatch = player.league === targetPlayer.league ? MatchType.EXACT : MatchType.NONE;
    
    // Age comparison with direction
    let ageMatch = player.age === targetPlayer.age ? MatchType.EXACT : (player.age === targetPlayer.age + 1 || player.age === targetPlayer.age - 1) ? MatchType.PARTIAL : MatchType.NONE;
    let ageDirection = null;
    if (player.age !== targetPlayer.age) {
        ageDirection = player.age < targetPlayer.age ? 'higher' : 'lower';
    }
    
    // Position comparison
    let positionMatch = player.position === targetPlayer.position ? MatchType.EXACT : (player.alternative_positions.includes(targetPlayer.position) || targetPlayer.alternative_positions.includes(player.position)) ? MatchType.PARTIAL : MatchType.NONE;

    // Height comparison with direction
    let parsedHeight = parseInt(player.height.split('cm')[0]);
    let targetParsedHeight = parseInt(targetPlayer.height.split('cm')[0]);
    let heightMatch = parsedHeight === targetParsedHeight ? MatchType.EXACT : (parsedHeight >= targetParsedHeight * 0.98 && parsedHeight <= targetParsedHeight * 1.02) ? MatchType.PARTIAL : MatchType.NONE;
    let heightDirection = null;
    if (parsedHeight !== targetParsedHeight) {
        heightDirection = parsedHeight < targetParsedHeight ? 'higher' : 'lower';
    }

    return {
        nation: nationMatch,
        league: leagueMatch,
        position: positionMatch,
        age: ageMatch,
        height: heightMatch,
        ageDirection: ageDirection,
        heightDirection: heightDirection
    }
}
