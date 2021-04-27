function format(d) {
  const month = d.toLocaleString('default', {
    month: 'long',
  });
  return `${d.getDate()} ${month[0].toUpperCase()}${month.slice(
    1
  )} ${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
}

function formatFromString(d) {
  return format(new Date(d));
}

function formatFromNumber(d) {
  return format(new Date(d));
}

export default {
  format,
  formatFromString,
  formatFromNumber,
};
