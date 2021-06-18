import AbstractService from '../abstract-service';

export default class InvitationsService extends AbstractService {
  async getInvitationLink(teamUuid) {
    const { data } = await this.axios.get(`/teams/${teamUuid}/invitation-link`);

    return `${location.origin}/teams/${teamUuid}/join?key=${data.data.secretKey}`;
  }
}
