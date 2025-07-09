import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase.from('follow_ups').select('*').limit(1).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ row: data }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
} 