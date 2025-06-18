export const PriceFormatter = (price: number, currency: string) => {
  const formattedPrice = new Intl.NumberFormat(currency).format(price);

  return formattedPrice;
};
