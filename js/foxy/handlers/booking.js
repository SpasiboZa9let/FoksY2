export async function sendBooking({ name, service, date }) {
  try {
    const res = await fetch('http://localhost:3000/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, service, date })
    });

    const data = await res.json();

    if (res.ok) {
      console.log('[booking] заявка отправлена');
      return { success: true };
    } else {
      console.error('[booking] ошибка:', data.error);
      return { success: false, error: data.error };
    }
  } catch (err) {
    console.error('[booking] сбой сети:', err);
    return { success: false, error: err.message };
  }
}
