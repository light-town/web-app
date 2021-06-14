export default function findTeamPrimaryKey(keySets, teamUuid) {
  return keySets.find(
    keySet => keySet.isPrimary && keySet.ownerTeamUuid === teamUuid
  );
}
