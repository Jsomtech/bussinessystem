import { HormuudProvider } from './HormuudProvider.js';
import { MockProvider } from './MockProvider.js';
import { env } from '../../config/env.js';

export function getSmsProvider() {
  return env.hormuud.apiKey ? new HormuudProvider() : new MockProvider();
}
