/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import consola from 'consola';

interface LooseObject {
    label?: string,
    message?: string | Error,
    location?: string,
    path?: any,
    query?: string,
    variables?: string,
    locations?: any,
    operation?: any,
}

function getGqlString(doc: any) {
  return doc.loc && doc.loc?.source?.body?.replaceAll('\n', '');
}

export default ({ label, message, locations, path, operation }: LooseObject) : void=> {

  const log : LooseObject = { label, message: message, path: path };

  if (locations) {
    log.location = locations?.map(item => `line: ${item.line} | column: ${item.column}`).join(' ');
  }

  log.query = getGqlString(operation.query);
  log.variables = operation.variables;

  consola.error(log);
};
