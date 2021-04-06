module.exports = {
  type: process.env.TYPEORM_TYPE,
  database: process.env.TYPEORM_NAME,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  port: process.env.TYPEORM_PORT,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [
    process.env.TYPEORM_MIGRATIONS 
  ],
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR
  }
}