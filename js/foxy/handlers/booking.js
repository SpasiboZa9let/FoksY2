export async function sendBooking({ name, service, date }) {
  try {
    const res = await fetch('http://localhost:3000/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, service, date })
    });
    return await res.json();
  } catch (err) {
    console.error('[sendBooking] ошибка:', err.message);
    return { success: false, error: err.message };
  }
}

export async function requestVisitConfirmation(name, date) {
  try {
    const res = await fetch('http://localhost:3000/confirm-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, date })
    });
    return await res.json();
  } catch (err) {
    console.error('[requestVisitConfirmation] ошибка:', err.message);
    return { success: false, error: err.message };
  }
}
