// import React from 'react';

// type InboundEmail = {
//   id: string;
//   sender: string;
//   subject?: string;
//   snippet?: string;
//   received_time?: string;
//   ai_response_status?: string;
// };

// export default function InboundEmailsTable({ inboundEmails }: { inboundEmails: InboundEmail[] }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-3 py-2 border">Sender</th>
//             <th className="px-3 py-2 border">Subject</th>
//             <th className="px-3 py-2 border">Snippet</th>
//             <th className="px-3 py-2 border">Received Time</th>
//             <th className="px-3 py-2 border">AI Response Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inboundEmails.length === 0 ? (
//             <tr>
//               <td colSpan={5} className="text-center py-4 text-gray-400">No inbound emails found.</td>
//             </tr>
//           ) : (
//             inboundEmails.map(email => (
//               <tr key={email.id} className="border-b">
//                 <td className="px-3 py-2 border">{email.sender}</td>
//                 <td className="px-3 py-2 border max-w-xs truncate">{email.subject}</td>
//                 <td className="px-3 py-2 border max-w-xs truncate">{email.snippet}</td>
//                 <td className="px-3 py-2 border">{email.received_time ? new Date(email.received_time).toLocaleString() : ''}</td>
//                 <td className="px-3 py-2 border">{email.ai_response_status}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// } 