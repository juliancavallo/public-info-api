export const normalize = (text: string): string => {
    const normalizedText = text.normalize('NFD');
    const reg = new RegExp('[^a-zA-Z0-9]', 'g');
    const result = normalizedText.replace(reg, '').toLowerCase();
    return result;
}

export const parseCurrencyValueToString = (value: string): string => {
    value = value.replace('.', ',');
    const valueWithoutDecimals = parseFloat(value.split(',')[0]);
    const valueOnCurrencyFormat = valueWithoutDecimals.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS'
    });
  
    return valueOnCurrencyFormat.replace(/0+$/, '').replace(/,$/, '');
}

export const convertYearToDate = (year: string): Date => {
    return new Date(parseInt(year), 0, 1);
}