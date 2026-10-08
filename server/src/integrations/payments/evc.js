import { env } from '../../config/env.js';

// Two separate concerns must stay separate:
//  A) the business PAYING US for a subscription (platform revenue)
//  B) the business RECORDING customer payments (their customers → them)
export async function initiateEvcPayment({ phone, amount, reference }) {
  if (!env.evc.apiKey) {
    console.log(`[MOCK EVC] ${phone} charged $${amount} ref=${reference}`);
    return { status: 'mocked', reference };
  }
  const res = await fetch(`${env.evc.apiUrl}/charge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.evc.apiKey}` },
    body: JSON.stringify({ phone, amount, reference }),
  });
  if (!res.ok) throw new Error(`EVC charge failed: ${res.status}`);
  return res.json();
}

export async function verifyPayment(reference) {
  if (!env.evc.apiKey) return { status: 'mocked-verified', reference };
  const res = await fetch(`${env.evc.apiUrl}/verify/${reference}`, {
    headers: { Authorization: `Bearer ${env.evc.apiKey}` },
  });
  if (!res.ok) throw new Error(`EVC verify failed: ${res.status}`);
  return res.json();
}
