// "use client";
// import React, { useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { getSession } from '@/lib/supabase';

// export default function AuthGuard({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   useEffect(() => {
//     async function check() {
//       const { data } = await getSession();
//       if (!data.session && pathname !== '/login') {
//         router.push('/login');
//       }
//     }
//     check();
//   }, [pathname, router]);
//   return <>{children}</>;
// } 


"use client";
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check for FastAPI token instead of Supabase session
    const token = localStorage.getItem('token');
    
    // If no token and not on login page, redirect to login
    if (!token && pathname !== '/login') {
      router.push('/login');
    }
    
    // If has token and on login page, redirect to dashboard
    if (token && pathname === '/login') {
      router.push('/dashboard');
    }
  }, [pathname, router]);

  return <>{children}</>;
}