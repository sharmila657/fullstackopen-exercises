
const noHandler = (request, response) => {
    response.status(404).send("No routes found for this request")
};
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
      return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    }
  
    next(error);
  };

module.exports = {
    noHandler,
    errorHandler
}  