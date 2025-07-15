export function calculateDiscount(points, price) {
  const percent = Math.min((points / 100) * 5, 20); // максимум 20%
  const discountRub = Math.round(price * (percent / 100));
  const usedPoints = Math.floor((discountRub / price) * 100 / 5 * 100); // сколько баллов списано

  return {
    discountRub,
    discountPercent: percent,
    finalPrice: price - discountRub,
    usedPoints
  };
}
