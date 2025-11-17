import { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  return (
    <div className='max-w-[1440px] mx-auto overflow-hidden h-screen border'>
      <div className=' h-16 border-b-2 items-center flex justify-between px-4'>
        <div>
          <div className='font-bold text-[18px]'>Job List</div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='cursor-pointer'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 mr-4'>
            <DropdownMenuLabel>
              <div className='font-bold text-md'> {session?.user?.name}</div>
              <div className='text-sm'> {session?.user?.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div
              className='flex cursor-pointer p-2 text-[14px] gap-2'
              onClick={() => {
                localStorage.clear();
                signOut();
              }}
            >
              <LogOut size={18} />
              <div>Sign Out</div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='py-8 px-4'>{children}</div>
    </div>
  );
};

export default MainLayout;
