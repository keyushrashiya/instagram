export const successResponse = (res, statusCode, message, data, count) => {
  return res.status(statusCode).json({
    message: message,
    data: data,
    count: count,
  });
};
export const errorResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    message: message,
    data: data,
  });
};
export const validateErrorResponse = (res, error) => {
  let errorObj = { message: "failed" };
  error.details.map((item) => {
    const { path, message } = item;
    errorObj = { ...errorObj, [path]: message };
  });
  return res.status(400).json(errorObj);
};
