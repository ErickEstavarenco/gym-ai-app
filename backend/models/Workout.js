import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './User.js';

export const Workout = sequelize.define('workouts', {
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
  level: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  days_per_week: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
}, {
  tableName: 'workouts',
  timestamps: true,
  underscored: true,
});

Workout.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Workout, { foreignKey: 'user_id' });
