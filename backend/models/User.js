import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  height: { type: DataTypes.DECIMAL(4, 2), allowNull: true },
  weight: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
  age: { type: DataTypes.INTEGER, allowNull: true },
  objective: { type: DataTypes.STRING(30), allowNull: true },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});