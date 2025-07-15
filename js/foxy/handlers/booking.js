export async function sendBooking({ name, service, date }) {
  console.log(`[sendBooking] ➤`, { name, service, date });
  return { success: true, mocked: true };
}

export async function requestVisitConfirmation(name, date) {
  console.log(`[requestVisitConfirmation] ➤`, { name, date });
  return { success: true, mocked: true };
}
