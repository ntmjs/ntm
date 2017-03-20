import {entries} from 'lodash';
import {throwUserError, formatCode} from 'run-common';

export class Parameter {
  constructor(param) {
    Object.assign(this, param);
  }

  static create(definition, context, defaultName) {
    if (!definition) {
      throw new Error("'definition' parameter is missing");
    }

    if (typeof definition !== 'object') {
      definition = {default: definition};
    }

    const name = definition.name || defaultName;
    if (!name) {
      throwUserError(`Parameter ${formatCode('name')} property is missing`, {context});
    }

    const param = new this({
      name,
      default: definition.default
    });

    return param;
  }

  static createMany(definitions, context) {
    if (!definitions) {
      throw new Error("'definitions' parameter is missing");
    }

    if (Array.isArray(definitions)) {
      return definitions.map(definition => this.create(definition, context));
    }

    return entries(definitions).map(([name, definition]) => this.create(definition, context, name));
  }
}

export default Parameter;
