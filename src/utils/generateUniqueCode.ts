export const generateRandomPageCode = (): string => {
  const generatePaddedNumber = (length: number): string => {
    const number = Math.floor(Math.random() * Math.pow(10, length));
    return number.toString().padStart(length, "0");
  };

  const pageCode = `PAGE${generatePaddedNumber(2)}`;

  return pageCode;
};

export const generateRandomServiceCode = (): string => {
  const generatePaddedNumber = (length: number): string => {
    const number = Math.floor(Math.random() * Math.pow(10, length));
    return number.toString().padStart(length, "0");
  };

  const pageCode = `SRV${generatePaddedNumber(2)}`;

  return pageCode;
};
