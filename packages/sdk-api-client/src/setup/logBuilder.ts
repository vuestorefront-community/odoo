/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Logger } from 'winston';

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
  const logger : Logger = (process as any).winstonLog;

  const log : LooseObject = {
    label,
    message: message,
    path: path
  };

  if (locations) {
    log.location = locations?.map(item => `line: ${item.line} | column: ${item.column}`).join(' ');
  }

  if (process.env.NODE_LOG_LEVEL === 'TRACE') {
    log.query = getGqlString(operation.query);
    log.variables = operation.variables;
  }

  logger.error(log);
};
