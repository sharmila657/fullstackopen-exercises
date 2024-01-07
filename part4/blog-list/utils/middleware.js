
const noHandler = (request, response) => {
    response.status(404).send("No routes found for this request")
};
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
      return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    }else if (error.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: error.message })
    }else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
  
    next(error);
  };

  const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      request.token = authorization.substring(7);
    } else {
      request.token = null;
    }
    next();
  };

module.exports = {
    noHandler,
  errorHandler,
    tokenExtractor
}  