const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

class TeamRoutes extends BaseRoute{
    constructor(db){
        super()
        this.db = db
    }

    list() {
        return {
            path: '/teams',
            method: 'GET',
            config: {
                validate: {
                    failAction: (request, response, error) => {
                        throw error
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(0),
                        name: Joi.string().min(3).max(50)
                    }
                }
            },
            handler: (request, response) => {
                try{
                    const {
                        skip, 
                        limit,
                        name
                    } = request.query

                    const query = name ? {name: name} : {}
                                                                   
                    return this.db.read(query, parseInt(skip), parseInt(limit))
                }catch(error){
                    console.error('error na api ', error)
                    return 'erro interno no servidor'
                }
            }
        }
    }
}
module.exports = TeamRoutes