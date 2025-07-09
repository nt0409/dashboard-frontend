
// "use client";
// import React, { useEffect, useState } from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Card } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import FollowUpsTable from "@/components/FollowUpsTable";
// import TasksTable from "@/components/TasksTable";
// import ColdEmailsTable from "@/components/ColdEmailsTable";
// // import InboundEmailsTable from "@/components/InboundEmailsTable";
// import ScheduledEventsTable from "@/components/ScheduledEventsTable";
// import Navbar from "@/components/Navbar";

// function SignOutButton() {
//   const router = useRouter();
//   return (
//     <button
//       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow transition-colors"
//       onClick={() => {
//         localStorage.removeItem("token");
//         router.push("/login");
//       }}
//     >
//       Sign Out
//     </button>
//   );
// }

// function TableSkeleton({ columns, rows = 3 }: { columns: number; rows?: number }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             {Array.from({ length: columns }).map((_, i) => (
//               <th key={i} className="px-3 py-2 border">
//                 <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {Array.from({ length: rows }).map((_, i) => (
//             <tr key={i}>
//               {Array.from({ length: columns }).map((_, j) => (
//                 <td key={j} className="px-3 py-2 border">
//                   <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default function DashboardPage() {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("cold-emails");

//   // Authentication check
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }
//     setIsAuthenticated(true);
//     setAuthLoading(false);
//   }, [router]);

//   // Cold Emails
//   const [coldEmails, setColdEmails] = useState<any[]>([]);
//   const [loadingColdEmails, setLoadingColdEmails] = useState(false);
//   const [errorColdEmails, setErrorColdEmails] = useState<string | null>(null);

//   // Follow-ups
//   const [followUps, setFollowUps] = useState<any[]>([]);
//   const [loadingFollowUps, setLoadingFollowUps] = useState(false);
//   const [errorFollowUps, setErrorFollowUps] = useState<string | null>(null);

//   // Tasks
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [loadingTasks, setLoadingTasks] = useState(false);
//   const [errorTasks, setErrorTasks] = useState<string | null>(null);

//   // Scheduled Events
//   const [scheduledEvents, setScheduledEvents] = useState<any[]>([]);
//   const [loadingScheduledEvents, setLoadingScheduledEvents] = useState(false);
//   const [errorScheduledEvents, setErrorScheduledEvents] = useState<string | null>(null);

//   // Dashboard Stats
//   const [tokenDaysLeft, setTokenDaysLeft] = useState<number | null>(null);
//   const [messageQuotaLeft, setMessageQuotaLeft] = useState<number | null>(null);
//   const [googleSheetUrl, setGoogleSheetUrl] = useState<string | null>(null);
//   const [loadingStats, setLoadingStats] = useState(false);
//   const [errorStats, setErrorStats] = useState<string | null>(null);

//   useEffect(() => {
//     if (!isAuthenticated) return;

//     setLoadingStats(true);
//     async function fetchDashboardStats() {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:8000/api/dashboard-stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setTokenDaysLeft(data.token_days_left);
//           setMessageQuotaLeft(data.message_quota_left);
//           setGoogleSheetUrl(data.google_sheet_url);
//         } else {
//           setErrorStats(data.error || "Failed to fetch dashboard stats");
//         }
//       } catch (err: any) {
//         setErrorStats(err.message);
//       } finally {
//         setLoadingStats(false);
//       }
//     }

//     fetchDashboardStats();
//   }, [isAuthenticated]);

//   // API Loaders
//   useEffect(() => {
//     if (!isAuthenticated) return;

//     async function fetchAllData() {
//       try {
//         const token = localStorage.getItem("token");
//         const headers = { Authorization: `Bearer ${token}` };

//         setLoadingColdEmails(true);
//         const coldRes = await fetch("http://localhost:8000/api/cold-emails", { headers });
//         const coldData = await coldRes.json();
//         setColdEmails(coldData.cold_emails || []);
//         setErrorColdEmails(coldRes.ok ? null : coldData.error);

//         setLoadingFollowUps(true);
//         const followRes = await fetch("http://localhost:8000/api/follow-ups", { headers });
//         const followData = await followRes.json();
//         setFollowUps(followData.follow_ups || []);
//         setErrorFollowUps(followRes.ok ? null : followData.error);

//         setLoadingTasks(true);
//         const taskRes = await fetch("/api/tasks", { headers });
//         const taskData = await taskRes.json();
//         setTasks(taskData.tasks || []);
//         setErrorTasks(taskRes.ok ? null : taskData.error);

//         setLoadingScheduledEvents(true);
//         const eventRes = await fetch("/api/events", { headers });
//         const eventData = await eventRes.json();
//         setScheduledEvents(eventData.events || []);
//         setErrorScheduledEvents(eventRes.ok ? null : eventData.error);
//       } catch (err: any) {
//         setErrorColdEmails(err.message);
//         setErrorFollowUps(err.message);
//         setErrorTasks(err.message);
//         setErrorScheduledEvents(err.message);
//       } finally {
//         setLoadingColdEmails(false);
//         setLoadingFollowUps(false);
//         setLoadingTasks(false);
//         setLoadingScheduledEvents(false);
//       }
//     }

//     fetchAllData();
//   }, [isAuthenticated]);

//   const handleGoogleSheetClick = () => {
//     if (googleSheetUrl) {
//       window.open(googleSheetUrl, "_blank", "noopener,noreferrer");
//     }
//   };

//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) return null;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Section */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between py-4">
//             <div className="flex items-center space-x-8">
//               {/* <div className="text-xl font-bold text-gray-800">AI Agent Dashboard</div> */}
//               <Navbar setActiveTab={setActiveTab} />
//             </div>
//             <SignOutButton />
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">AI Agent Gmail Automation Dashboard</h1>

//         {/* Stats */}
//         <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
//           <button
//             onClick={handleGoogleSheetClick}
//             disabled={loadingStats || !googleSheetUrl}
//             className={`px-5 py-2 rounded shadow font-semibold transition-colors ${
//               loadingStats || !googleSheetUrl
//                 ? "bg-gray-400 text-gray-600 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 text-white"
//             }`}
//           >
//             {loadingStats ? "Loading..." : errorStats ? "Sheet Unavailable" : "Open Google Sheet"}
//           </button>

//           <div className="flex gap-4">
//             <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow text-center">
//               <div className="text-xs font-medium">Token Refresh Days Left</div>
//               <div className="text-xl font-bold">{tokenDaysLeft ?? "--"}</div>
//             </div>

//             <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow text-center">
//               <div className="text-xs font-medium">Message Quota Left</div>
//               <div className="text-xl font-bold">{messageQuotaLeft ?? "--"}</div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <Card className="p-6 mb-8 shadow-lg">
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="mb-4 flex flex-wrap gap-2 justify-center">
//               <TabsTrigger value="cold-emails">Cold Emails</TabsTrigger>
//               <TabsTrigger value="follow-ups">Follow-ups</TabsTrigger>
//               {/* <TabsTrigger value="inbound-emails">Inbound Emails</TabsTrigger> */}
//               <TabsTrigger value="scheduled-events">Scheduled Events</TabsTrigger>
//               <TabsTrigger value="tasks">Tasks</TabsTrigger>
//             </TabsList>

//             <TabsContent value="cold-emails">
//               {loadingColdEmails ? (
//                 <TableSkeleton columns={5} />
//               ) : errorColdEmails ? (
//                 <div className="py-8 text-center text-red-500">{errorColdEmails}</div>
//               ) : (
//                 <ColdEmailsTable coldEmails={coldEmails} />
//               )}
//             </TabsContent>

//             <TabsContent value="follow-ups">
//               {loadingFollowUps ? (
//                 <TableSkeleton columns={6} />
//               ) : errorFollowUps ? (
//                 <div className="py-8 text-center text-red-500">{errorFollowUps}</div>
//               ) : (
//                 <FollowUpsTable followUps={followUps} />
//               )}
//             </TabsContent>

//             {/* <TabsContent value="inbound-emails">
//               ...
//             </TabsContent> */}

//             <TabsContent value="scheduled-events">
//               {loadingScheduledEvents ? (
//                 <TableSkeleton columns={6} />
//               ) : errorScheduledEvents ? (
//                 <div className="py-8 text-center text-red-500">{errorScheduledEvents}</div>
//               ) : (
//                 <ScheduledEventsTable scheduledEvents={scheduledEvents} />
//               )}
//             </TabsContent>

//             <TabsContent value="tasks">
//               {loadingTasks ? (
//                 <TableSkeleton columns={5} />
//               ) : errorTasks ? (
//                 <div className="py-8 text-center text-red-500">{errorTasks}</div>
//               ) : (
//                 <TasksTable tasks={tasks} />
//               )}
//             </TabsContent>
//         </Tabs>
//       </Card>
//     </div>
//   );
// }

















// "use client";
// import React, { useEffect, useState } from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Card } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import Navbar from "@/components/Navbar"; // ✅ import Navbar
// import FollowUpsTable from "@/components/FollowUpsTable";
// import TasksTable from "@/components/TasksTable";
// import ColdEmailsTable from "@/components/ColdEmailsTable";
// // import InboundEmailsTable from "@/components/InboundEmailsTable";
// import ScheduledEventsTable from "@/components/ScheduledEventsTable";

// function TableSkeleton({ columns, rows = 3 }: { columns: number; rows?: number }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             {Array.from({ length: columns }).map((_, i) => (
//               <th key={i} className="px-3 py-2 border">
//                 <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {Array.from({ length: rows }).map((_, i) => (
//             <tr key={i}>
//               {Array.from({ length: columns }).map((_, j) => (
//                 <td key={j} className="px-3 py-2 border">
//                   <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default function DashboardPage() {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("cold-emails"); // ✅ Added tab state

//   // Auth check
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }
//     setIsAuthenticated(true);
//     setAuthLoading(false);
//   }, [router]);

//   const [coldEmails, setColdEmails] = useState<any[]>([]);
//   const [loadingColdEmails, setLoadingColdEmails] = useState(false);
//   const [errorColdEmails, setErrorColdEmails] = useState<string | null>(null);

//   const [followUps, setFollowUps] = useState<any[]>([]);
//   const [loadingFollowUps, setLoadingFollowUps] = useState(false);
//   const [errorFollowUps, setErrorFollowUps] = useState<string | null>(null);

//   const [tasks, setTasks] = useState<any[]>([]);
//   const [loadingTasks, setLoadingTasks] = useState(false);
//   const [errorTasks, setErrorTasks] = useState<string | null>(null);

//   const [scheduledEvents, setScheduledEvents] = useState<any[]>([]);
//   const [loadingScheduledEvents, setLoadingScheduledEvents] = useState(false);
//   const [errorScheduledEvents, setErrorScheduledEvents] = useState<string | null>(null);

//   // Cold Emails
//   useEffect(() => {
//     if (!isAuthenticated) return;
//     setLoadingColdEmails(true);
//     async function fetchColdEmails() {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:8000/api/cold-emails", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) setColdEmails(data.cold_emails);
//         else setErrorColdEmails(data.error || "Failed to fetch cold emails");
//       } catch (err: any) {
//         setErrorColdEmails(err.message);
//       } finally {
//         setLoadingColdEmails(false);
//       }
//     }
//     fetchColdEmails();
//   }, [isAuthenticated]);

//   // Follow-ups
//   useEffect(() => {
//     if (!isAuthenticated) return;
//     setLoadingFollowUps(true);
//     async function fetchFollowUps() {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:8000/api/follow-ups", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) setFollowUps(data.follow_ups);
//         else setErrorFollowUps(data.error || "Failed to fetch follow-ups");
//       } catch (err: any) {
//         setErrorFollowUps(err.message);
//       } finally {
//         setLoadingFollowUps(false);
//       }
//     }
//     fetchFollowUps();
//   }, [isAuthenticated]);

//   // Tasks
//   useEffect(() => {
//     if (!isAuthenticated) return;
//     setLoadingTasks(true);
//     async function fetchTasks() {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("/api/tasks", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) setTasks(data.tasks);
//         else setErrorTasks(data.error || "Failed to fetch tasks");
//       } catch (err: any) {
//         setErrorTasks(err.message);
//       } finally {
//         setLoadingTasks(false);
//       }
//     }
//     fetchTasks();
//   }, [isAuthenticated]);

//   // Scheduled Events
//   useEffect(() => {
//     if (!isAuthenticated) return;
//     setLoadingScheduledEvents(true);
//     async function fetchScheduledEvents() {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("/api/events", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) setScheduledEvents(data.events);
//         else setErrorScheduledEvents(data.error || "Failed to fetch events");
//       } catch (err: any) {
//         setErrorScheduledEvents(err.message);
//       } finally {
//         setLoadingScheduledEvents(false);
//       }
//     }
//     fetchScheduledEvents();
//   }, [isAuthenticated]);

//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) return null;

//   return (
//     <div className="container mx-auto py-8">
//       <Navbar setActiveTab={setActiveTab} /> {/* ✅ Pass setActiveTab */}
//       <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">AI Agent Dashboard</h1>

//       <Card className="p-6 mb-8 shadow-lg">
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="mb-4 flex flex-wrap gap-2 justify-center">
//             <TabsTrigger value="cold-emails">Cold Emails</TabsTrigger>
//             <TabsTrigger value="follow-ups">Follow-ups</TabsTrigger>
//             {/* <TabsTrigger value="inbound-emails">Inbound Emails</TabsTrigger> */}
//             <TabsTrigger value="scheduled-events">Scheduled Events</TabsTrigger>
//             <TabsTrigger value="tasks">Tasks</TabsTrigger>
//           </TabsList>

//           <TabsContent value="cold-emails">
//             {loadingColdEmails ? (
//               <TableSkeleton columns={5} />
//             ) : errorColdEmails ? (
//               <div className="py-8 text-center text-red-500">{errorColdEmails}</div>
//             ) : (
//               <ColdEmailsTable coldEmails={coldEmails} />
//             )}
//           </TabsContent>

//           <TabsContent value="follow-ups">
//             {loadingFollowUps ? (
//               <TableSkeleton columns={6} />
//             ) : errorFollowUps ? (
//               <div className="py-8 text-center text-red-500">{errorFollowUps}</div>
//             ) : (
//               <FollowUpsTable followUps={followUps} />
//             )}
//           </TabsContent>

//           <TabsContent value="scheduled-events">
//             {loadingScheduledEvents ? (
//               <TableSkeleton columns={6} />
//             ) : errorScheduledEvents ? (
//               <div className="py-8 text-center text-red-500">{errorScheduledEvents}</div>
//             ) : (
//               <ScheduledEventsTable scheduledEvents={scheduledEvents} />
//             )}
//           </TabsContent>

//           <TabsContent value="tasks">
//             {loadingTasks ? (
//               <TableSkeleton columns={5} />
//             ) : errorTasks ? (
//               <div className="py-8 text-center text-red-500">{errorTasks}</div>
//             ) : (
//               <TasksTable tasks={tasks} />
//             )}
//           </TabsContent>
//         </Tabs>
//       </Card>
//     </div>
//   );
// }

















// "use client";
// import React, { useEffect, useState } from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Card } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import FollowUpsTable from "@/components/FollowUpsTable";
// import TasksTable from "@/components/TasksTable";
// import ColdEmailsTable from "@/components/ColdEmailsTable";
// // import InboundEmailsTable from "@/components/InboundEmailsTable";
// import ScheduledEventsTable from "@/components/ScheduledEventsTable";
// import Navbar from "@/components/Navbar";

// function SignOutButton() {
//   const router = useRouter();
//   return (
//     <button
//       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow transition-colors"
//       onClick={() => {
//         localStorage.removeItem("token");
//         router.push("/login");
//       }}
//     >
//       Sign Out
//     </button>
//   );
// }

// function TableSkeleton({ columns, rows = 3 }: { columns: number; rows?: number }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             {Array.from({ length: columns }).map((_, i) => (
//               <th key={i} className="px-3 py-2 border">
//                 <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {Array.from({ length: rows }).map((_, i) => (
//             <tr key={i}>
//               {Array.from({ length: columns }).map((_, j) => (
//                 <td key={j} className="px-3 py-2 border">
//                   <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default function DashboardPage() {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("cold-emails");

//   // Authentication check
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }
//     setIsAuthenticated(true);
//     setAuthLoading(false);
//   }, [router]);

//   // Cold Emails
//   const [coldEmails, setColdEmails] = useState<any[]>([]);
//   const [loadingColdEmails, setLoadingColdEmails] = useState(false);
//   const [errorColdEmails, setErrorColdEmails] = useState<string | null>(null);

//   // Follow-ups
//   const [followUps, setFollowUps] = useState<any[]>([]);
//   const [loadingFollowUps, setLoadingFollowUps] = useState(false);
//   const [errorFollowUps, setErrorFollowUps] = useState<string | null>(null);

//   // Tasks
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [loadingTasks, setLoadingTasks] = useState(false);
//   const [errorTasks, setErrorTasks] = useState<string | null>(null);

//   // Scheduled Events
//   const [scheduledEvents, setScheduledEvents] = useState<any[]>([]);
//   const [loadingScheduledEvents, setLoadingScheduledEvents] = useState(false);
//   const [errorScheduledEvents, setErrorScheduledEvents] = useState<string | null>(null);

//   // Dashboard Stats
//   const [tokenDaysLeft, setTokenDaysLeft] = useState<number | null>(null);
//   const [messageQuotaLeft, setMessageQuotaLeft] = useState<number | null>(null);
//   const [googleSheetUrl, setGoogleSheetUrl] = useState<string | null>(null);
//   const [loadingStats, setLoadingStats] = useState(false);
//   const [errorStats, setErrorStats] = useState<string | null>(null);

//   useEffect(() => {
//     if (!isAuthenticated) return;

//     setLoadingStats(true);
//     async function fetchDashboardStats() {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:8000/api/dashboard-stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setTokenDaysLeft(data.token_days_left);
//           setMessageQuotaLeft(data.message_quota_left);
//           setGoogleSheetUrl(data.google_sheet_url);
//         } else {
//           setErrorStats(data.error || "Failed to fetch dashboard stats");
//         }
//       } catch (err: any) {
//         setErrorStats(err.message);
//       } finally {
//         setLoadingStats(false);
//       }
//     }

//     fetchDashboardStats();
//   }, [isAuthenticated]);

//   // API Loaders
//   useEffect(() => {
//     if (!isAuthenticated) return;

//     async function fetchAllData() {
//       try {
//         const token = localStorage.getItem("token");
//         const headers = { Authorization: `Bearer ${token}` };

//         setLoadingColdEmails(true);
//         const coldRes = await fetch("http://localhost:8000/api/cold-emails", { headers });
//         const coldData = await coldRes.json();
//         setColdEmails(coldData.cold_emails || []);
//         setErrorColdEmails(coldRes.ok ? null : coldData.error);

//         setLoadingFollowUps(true);
//         const followRes = await fetch("http://localhost:8000/api/follow-ups", { headers });
//         const followData = await followRes.json();
//         setFollowUps(followData.follow_ups || []);
//         setErrorFollowUps(followRes.ok ? null : followData.error);

//         setLoadingTasks(true);
//         const taskRes = await fetch("/api/tasks", { headers });
//         const taskData = await taskRes.json();
//         setTasks(taskData.tasks || []);
//         setErrorTasks(taskRes.ok ? null : taskData.error);

//         setLoadingScheduledEvents(true);
//         const eventRes = await fetch("/api/events", { headers });
//         const eventData = await eventRes.json();
//         setScheduledEvents(eventData.events || []);
//         setErrorScheduledEvents(eventRes.ok ? null : eventData.error);
//       } catch (err: any) {
//         setErrorColdEmails(err.message);
//         setErrorFollowUps(err.message);
//         setErrorTasks(err.message);
//         setErrorScheduledEvents(err.message);
//       } finally {
//         setLoadingColdEmails(false);
//         setLoadingFollowUps(false);
//         setLoadingTasks(false);
//         setLoadingScheduledEvents(false);
//       }
//     }

//     fetchAllData();
//   }, [isAuthenticated]);

//   const handleGoogleSheetClick = () => {
//     if (googleSheetUrl) {
//       window.open(googleSheetUrl, "_blank", "noopener,noreferrer");
//     }
//   };

//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) return null;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Section */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between py-4">
//             <div className="flex items-center space-x-8">
//               {/* <div className="text-xl font-bold text-gray-800">AI Agent Dashboard</div> */}
//               <Navbar setActiveTab={setActiveTab} />
//             </div>
//             <SignOutButton />
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">AI Agent Gmail Automation Dashboard</h1>

//         {/* Stats */}
//         <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
//           <button
//             onClick={handleGoogleSheetClick}
//             disabled={loadingStats || !googleSheetUrl}
//             className={`px-5 py-2 rounded shadow font-semibold transition-colors ${
//               loadingStats || !googleSheetUrl
//                 ? "bg-gray-400 text-gray-600 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 text-white"
//             }`}
//           >
//             {loadingStats ? "Loading..." : errorStats ? "Sheet Unavailable" : "Open Google Sheet"}
//           </button>

//           <div className="flex gap-4">
//             <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow text-center">
//               <div className="text-xs font-medium">Token Refresh Days Left</div>
//               <div className="text-xl font-bold">{tokenDaysLeft ?? "--"}</div>
//             </div>

//             <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow text-center">
//               <div className="text-xs font-medium">Message Quota Left</div>
//               <div className="text-xl font-bold">{messageQuotaLeft ?? "--"}</div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <Card className="p-6 mb-8 shadow-lg">
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="mb-4 flex flex-wrap gap-2 justify-center">
//               <TabsTrigger value="cold-emails">Cold Emails</TabsTrigger>
//               <TabsTrigger value="follow-ups">Follow-ups</TabsTrigger>
//               {/* <TabsTrigger value="inbound-emails">Inbound Emails</TabsTrigger> */}
//               <TabsTrigger value="scheduled-events">Scheduled Events</TabsTrigger>
//               <TabsTrigger value="tasks">Tasks</TabsTrigger>
//             </TabsList>

//             <TabsContent value="cold-emails">
//               {loadingColdEmails ? (
//                 <TableSkeleton columns={5} />
//               ) : errorColdEmails ? (
//                 <div className="py-8 text-center text-red-500">{errorColdEmails}</div>
//               ) : (
//                 <ColdEmailsTable coldEmails={coldEmails} />
//               )}
//             </TabsContent>

//             <TabsContent value="follow-ups">
//               {loadingFollowUps ? (
//                 <TableSkeleton columns={6} />
//               ) : errorFollowUps ? (
//                 <div className="py-8 text-center text-red-500">{errorFollowUps}</div>
//               ) : (
//                 <FollowUpsTable followUps={followUps} />
//               )}
//             </TabsContent>

//             {/* <TabsContent value="inbound-emails">
//               ...
//             </TabsContent> */}

//             <TabsContent value="scheduled-events">
//               {loadingScheduledEvents ? (
//                 <TableSkeleton columns={6} />
//               ) : errorScheduledEvents ? (
//                 <div className="py-8 text-center text-red-500">{errorScheduledEvents}</div>
//               ) : (
//                 <ScheduledEventsTable scheduledEvents={scheduledEvents} />
//               )}
//             </TabsContent>

//             <TabsContent value="tasks">
//               {loadingTasks ? (
//                 <TableSkeleton columns={5} />
//               ) : errorTasks ? (
//                 <div className="py-8 text-center text-red-500">{errorTasks}</div>
//               ) : (
//                 <TasksTable tasks={tasks} />
//               )}
//             </TabsContent>
//         </Tabs>
//       </Card>
//     </div>
//   );
// }











"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import FollowUpsTable from "@/components/FollowUpsTable";
import TasksTable from "@/components/TasksTable";
import ColdEmailsTable from "@/components/ColdEmailsTable";
// import InboundEmailsTable from "@/components/InboundEmailsTable";
import ScheduledEventsTable from "@/components/ScheduledEventsTable";
import Navbar from "@/components/Navbar";
import { ColdEmail } from '@/components/ColdEmailsTable';
import type { FollowUp } from '@/components/FollowUpsTable';
import type { Task } from '@/components/TasksTable';
import type { ScheduledEvent } from '@/components/ScheduledEventsTable';

const base_url= process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
console.log("Using base URL:", base_url);

function SignOutButton() {
  const router = useRouter();
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow transition-colors"
      onClick={() => {
        localStorage.removeItem("token");
        router.push("/login");
      }}
    >
      Sign Out
    </button>
  );
}

function AuthenticateTokenButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuthenticateToken = async () => {
    setLoading(true);
    setMessage("");
    
    try {
      const token = localStorage.getItem("token");
      // const response = await fetch("http://localhost:8000/api/authenticate-token", {
      const response = await fetch(`${base_url}/api/authenticate-token`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      const data = await response.json();
      
      if (response.ok && data.redirect_url) {
      // ✅ Use the URL returned by backend to redirect
      window.open(data.redirect_url, "_blank", "noopener,noreferrer");
    } else {
      setMessage(data.error || "Authentication failed");
      setTimeout(() => setMessage(""), 3000);
    }
  } catch (err: unknown) {
    setMessage(err instanceof Error ? err.message : "Network error occurred");
    setTimeout(() => setMessage(""), 3000);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="relative">
      <button
        onClick={handleAuthenticateToken}
        disabled={loading}
        className={`px-4 py-2 rounded shadow font-semibold transition-colors mr-3 ${
          loading
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {loading ? "Authenticating..." : "Authenticate Token"}
      </button>
      
      {message && (
        <div className={`absolute top-full mt-1 right-0 px-3 py-1 rounded text-sm whitespace-nowrap ${
          message.includes("success") 
            ? "bg-green-100 text-green-800 border border-green-300" 
            : "bg-red-100 text-red-800 border border-red-300"
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}

function TableSkeleton({ columns, rows = 3 }: { columns: number; rows?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-3 py-2 border">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: columns }).map((_, j) => (
                <td key={j} className="px-3 py-2 border">
                  <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cold-emails");

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setIsAuthenticated(true);
    setAuthLoading(false);
  }, [router]);

  // Cold Emails
  const [coldEmails, setColdEmails] = useState<ColdEmail[]>([]);
  const [loadingColdEmails, setLoadingColdEmails] = useState(false);
  const [errorColdEmails, setErrorColdEmails] = useState<string | null>(null);

  // Follow-ups
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loadingFollowUps, setLoadingFollowUps] = useState(false);
  const [errorFollowUps, setErrorFollowUps] = useState<string | null>(null);

  // Tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [errorTasks, setErrorTasks] = useState<string | null>(null);

  // Scheduled Events
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>([]);
  const [loadingScheduledEvents, setLoadingScheduledEvents] = useState(false);
  const [errorScheduledEvents, setErrorScheduledEvents] = useState<string | null>(null);

  // Dashboard Stats
  const [tokenDaysLeft, setTokenDaysLeft] = useState<number | null>(null);
  const [messageQuotaLeft, setMessageQuotaLeft] = useState<number | null>(null);
  const [googleSheetUrl, setGoogleSheetUrl] = useState<string | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [errorStats, setErrorStats] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    setLoadingStats(true);
    async function fetchDashboardStats() {
      try {
        const token = localStorage.getItem("token");
        // const res = await fetch("http://localhost:8000/api/dashboard-stats", {
        const res = await fetch(`${base_url}/api/dashboard-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setTokenDaysLeft(data.token_days_left);
          setMessageQuotaLeft(data.message_quota_left);
          setGoogleSheetUrl(data.google_sheet_url);
        } else {
          setErrorStats(data.error || "Failed to fetch dashboard stats");
        }
      } catch (err: unknown) {
        setErrorStats(err instanceof Error ? err.message : String(err));
      } finally {
        setLoadingStats(false);
      }
    }

    fetchDashboardStats();
  }, [isAuthenticated]);

  // API Loaders
  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchAllData() {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        setLoadingColdEmails(true);
        // const coldRes = await fetch("http://localhost:8000/api/cold-emails", { headers });
        const coldRes = await fetch(`${base_url}/api/cold-emails`, { headers });
        const coldData = await coldRes.json();
        setColdEmails(coldData.cold_emails || []);
        setErrorColdEmails(coldRes.ok ? null : coldData.error);

        setLoadingFollowUps(true);
        // const followRes = await fetch("http://localhost:8000/api/follow-ups", { headers });
        const followRes = await fetch(`${base_url}/api/follow-ups`, { headers });
        const followData = await followRes.json();
        setFollowUps(followData.follow_ups || []);
        setErrorFollowUps(followRes.ok ? null : followData.error);

        setLoadingTasks(true);
        const taskRes = await fetch("/api/tasks", { headers });
        const taskData = await taskRes.json();
        setTasks(taskData.tasks || []);
        setErrorTasks(taskRes.ok ? null : taskData.error);

        setLoadingScheduledEvents(true);
        const eventRes = await fetch("/api/events", { headers });
        const eventData = await eventRes.json();
        setScheduledEvents(eventData.events || []);
        setErrorScheduledEvents(eventRes.ok ? null : eventData.error);
      } catch (err: unknown) {
        setErrorColdEmails(err instanceof Error ? err.message : String(err));
        setErrorFollowUps(err instanceof Error ? err.message : String(err));
        setErrorTasks(err instanceof Error ? err.message : String(err));
        setErrorScheduledEvents(err instanceof Error ? err.message : String(err));
      } finally {
        setLoadingColdEmails(false);
        setLoadingFollowUps(false);
        setLoadingTasks(false);
        setLoadingScheduledEvents(false);
      }
    }

    fetchAllData();
  }, [isAuthenticated]);

  const handleGoogleSheetClick = () => {
    if (googleSheetUrl) {
      window.open(googleSheetUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              {/* <div className="text-xl font-bold text-gray-800">AI Agent Dashboard</div> */}
              <Navbar setActiveTab={setActiveTab} />
            </div>
            <SignOutButton />
            <AuthenticateTokenButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">AI Agent Gmail Automation Dashboard</h1>

        {/* Stats */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <button
            onClick={handleGoogleSheetClick}
            disabled={loadingStats || !googleSheetUrl}
            className={`px-5 py-2 rounded shadow font-semibold transition-colors ${
              loadingStats || !googleSheetUrl
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loadingStats ? "Loading..." : errorStats ? "Sheet Unavailable" : "Open Google Sheet"}
          </button>

          <div className="flex gap-4">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow text-center">
              <div className="text-xs font-medium">Token Refresh Days Left</div>
              <div className="text-xl font-bold">{tokenDaysLeft ?? "--"}</div>
            </div>

            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow text-center">
              <div className="text-xs font-medium">Message Quota Left</div>
              <div className="text-xl font-bold">{messageQuotaLeft ?? "--"}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Card className="p-6 mb-8 shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 flex flex-wrap gap-2 justify-center">
              <TabsTrigger value="cold-emails">Cold Emails</TabsTrigger>
              <TabsTrigger value="follow-ups">Follow-ups</TabsTrigger>
              {/* <TabsTrigger value="inbound-emails">Inbound Emails</TabsTrigger> */}
              <TabsTrigger value="scheduled-events">Scheduled Events</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="cold-emails">
              {loadingColdEmails ? (
                <TableSkeleton columns={5} />
              ) : errorColdEmails ? (
                <div className="py-8 text-center text-red-500">{errorColdEmails}</div>
              ) : (
                <ColdEmailsTable coldEmails={coldEmails} />
              )}
            </TabsContent>

            <TabsContent value="follow-ups">
              {loadingFollowUps ? (
                <TableSkeleton columns={6} />
              ) : errorFollowUps ? (
                <div className="py-8 text-center text-red-500">{errorFollowUps}</div>
              ) : (
                <FollowUpsTable followUps={followUps} />
              )}
            </TabsContent>

            {/* <TabsContent value="inbound-emails">
              ...
            </TabsContent> */}

            <TabsContent value="scheduled-events">
              {loadingScheduledEvents ? (
                <TableSkeleton columns={6} />
              ) : errorScheduledEvents ? (
                <div className="py-8 text-center text-red-500">{errorScheduledEvents}</div>
              ) : (
                <ScheduledEventsTable scheduledEvents={scheduledEvents} />
              )}
            </TabsContent>

            <TabsContent value="tasks">
              {loadingTasks ? (
                <TableSkeleton columns={5} />
              ) : errorTasks ? (
                <div className="py-8 text-center text-red-500">{errorTasks}</div>
              ) : (
                <TasksTable tasks={tasks} />
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}







