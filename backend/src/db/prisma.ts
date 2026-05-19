import { PrismaClient } from '@prisma/client';
import pkg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ 
  connectionString,
  ssl: true
});
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
