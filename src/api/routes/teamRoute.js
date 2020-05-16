const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

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
                description: 'Deve listar time de futebol',
                notes: 'Pode paginar resultados e filtrar por nome',
                tags:[ 'api'],
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
                    return Boom.internal()
                }
            }
        }
    }

    create() {
        return {
            path: '/teams',
            method: 'POST',
            config: {
                description: 'Deve cadastrar time de futebol',
                notes: 'Pode cadastrar time de futebol por nome e país',
                tags:[ 'api'],
                validate: {
                    failAction: (request, response, error) => {
                        throw error
                    },
                    payload: {
                        name: Joi.string().required().min(3).max(50),
                        country: Joi.string().required().min(3).max(50)
                    } 
                }
            }, 
            handler: async (request) => {
                try {
                    const {name, country} = request.payload
                    const result  = await this.db.create({name, country})

                    return {  
                        _id : result._id,                
                        message: 'Time cadastrado com sucesso.'
                    }
                }catch(error){
                    console.error('error na api ', error)
                    return Boom.internal()
                }
            }
        }
    }

    update() {
        return {
            path: '/teams/{id}',
            method: 'PATCH',
            config: {
                description: 'Deve atualizar time de futebol',
                notes: 'Pode atualizar qualquer campo',
                tags:[ 'api'],
                validate: {
                    failAction: (request, response, error) => {
                        throw error
                    },
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        name: Joi.string().min(3).max(50),
                        country: Joi.string().min(3).max(50)
                    } 
                }
            }, 
            handler: async (request) => {
                try {
                    const {id} = request.params
                    const {payload} = request
                    const dataString = JSON.stringify(payload)
                    const data = JSON.parse(dataString)
                    
                    const result = await this.db.update(id, data)

                    return {  
                        message: 'Time atualizado com sucesso.'
                    }
                }catch(error){
                    console.error('error na api ', error)
                    return Boom.internal()
                }
            }
        }
    }

    delete (){
        return {
            path: '/teams/{id}',
            method: 'DELETE',
            config: {
                description: 'Deve deletar time de futebol',
                notes: 'Pode deletar time de futebol por id',
                tags:[ 'api'],
                validate: {
                    failAction: (request, response, error) => {
                        throw error
                    },
                    params: {
                        id: Joi.string().required()
                    }
                }
            }, 
            handler: async (request) => {
                try {
                    const {id} = request.params
                    const result = await this.db.delete(id)

                    return {  
                        message: 'Time removido com sucesso.'
                    }
                }catch(error){
                    console.error('error na api ', error)
                    return Boom.internal()
                }
            }
        }
    }
}
module.exports = TeamRoutes