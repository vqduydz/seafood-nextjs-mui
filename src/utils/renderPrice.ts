const renderPrice = (price: number) => {
  if (typeof price !== 'number') return;
  const options = { style: 'currency', currency: 'VND' };

  return `${price.toLocaleString('vi-VN', options)}`;
};

export default renderPrice;
