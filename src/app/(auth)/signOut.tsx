'use client';

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

const SignOutHandler = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.signOutRequired) {
      localStorage.clear();
      signOut({ callbackUrl: '/login' });
    }
  }, [session]);

  return null;
};

export default SignOutHandler;
