
export const MatchType = {
    EXACT: 'exact',
    PARTIAL: 'partial',
    NONE: 'none'
}

export const get_matches = (player, target_player) => {
    let nation_match = player.nation === target_player.nation ? MatchType.EXACT : MatchType.NONE;
    let league_match = player.league === target_player.league ? MatchType.EXACT : MatchType.NONE;
    // when a player has the same age as the target it's an exact match, if they have a one year difference it's a partial match
    let age_match = player.age === target_player.age ? MatchType.EXACT : (player.age === target_player.age + 1 || player.age === target_player.age - 1) ? MatchType.PARTIAL : MatchType.NONE;
    
    // when a player has the same position as the target it's an exact match, if they play in an alternative_positions array it's a partial match
    let position_match = player.position === target_player.position ? MatchType.EXACT : (player.alternative_positions.includes(target_player.position) || target_player.alternative_positions.includes(player.position)) ? MatchType.PARTIAL : MatchType.NONE;

    let parsed_height = parseInt(player.height.split('cm')[0]);
    let target_parsed_height = parseInt(target_player.height.split('cm')[0]);
    let height_match = parsed_height === target_parsed_height ? MatchType.EXACT : (parsed_height >= target_parsed_height * 0.98 && parsed_height <= target_parsed_height * 1.02) ? MatchType.PARTIAL : MatchType.NONE;

    return {
        nation: nation_match,
        league: league_match,
        position: position_match,
        age: age_match,
        height: height_match,
    }
}

