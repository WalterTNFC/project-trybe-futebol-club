import orderedLeaderboard from '../utils/getLeaderboard';
import Team from '../database/models/team';
import Match from '../database/models/match';

export async function getLeaderBoard(type: string) {
  const teams = await Team.findAll();

  const matches = await Match.findAll({
    where: { inProgress: false },
  });

  return orderedLeaderboard(teams, matches, type);
}

export default getLeaderBoard;
