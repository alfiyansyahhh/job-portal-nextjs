import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || 'your-secret-key';
const refreshTokenSecret =
  process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET_KEY || 'your-refresh-secret-key';

// Dummy Users
const users = [
  {
    id: 1,
    name: 'Admin Recruiter',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Applicant User',
    email: 'applicant@example.com',
    role: 'applicant',
  },
];

const generateAccessToken = (user: {
  id: number;
  email: string;
  role: string;
}) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    secretKey,
    { expiresIn: '15m' }
  );
};

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: 'Refresh token tidak ditemukan' },
        { status: 400 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, refreshTokenSecret);
      console.log(decoded, 'decoded refresh token');
    } catch (err) {
      console.log(err, 'error verify refresh token');
      return NextResponse.json(
        {
          success: false,
          message: 'Refresh token tidak valid atau kadaluarsa',
        },
        { status: 401 }
      );
    }

    const user = users.find((u) => u.id === decoded.userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User tidak ditemukan' },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken(user);

    return NextResponse.json(
      {
        success: true,
        message: 'Token berhasil diperbarui',
        tokens: {
          accessToken,
          refreshToken,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan pada server',
      },
      { status: 500 }
    );
  }
}
