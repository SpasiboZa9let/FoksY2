export async function requestVisitConfirmation(name, date) {
  try {
    const res = await fetch('http://localhost:3000/confirm-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, date })
    });

    const data = await res.json();
    if (res.ok) {
      console.log('[booking] Запрос отправлен мастеру');
      return { success: true };
    } else {
      console.error('[booking] Ошибка:', data.error);
      return { success: false, error: data.error };
    }
  } catch (err) {
    console.error('[booking] Сбой сети:', err.message);
    return { success: false, error: err.message };
  }
}
