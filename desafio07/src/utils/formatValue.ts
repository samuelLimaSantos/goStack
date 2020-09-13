const formatValue = (value: number | string): string => {
  if (typeof value === 'number') {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  }
  const datedValue = Date.parse(value);
  return Intl.DateTimeFormat().format(datedValue); // TODO
};

export default formatValue;
