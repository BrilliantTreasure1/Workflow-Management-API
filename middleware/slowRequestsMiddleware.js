// middleware/slowRequestsMiddleware
function slowRequestsMiddleware(threshold = 500) {
  return (req, res, next) => {
    const start = Date.now()

    res.on("finish", () => {
      const duration = Date.now() - start

      if (duration > threshold) {
        console.log(
          JSON.stringify({
            level: "warn",
            message: "slow request detected",
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            duration,
            timestamp: new Date().toISOString()
          })
        )
      }
    })

    next()
  }
}

module.exports = slowRequestsMiddleware