const { DataTypes, DATEONLY } = require('sequelize');
const sequelize = require('./db');
const Paciente = sequelize.define('paciente', {
    cpf: {type: DataTypes.STRING(14), primaryKey: true,},
    nome_completo: {type: DataTypes.STRING(300), allowNull: false,},
    idade: {type: DataTypes.INTEGER, allowNull: false,},
    dia_consulta: {type: DataTypes.DATEONLY,},
    hora_consulta: {type: DataTypes.TIME,},
}, {tableName: 'paciente', timestamps: false,
});
module.exports = Paciente;