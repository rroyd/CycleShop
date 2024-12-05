class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

//Function to handle async errors
function handleAsync(fn) {
  return async function (req, res,next) {
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error.message)
      next(new ExpressError(error.message, 400))
    }
  };
}

module.exports = { ExpressError, handleAsync };
