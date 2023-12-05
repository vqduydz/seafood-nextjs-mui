const renderPrice = (price: number) => {
  const options = { style: 'currency', currency: 'VND' };
  return `${price.toLocaleString('vi-VN', options)}`;
};

export default renderPrice;
