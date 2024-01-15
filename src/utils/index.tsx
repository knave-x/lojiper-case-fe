export const getBaseUrl = (): string => {
  const isDevelopment: boolean = process.env.NODE_ENV === 'development';
  console.log("isDevelopment", isDevelopment, process.env.REACT_APP_DEV_URL);

  return isDevelopment
    ? String(process.env.REACT_APP_DEV_URL)
    : String(process.env.REACT_APP_PROD_URL);
};
