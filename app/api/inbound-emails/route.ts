import { NextRequest, NextResponse } from 'next/server';

const mockInboundEmails = [
  {
    id: '1',
    sender: 'carol@company.com',
    subject: 'Re: Meeting Follow-up',
    snippet: 'Thanks for your time today...',
    received_time: new Date().toISOString(),
    ai_response_status: 'Pending',
  },
  {
    id: '2',
    sender: 'dave@another.com',
    subject: 'Intro Request',
    snippet: 'Can you introduce me to...',
    received_time: new Date(Date.now() - 3600000).toISOString(),
    ai_response_status: 'Completed',
  },
];

export async function GET() {
  try {
    return NextResponse.json({ inbound_emails: mockInboundEmails }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
} 