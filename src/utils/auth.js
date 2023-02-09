import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
  return await hash(password, 8);
}
export async function matchPassword(password, hashedPassword) {
  return compare(password, hashedPassword);
}
