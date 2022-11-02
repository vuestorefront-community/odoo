/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Logger } from 'winston';

export default () => {
  const logger : Logger = (process as any).winstonLog;
  if (!logger) {
    console.error('YOU MUST INSTALL AND CONFIGURE NUXT WINSTON MODULE FROM https://github.com/aaronransley/nuxt-winston-log');
    throw new Error('YOU MUST INSTALL AND CONFIGURE NUXT WINSTON MODULE FROM https://github.com/aaronransley/nuxt-winston-log');
  }
};

