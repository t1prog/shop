export const sendSuccess = (res, data, message = "success") => {
  res.json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res, message = "error", statusCode = 400) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export const sendNotFound = (res, message = "not found") => {
  res.status(404).json({
    success: false,
    message,
  });
};

export const sendUnauthorized = (res, message = "unauthorized") => {
  res.status(401).json({
    success: false,
    message,
  });
};
