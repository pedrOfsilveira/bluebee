export function useCurrencify(amount) {
  const amountFormatted = amount.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `R$ ${amountFormatted}`;
}
