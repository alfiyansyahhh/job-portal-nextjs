import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || 'your-secret-key';
const refreshTokenSecret =
  process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET_KEY || 'your-refresh-secret-key';

// Dummy User Data
const users = [
  {
    id: 1,
    name: 'Admin Recruiter',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Applicant User',
    email: 'applicant@example.com',
    password: 'applicant123',
    role: 'applicant',
  },
];

// Generate Access and Refresh Tokens
const generateTokens = (user: {
  id: number;
  name: string;
  email: string;
  role: string;
}) => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    secretKey,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, email: user.email },
    refreshTokenSecret,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// POST /api/auth/login
export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Check for missing fields
  if (!email || !password) {
    return NextResponse.json(
      {
        success: false,
        message: 'Email and password are required.',
      },
      { status: 400 }
    );
  }

  // Find the user
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid email or password',
      },
      { status: 401 }
    );
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // Return response
  return NextResponse.json(
    {
      success: true,
      message: 'Login successful',
      tokens: {
        accessToken,
        refreshToken,
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    { status: 200 }
  );
}

// Optional: handle other methods (405)
export function GET() {
  return NextResponse.json(
    { success: false, message: 'Method Not Allowed' },
    { status: 405 }
  );
}
