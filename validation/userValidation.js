const Joi = require('joi')

module.exports = {
    async userAddValidation(req) {
        const schema = Joi.object({
            name: Joi.string().min(3).max(25).trim(true).required(),
            email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).trim(true).required(),
            password: Joi.string().min(5).required(),
            phone: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
            deviceToken: Joi.string().required(),
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return "Please enter proper details"
        }
        return null;
    }
}