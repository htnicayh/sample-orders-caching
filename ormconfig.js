module.exports = {
  type: 'postgres',
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSRTGRES_NAME,
  entities: ['**/*.entity.js'],
  synchronize: true,
}
