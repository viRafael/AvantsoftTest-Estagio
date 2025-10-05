import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';
import dotenv from 'dotenv';

dotenv.config();

class EnviromentVariables {
  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;
}

const envVars = plainToInstance(EnviromentVariables, {
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL,
});

const errors = validateSync(envVars, {
  skipMissingProperties: false,
});

if (errors.length > 0) {
  console.error('Erro nas variáveis de ambiente:', errors);
  process.exit(1);
}

export const env = envVars;
