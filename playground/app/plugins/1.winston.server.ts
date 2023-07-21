import { defineNuxtPlugin } from '#app';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, prettyPrint } = format;

export default defineNuxtPlugin(async (nuxtApp) => {

  let loggerWinston: any;

  loggerWinston = createLogger({
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
        new transports.Console()
      ]
  });

  (process as any).winstonLog = loggerWinston

  return {
    provide: {
      logger: () => {
        return loggerWinston;
      },
    },
  };
});
