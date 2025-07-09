// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const navLinks = [
//   { href: '/dashboard/cold-emails', label: 'Cold Emails' },
//   { href: '/dashboard/follow-ups', label: 'Follow-ups' },
//   // { href: '/dashboard/inbound-emails', label: 'Inbound Emails' },
//   { href: '/dashboard/scheduled-events', label: 'Scheduled Events' },
//   { href: '/dashboard/tasks', label: 'Tasks' },
// ];

// export default function Navbar() {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-30">
//       <div className="flex items-center gap-3">
//         <Link href="/dashboard/cold-emails" className="flex items-center gap-2">
//           <span className="bg-indigo-600 text-white rounded-full p-2 shadow">
//             <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
//           </span>
//           <span className="font-bold text-lg text-indigo-700 tracking-tight">AI Agent Dashboard</span>
//         </Link>
//       </div>
//       <div className="hidden md:flex gap-6">
//         {navLinks.map(link => (
//           <Link key={link.href} href={link.href} className="text-gray-700 hover:text-indigo-600 font-medium transition">
//             {link.label}
//           </Link>
//         ))}
//       </div>
//       <div className="flex items-center gap-4">
//         {/* User avatar and dropdown */}
//         <div className="relative" ref={dropdownRef}>
//           <button className="flex items-center gap-2 focus:outline-none" onClick={() => setDropdownOpen(v => !v)}>
//             <span className="bg-indigo-100 text-indigo-700 rounded-full p-2">
//               <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><circle cx="12" cy="10" r="3" /><path d="M12 13c-2.5 0-4.5 1.5-4.5 3v1h9v-1c0-1.5-2-3-4.5-3z" /></svg>
//             </span>
//             <span className="hidden sm:inline text-gray-700 font-medium">User</span>
//           </button>
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-40">
//               <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50" onClick={() => { router.push('/login'); }}>Sign Out</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// } 



// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import { usePathname } from 'next/navigation';

// const navLinks = [
//   { id: 'cold-emails', label: 'Cold Emails' },
//   { id: 'follow-ups', label: 'Follow-ups' },
//   { id: 'scheduled-events', label: 'Scheduled Events' },
//   { id: 'tasks', label: 'Tasks' },
// ];

// interface NavbarProps {
//   setActiveTab: (tab: string) => void;
// }

// export default function Navbar({ setActiveTab }: NavbarProps) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-30">
//       <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('cold-emails')}>
//         <span className="bg-indigo-600 text-white rounded-full p-2 shadow">
//           <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//           </svg>
//         </span>
//         <span className="font-bold text-lg text-indigo-700 tracking-tight">AI Agent Dashboard</span>
//       </div>

//       <div className="hidden md:flex gap-6">
//         {navLinks.map(link => (
//           <button
//             key={link.id}
//             onClick={() => setActiveTab(link.id)}
//             className="text-gray-700 hover:text-indigo-600 font-medium transition"
//           >
//             {link.label}
//           </button>
//         ))}
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="relative" ref={dropdownRef}>
//           <button className="flex items-center gap-2 focus:outline-none" onClick={() => setDropdownOpen(v => !v)}>
//             <span className="bg-indigo-100 text-indigo-700 rounded-full p-2">
//               <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <circle cx="12" cy="12" r="10" strokeWidth="2" />
//                 <circle cx="12" cy="10" r="3" />
//                 <path d="M12 13c-2.5 0-4.5 1.5-4.5 3v1h9v-1c0-1.5-2-3-4.5-3z" />
//               </svg>
//             </span>
//             <span className="hidden sm:inline text-gray-700 font-medium">User</span>
//           </button>
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-40">
//               <button
//                 className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
//                 onClick={() => {
//                   localStorage.removeItem('token');
//                   window.location.href = '/login';
//                 }}
//               >
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }







"use client";
import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { id: 'cold-emails', label: 'Cold Emails' },
  { id: 'follow-ups', label: 'Follow-ups' },
  { id: 'scheduled-events', label: 'Scheduled Events' },
  { id: 'tasks', label: 'Tasks' },
];

interface NavbarProps {
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ setActiveTab }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center">
      {/* Logo/Brand Section */}
      <div className="flex items-center gap-3 cursor-pointer mr-8" onClick={() => setActiveTab('cold-emails')}>
        <span className="bg-indigo-600 text-white rounded-full p-2 shadow">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
        <span className="font-bold text-lg text-indigo-700 tracking-tight">AI Agent Dashboard</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map(link => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-indigo-50"
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* User Dropdown */}
      <div className="flex items-center ml-8">
        <div className="relative" ref={dropdownRef}>
          <button className="flex items-center gap-2 focus:outline-none" onClick={() => setDropdownOpen(v => !v)}>
            <span className="bg-indigo-100 text-indigo-700 rounded-full p-2">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <circle cx="12" cy="10" r="3" />
                <path d="M12 13c-2.5 0-4.5 1.5-4.5 3v1h9v-1c0-1.5-2-3-4.5-3z" />
              </svg>
            </span>
            <span className="hidden sm:inline text-gray-700 font-medium">User</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-40">
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}