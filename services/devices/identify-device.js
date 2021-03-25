export default {
  options: [],
  dataos: [
    { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
    { name: 'Windows', value: 'Win', version: 'NT' },
    { name: 'iPhone', value: 'iPhone', version: 'OS' },
    { name: 'iPad', value: 'iPad', version: 'OS' },
    { name: 'Kindle', value: 'Silk', version: 'Silk' },
    { name: 'Android', value: 'Android', version: 'Android' },
    { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
    { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
    { name: 'Macintosh', value: 'Mac', version: 'OS X' },
    { name: 'Linux', value: 'Linux', version: 'rv' },
    { name: 'Palm', value: 'Palm', version: 'PalmOS' },
  ],
  databrowser: [
    { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
    { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
    { name: 'Safari', value: 'Safari', version: 'Version' },
    { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
    { name: 'Opera', value: 'Opera', version: 'Opera' },
    { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
    { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' },
  ],
  init() {
    const headers = [
      navigator.platform,
      navigator.userAgent,
      navigator.appVersion,
      navigator.vendor,
      window.opera,
    ];
    const agent = headers.join(' ');
    const os = this.matchItem(agent, this.dataos);
    const browser = this.matchItem(agent, this.databrowser);

    return { os, browser };
  },
  matchItem(string, data) {
    for (let i = 0; i < data.length; i += 1) {
      const regex = new RegExp(data[i].value, 'i');
      const match = regex.test(string);

      if (match) {
        const regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
        let matches = string.match(regexv);
        let version = '';

        if (matches) {
          if (matches[1]) {
            matches = matches[1];
          }
        }

        if (matches) {
          matches = matches.split(/[._]+/);
          for (let j = 0; j < matches.length; j += 1) {
            if (j === 0) {
              version += matches[j] + '.';
            } else {
              version += matches[j];
            }
          }
        } else {
          version = '0';
        }

        return {
          name: data[i].name,
          version: parseFloat(version),
        };
      }
    }
    return { name: 'Unknown', version: 0 };
  },
};
