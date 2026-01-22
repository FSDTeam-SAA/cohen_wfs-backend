import pino from 'pino';

const logger = pino({
  level: 'info', // Default level
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,           // Color codes (Red for error, Green for info)
      translateTime: 'SYS:standard', // Human readable time: 2026-01-22 06:22:37
      ignore: 'pid,hostname',   // Removes unnecessary noise from the console
      messageFormat: '{msg} [at {req.url}]', // Custom format to see URL immediately
    },
  },
});

export default logger;