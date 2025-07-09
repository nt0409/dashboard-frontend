import React from 'react';

export type FollowUp = {
  email: string;
  name: string;
  scheduled_followup_date: string;
  gsheet_timezone: string;
  sheet_id: string;
  sheet_name:string;
  created_at:string;
};

export default function FollowUpsTable({ followUps }: { followUps: FollowUp[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">Lead Email</th>
            {/* <th className="px-3 py-2 border">Prev. Message</th> */}
            <th className="px-3 py-2 border">Lead Name</th>
            <th className="px-3 py-2 border">Scheduled Date</th>
            <th className="px-3 py-2 border">Lead Type</th>
            <th className="px-3 py-2 border">No of FollowUps</th>
            {/* <th className="px-3 py-2 border">Agent</th> */}
          </tr>
        </thead>
        <tbody>
          {followUps.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-400">No follow-ups found.</td>
            </tr>
          ) : (
            followUps.map(fu => (
              <tr key={fu.email} className="border-b">
                <td className="px-3 py-2 border">{fu.email}</td>
                <td className="px-3 py-2 border">{fu.name}</td>
                {/* <td className="px-3 py-2 border max-w-xs truncate">{fu.previous_message_snippet}</td>
                <td className="px-3 py-2 border max-w-xs truncate">{fu.follow_up_template}</td> */}
                <td className="px-3 py-2 border">{fu.scheduled_followup_date ? new Date(fu.scheduled_followup_date).toLocaleString() : ''}</td>
                <td className="px-3 py-2 border">{fu.sheet_name}</td>
                <td className="px-3 py-2 border">{fu.created_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 