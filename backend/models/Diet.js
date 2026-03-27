import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './User.js';

export const Diet = sequelize.define('diets', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  objective: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  daily_calories: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
}, {
  tableName: 'diets',
  timestamps: true,
  underscored: true,
});

Diet.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Diet, { foreignKey: 'user_id' });
