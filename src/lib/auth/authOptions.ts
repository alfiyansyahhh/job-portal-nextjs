import type { NextAuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { refreshToken } from '@/zustand/action/authAction';

export const checkIfTokenExpired = (accessToken: string): boolean => {
  try {
    const decoded: any = jwtDecode(accessToken);

    const expMs = decoded.exp * 1000;
    const nowMs = Date.now();

    const fiveMinutes = 5 * 60 * 1000;

    return nowMs >= expMs || expMs - nowMs <= fiveMinutes;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials;

        console.log(email, password, 'ubu');

        // Validate the input fields
        if (!email || !password) {
          console.log('Error: Missing email or password');
          throw new Error('Missing email or password');
        }

        const data: any = { email, password };

        try {
          console.log('Making request to login API');
          const response = await axios.post(
            'http://localhost:3000/api/login', // Make sure to use absolute URL
            data,
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );

          // Check if the response is successful
          console.log('API Response:', response);

          if (response?.status === 200 && response.data.success) {
            console.log('Login successful:', response.data);
            return response.data;
          }

          // If login fails
          console.log('Login failed:', response?.data?.message);
          return null;
        } catch (error: any) {
          console.log(error, 'error caught during login');
          const errorCallBack = {
            message: error?.response?.data?.message,
            internal_code: error?.response?.data?.internal_code,
            code: error?.response?.data?.code,
            httpStatus: error?.status,
          };
          console.error('Error during login:', errorCallBack);
          throw new Error(
            error?.response ? JSON.stringify(errorCallBack) : error
          );
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    signOut: '/',
  },

  session: {
    strategy: 'jwt' as SessionStrategy,
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = user.user;
        token.accessToken = user.tokens?.accessToken;
        token.refreshToken = user.tokens?.refreshToken;
      }

      //  Setelah login, cek refresh token
      if (token.accessToken) {
        const expired = checkIfTokenExpired(token.accessToken);
        if (expired) {
          console.log(token.refreshToken, 'refresh token still valid');

          const updated = await refreshToken(token.refreshToken);
          console.log(updated, 'updated token after refresh attempt');
          if (updated === 'logout') {
            token.signOutRequired = true;
          } else {
            token.accessToken = updated.accessToken;
            token.refreshToken = updated.refreshToken;
          }
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user || null;
      session.accessToken = token.accessToken || null;
      session.refreshToken = token.refreshToken || null;
      session.signOutRequired = token.signOutRequired || false;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
