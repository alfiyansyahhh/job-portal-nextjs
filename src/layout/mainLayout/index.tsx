import { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import DynamicBreadcrumb from '@/components/ui/breadcrumb-list';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  return (
    <div className='mx-auto overflow-hidden h-screen '>
      <div className='border'>
        <div className='max-w-[1440px] h-16  items-center flex justify-between px-4  mx-auto '>
          <div>
            <DynamicBreadcrumb />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className='cursor-pointer'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>
                <div className='font-bold text-md'> {session?.user?.name}</div>
                <div className='text-sm'> {session?.user?.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  localStorage.clear();
                  signOut();
                }}
              >
                <LogOut size={18} />
                <div>Sign Out</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='max-w-[1440px]  mx-auto '>
        <div className='py-5 px-4'>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
