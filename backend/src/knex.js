import Knex from 'knex'
import knexConfig from '../knexfile'

const knex = Knex(knexConfig)
const executeSql = sql => knex.raw(sql)

export { knex as default, executeSql }
