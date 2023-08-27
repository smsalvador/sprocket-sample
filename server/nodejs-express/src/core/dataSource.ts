import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv'

dotenv.config({
  path: __dirname + '../../.env'
})

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const db_host = DB_HOST ? String(DB_HOST) : '127.0.0.1';
const db_port = DB_PORT ? Number(DB_PORT) : 5432;
const db_name = DB_NAME ? String(DB_NAME) : 'nodejs-express';
const db_user = DB_USER ? String(DB_USER) : 'postgres';
const db_pass = DB_PASS ? String(DB_PASS) : 'postgres';

const options: DataSourceOptions = {
  type: 'postgres',
  name: 'default',
  host: db_host,
  port: db_port,
  username: db_user,
  password: db_pass,
  database: db_name,
  synchronize: false,
  logging: false,
  entities: [
    join(__dirname, '/../entities/*.{js, ts}')
  ],
  migrations: [
    join(__dirname, '/../migrations/*.{js, ts}')
  ],
  subscribers: [
    join(__dirname, '/../subscriber/*{.js, .ts}')
  ],
};

export const appDataSource = new DataSource(options);
