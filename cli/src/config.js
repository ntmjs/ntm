import {entries, camelCase} from 'lodash';
import {nest} from 'flatnest';
import {throwUserError} from 'run-common';

export const Config = {
  normalize(config, {context}) {
    if (!(config !== null && typeof config === 'object')) {
      throwUserError(`Configuration must be an object`, {context});
    }

    const nestedConfig = nest(config);

    const normalizedConfig = {};
    for (let [key, value] of entries(nestedConfig)) {
      if (!key.startsWith('_')) {
        key = camelCase(key);
      }
      if (value !== null && typeof value === 'object') {
        value = this.normalize(value, {context});
      }
      normalizedConfig[key] = value;
    }

    return normalizedConfig;
  }
};

export default Config;
