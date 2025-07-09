import { NextRequest, NextResponse } from 'next/server';

const mockScheduledEvents = [
  {
    id: '1',
    event_title: 'Demo Call',
    invitee: 'Eve',
    date_time: new Date().toISOString(),
    duration: '30m',
    meeting_link: 'https://meet.example.com/abc',
    agent_assigned: 'Agent Smith',
  },
  {
    id: '2',
    event_title: 'Strategy Session',
    invitee: 'Frank',
    date_time: new Date(Date.now() + 2 * 86400000).toISOString(),
    duration: '1h',
    meeting_link: 'https://meet.example.com/xyz',
    agent_assigned: 'Agent Jones',
  },
];

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ events: mockScheduledEvents }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 