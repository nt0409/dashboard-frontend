import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase.from('follow_ups').select('*').limit(1).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ row: data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 