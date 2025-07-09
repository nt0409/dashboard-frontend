import React from 'react';
// Define the ColdEmail type based on the expected fields
export type ColdEmail = {
  email: string;
  name: string;
  website?: string;
  lead_type?: string;
  client_background?: string;
  scheduled_followup_date?: string;
};

export default function ColdEmailsTable({ coldEmails }: { coldEmails: ColdEmail[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">Recipient</th>
            <th className="px-3 py-2 border">Website</th>
            <th className="px-3 py-2 border">Email</th>
            <th className="px-3 py-2 border">Lead Type</th>
            <th className="px-3 py-2 border">Background</th>
          </tr>
        </thead>
        <tbody>
          {coldEmails.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-400">No cold emails found.</td>
            </tr>
          ) : (
            coldEmails.map((email, index) => (
              <tr key={`${index}-${email.email}`} className="border-b">
                <td className="px-3 py-2 border">{email.name}</td>
                <td className="px-3 py-2 border">{email.website}</td>
                <td className="px-3 py-2 border">{email.email}</td>
                <td className="px-3 py-2 border">{email.lead_type}</td>
                <td className="px-3 py-2 border max-w-xs truncate">{email.client_background}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}