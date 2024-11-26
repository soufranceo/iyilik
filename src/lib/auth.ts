import { z } from "zod";

export const ADMIN_PATH = btoa('admin1516');
export const ADMIN_PASS = btoa('Zaq123...');

export const adminSchema = z.object({
  password: z.string()
    .min(6, 'Parola en az 6 karakter olmalıdır')
    .max(50, 'Parola en fazla 50 karakter olabilir')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{6,}$/, 
      'Parola en az bir harf, bir rakam ve bir özel karakter içermelidir')
});

export function isAuthenticated(): boolean {
  try {
    return sessionStorage.getItem('adminAuth') === 'true';
  } catch {
    return false;
  }
}

export function setAuthenticated(value: boolean): void {
  try {
    if (value) {
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      sessionStorage.removeItem('adminAuth');
    }
  } catch (error) {
    console.error('Authentication storage error:', error);
  }
}

export function validatePassword(password: string): boolean {
  try {
    return btoa(password) === ADMIN_PASS;
  } catch {
    return false;
  }
}

export function clearAuthentication(): void {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error('Error clearing authentication:', error);
  }
}