// Abstraction so we can swap SMS providers without rewriting the app.
export class SmsProvider {
  async send({ to, message }) {
    throw new Error('Not implemented');
  }
}
