import {Sequelize} from 'sequelize'

const db = new Sequelize('reservas', 'root', '',{
    host:'localhost',
    dialect: 'mysql'
})

export default db