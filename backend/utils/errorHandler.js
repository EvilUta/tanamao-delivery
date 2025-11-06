// utils/errorHandler.js
export const handleError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    sucesso: false,
    mensagem: message,
  });
};
