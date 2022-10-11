import Match from '../database/models/match';
import Team from '../database/models/team';

export async function getAllMatches() {
  const matches = await Match.findAll({
    include: [
      {
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
    ],
  });
  return { code: 200, data: matches };
}

export default getAllMatches;
