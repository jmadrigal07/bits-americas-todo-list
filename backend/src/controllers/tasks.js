import knex from '../knex';

class tasks {

    constructor(){}

    async getTasks () {
        try {
            return await knex.select('*').from('tasks');
        } catch (error) {
            return {error: true, message: error};
        }
    }

    async getTask (id) {
        if ( Number.isInteger(id*1) ){
            try {
                return await knex.select('*').from('tasks').where('id', id);
            } catch (error) {
                return {error: true, message: error};
            }
        } else
            return {error: true, message: 'Id is not integer'};
    }

    async createTask (message, status_id) {
        if ( Number.isInteger(status_id*1) ) {
            try {
                const data = [{message, status: status_id*1}];
                return await knex.insert(data).returning('*').into('tasks');
            } catch (error) {
                return {error: true, message: error};
            }
        } else
            return {error: true, message: 'Status_id is not integer'};
    }

    async updateTask (id, message, status_id) {
        if ( Number.isInteger(id*1) && Number.isInteger(status_id*1) ) {
            try {
                const data = {message: message, status: status_id*1, updated_at: knex.fn.now()};
                return await knex('tasks').returning('*').where('id', '=', id).update(data);
            } catch (error) {
                return {error: true, message: error};
            }
        } else
            return {error: true, message: 'ID or Status_id is not integer'};
    }

    async deleteTask (id) {
        if ( Number.isInteger(id*1) ) {
            try {
                return await knex('tasks').returning('*').where('id', '=', id).delete();
            } catch (error) {
                return {error: true, message: error};
            }
        } else
            return {error: true, message: 'ID is not integer'};
    }

    async getStatus () {
        try {
            return await knex.select('*').from('status');
        } catch (error) {
            return {error: true, message: error};
        }
    }
}

module.exports = {
    tasks
}