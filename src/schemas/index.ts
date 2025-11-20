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

export const createJobSchema = z.object({
  title: z.string().nonempty('Title is required'),
  job_type: z.string().nonempty('Job type is required'),
  description: z.string().nonempty('Description is required'),
  number_of_candidate: z.number().min(1, 'Must be at least 1 candidate'),
  salary_range: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
  profile_requirements: z
    .object({
      full_name: z.string().optional(),
      photo_profile: z.string().optional(),
      gender: z.string().optional(),
      domicile: z.string().optional(),
      email: z.string().optional(),
      phone_number: z.string().optional(),
      linkedin_link: z.string().optional(),
      date_of_birth: z.string().optional(),
    })
    .optional(),
});

export const profileSchema = z.object({
  full_name: z.string().nonempty('Full name is required'),
  photo_profile: z.string().optional(),
  gender: z.string().optional(),
  domicile: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  linkedin_link: z.string().optional(),
  date_of_birth: z.string().optional(),
});
