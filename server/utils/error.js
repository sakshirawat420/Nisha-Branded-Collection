class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.message = message;
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

const handleNotFound = (req, _res, next) => {
    const error = new ErrorHandler(404, `Route ${req.originalUrl} Not Found`);
    next(error);
};

// eslint-disable-next-line
const handleError = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Internal Server Error";

    if (err.name === "BSONError") {
        console.error("BSONError: Invalid Id format");
        return res.status(400).json({ error: "Invalid input format" });
    }

    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
};

module.exports = {
    ErrorHandler,
    handleError,
    handleNotFound,
};