export default function findAccountPrimaryKey(keySets, accountUuid) {
  return keySets.find(
    keySet => keySet.isPrimary && keySet.ownerAccountUuid === accountUuid
  );
}
