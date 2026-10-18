import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: { ssl: { rejectUnauthorized: false } },
  define: { freezeTableName: true, timestamps: true, underscored: true },
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL conectado com sucesso');
  } catch (error) {
    console.error('❌ Falha na conexão:', error);
    throw error;
  }
};