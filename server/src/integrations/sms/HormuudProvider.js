import { SmsProvider } from './SmsProvider.js';
import { env } from '../../config/env.js';

export class HormuudProvider extends SmsProvider {
  async send({ to, message }) {
    const res = await fetch(`${env.hormuud.apiUrl}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.hormuud.apiKey}` },
      body: JSON.stringify({ to, message }),
    });
    if (!res.ok) throw new Error(`Hormuud SMS failed: ${res.status}`);
    return res.json();
  }
}
