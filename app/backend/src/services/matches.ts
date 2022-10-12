import Match from '../database/models/match';
import Team from '../database/models/team';

interface IMatch {
  id?: number,
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

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

export async function createMatch(match: IMatch) {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;

  if (!inProgress) {
    return { code: 404, error: 'Problem Found' };
  }

  const { id } = await Match.create({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
    inProgress,
  });

  return { code: 201, data: { id, ...match } };
}

export async function finishMatch(id: number) {
  const match = Match.findOne({ where: { id } });
  if (!match) {
    return { code: 400, error: 'Not Found' };
  }
  await Match.update({ inProgress: false }, { where: { id } });
  return { code: 200, data: 'Finished' };
}

export default getAllMatches;
