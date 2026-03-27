import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST || 'localhost',
  port: DB_PORT ? Number(DB_PORT) : 5432,
  dialect: 'postgres',
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  },
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL conectado com sucesso');
  } catch (error) {
    console.error('❌ Falha na conexão com PostgreSQL:', error);
    throw error;
  }
};
