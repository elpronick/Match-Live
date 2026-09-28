import { PrismaClient } from '@prisma/client';
import pkg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;
const isLocal = connectionString?.includes('localhost') || connectionString?.includes('127.0.0.1');
const pool = new Pool({ 
  connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
