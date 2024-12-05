const Joi = require("joi");
const { ExpressError } = require("../errors/ExpressError");

const myJoi = Joi.extend(require('joi-phone-number'));

const geometrySchema = myJoi.object({
    type: myJoi.string(),
    coordinates: myJoi.array().items(myJoi.number()).length(2)
})

const schemas = {
    user: myJoi.object({
        username: myJoi.string().required(),
        firstName: myJoi.string().required(),
        lastName: myJoi.string().required(),
        birthDate: myJoi.date().required(),
        geometry: geometrySchema,
        email: myJoi.string().email().required(),
        password: myJoi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirmPassword: myJoi.ref('password'),
        phone: myJoi.string().phoneNumber().required(),
        phoneAlt: myJoi.string().phoneNumber()
    }),

    listing: myJoi.object({
        name: myJoi.string().required(),
        description: myJoi.string().required(),
        price: myJoi.number().min(0).required(),
        currency: myJoi.string().required(),
        sold: myJoi.boolean(),
        discount: myJoi.number().min(0).max(100),
        photos: myJoi.array().items(myJoi.string()),
        // tags: myJoi.array().items(myJoi.string()),
        geometry: geometrySchema
    }),

    review: myJoi.object({
        rating: myJoi.number().min(1).max(5),
        body: myJoi.string()
    })
}

const validator = (model) => {
    //req.body includes data
    return (req,res,next) => {
        const { error } = model === "user" ? schemas[model].validate({...req.body[model], confirmPassword}) : schemas[model].validate({...req.body[model]});

        if(error) {
            throw new ExpressError(error, 400);
        }

        return next();
    }
}

module.exports = validator;