import 'next-auth';
import { UserRole } from '@prisma/client';
import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { TUserClient } from './headerTypes';
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    refreshToken: string;
    accessToken: string;
    signOutRequired: boolean;
    error: any;
    Token: string;
  }

  interface Session {
    user: ExtendedUser;
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends ExtendedUser {}
}

declare module 'next-auth' {
  /**
   * Extend the built-in Session type
   */
  interface Session extends DefaultSession, TUserClient {}

  interface JWT extends DefaultJWT, TUserClient {}
}

declare module 'next-auth/jwt' {
  type JWT = TUserClient & {};
}
