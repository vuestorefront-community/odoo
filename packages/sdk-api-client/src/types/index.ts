import { Endpoints } from './api';

/**
 * All available API Endpoints without first argument - `context`, because this prop is set automatically.
 */
export type ContextualizedEndpoints = {
  [T in keyof Endpoints]: Endpoints[T] extends (
    x: any,
    ...args: infer P
  ) => infer R
    ? (...args: P) => R
    : never;
};

export type TODO = any;

export * from './api';
export * from './config';
export * from './context';
