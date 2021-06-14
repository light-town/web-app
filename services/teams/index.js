import AbstractService from '../abstract-service';

export default class TeamsService extends AbstractService {
  getTeams() {
    return this.axios.get(`/teams`).then(response => response.data);
  }

  getTeam(uuid) {
    return this.axios.get(`/teams/${uuid}`).then(response => response.data);
  }

  createTeam(team) {
    return this.axios.post(`/teams`, team).then(response => response.data);
  }
}
