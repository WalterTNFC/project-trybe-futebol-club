import Team from '../database/models/team';

export async function getAllTeam() {
  const allTeams = await Team.findAll();
  if (!allTeams) {
    return { code: 400, error: 'Not Found' };
  }

  return { code: 200, data: allTeams };
}

export async function getTeamById(id: number) {
  const team = await Team.findOne({ where: { id } });
  if (!team) {
    return { code: 400, error: 'Not Found' };
  }

  return { code: 200, data: team };
}

export default getAllTeam;
