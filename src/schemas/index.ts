import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'applicant']),
  phone_number: z.string().optional(),
});

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});
