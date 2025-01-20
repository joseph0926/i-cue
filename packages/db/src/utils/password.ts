import bcrypt from 'bcryptjs';

export async function saltAndHashPassword(plainPassword: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
}
