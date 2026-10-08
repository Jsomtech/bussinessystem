import { SmsProvider } from './SmsProvider.js';

export class MockProvider extends SmsProvider {
  async send({ to, message }) {
    console.log(`[MOCK SMS] to=${to} message=${message}`);
    return { status: 'mocked', to };
  }
}
