export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, _req, res, _next) {
  console.error(error);
  res.status(500).json({
    success: false,
    message: error instanceof Error ? error.message : "Internal server error"
  });
}
