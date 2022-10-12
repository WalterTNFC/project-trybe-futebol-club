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

interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
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
  const verifyHomeTeam = await Team.findOne({ where: { id: homeTeam } });
  const verifyAwayTeam = await Team.findOne({ where: { id: awayTeam } });

  if (homeTeam === awayTeam) {
    return { code: 401, error: 'It is not possible to create a match with two equal teams' };
  }

  if (!verifyHomeTeam || !verifyAwayTeam) {
    return { code: 404, error: 'There is no team with such id!' };
  }
  if (!inProgress) { return { code: 404, error: 'Problem Found' }; }

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

export async function updateMatch(id: number, goals: IGoals) {
  const { homeTeamGoals, awayTeamGoals } = goals;

  const match = Match.findOne({ where: { id } });
  if (!match) {
    return { code: 400, error: 'Not Found' };
  }

  await Match.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } },
  );

  return { code: 200, data: 'Match results updated!' };
}

export default getAllMatches;
