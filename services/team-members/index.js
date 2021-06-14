import AbstractService from '../abstract-service';

export default class TeamMembersService extends AbstractService {
  getTeamMembers(teamUuid) {
    return this.axios
      .get(`/teams/${teamUuid}/members`)
      .then(response => response.data);
  }
}
