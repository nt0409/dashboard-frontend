import React from 'react';

type ScheduledEvent = {
  id: string;
  event_title: string;
  invitee?: string;
  date_time?: string;
  duration?: string;
  meeting_link?: string;
  agent_assigned?: string;
};

export default function ScheduledEventsTable({ scheduledEvents }: { scheduledEvents: ScheduledEvent[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 border">Event Title</th>
            <th className="px-3 py-2 border">Invitee</th>
            <th className="px-3 py-2 border">Date & Time</th>
            <th className="px-3 py-2 border">Duration</th>
            <th className="px-3 py-2 border">Meeting Link</th>
            {/* <th className="px-3 py-2 border">Agent Assigned</th> */}
          </tr>
        </thead>
        <tbody>
          {scheduledEvents.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-400">No scheduled events found.</td>
            </tr>
          ) : (
            scheduledEvents.map(event => (
              <tr key={event.id} className="border-b">
                <td className="px-3 py-2 border">{event.event_title}</td>
                <td className="px-3 py-2 border">{event.invitee}</td>
                <td className="px-3 py-2 border">{event.date_time ? new Date(event.date_time).toLocaleString() : ''}</td>
                <td className="px-3 py-2 border">{event.duration}</td>
                <td className="px-3 py-2 border">
                  {event.meeting_link ? (
                    <a href={event.meeting_link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Link</a>
                  ) : ''}
                </td>
                {/* <td className="px-3 py-2 border">{event.agent_assigned}</td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 