const { ErrorHandler } = require("../utils/error");

const validateCategory = (schema)=> async(req, res, next) => {
    try {    
        const parseBody = await schema.parseAsync(req.body);
        req.body=parseBody;
        next();
    } catch (err) {
        next(new ErrorHandler(400,err.errors))
    }
};
module.exports=validateCategory;

