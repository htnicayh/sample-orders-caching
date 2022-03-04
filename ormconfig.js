module.exports = {
  type: 'postgres',
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations'
  },
  synchronize: true,
  logging: false
}
