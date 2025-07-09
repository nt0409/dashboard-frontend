import { NextResponse } from 'next/server';

const mockColdEmails = [
  {
    id: '1',
    recipient: 'alice@example.com',
    email_preview: 'Hi Alice, just following up on our last conversation...',
    scheduled_time: new Date().toISOString(),
    status: 'Scheduled',
    agent_name: 'Agent Smith',
  },
  {
    id: '2',
    recipient: 'bob@example.com',
    email_preview: 'Bob, here is the info you requested...',
    scheduled_time: new Date(Date.now() + 86400000).toISOString(),
    status: 'Pending',
    agent_name: 'Agent Jones',
  },
];

export async function GET() {
  try {
    return NextResponse.json({ cold_emails: mockColdEmails }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
} 