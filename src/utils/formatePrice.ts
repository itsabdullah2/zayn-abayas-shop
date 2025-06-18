export const PriceFormatter = (price: number) => {
  const formattedPrice = new Intl.NumberFormat("en-US").format(price);

  return formattedPrice;
};
