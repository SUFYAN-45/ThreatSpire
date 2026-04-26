import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

function analyzeThreat(url: string) {
  let riskScore = 10;
  const flags = [];

  if (!url.startsWith('https://')) {
    riskScore += 30;
    flags.push({ type: 'danger', msg: 'Unencrypted connection (No HTTPS)' });
  }

  const suspiciousKeywords = ['login', 'verify', 'update', 'secure', 'auth', 'account', 'free-crypto', 'wallet'];
  const hasSuspiciousKeyword = suspiciousKeywords.some(keyword => url.toLowerCase().includes(keyword));
  if (hasSuspiciousKeyword) {
    riskScore += 25;
    flags.push({ type: 'warning', msg: 'Contains social engineering keywords' });
  }

  const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  if (ipRegex.test(url)) {
    riskScore += 40;
    flags.push({ type: 'danger', msg: 'Uses direct IP routing (Highly Suspicious)' });
  }

  riskScore = Math.min(riskScore, 100);
  let status = 'Clean';
  if (riskScore > 40) status = 'Suspicious';
  if (riskScore > 75) status = 'Malicious';

  return { riskScore, status, flags };
}

export async function POST(request: Request) {
  try {
    // 1. Get the current user from Clerk
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { targetUrl } = await request.json();
    if (!targetUrl) return NextResponse.json({ error: 'URL is required' }, { status: 400 });

    // 2. Run the analysis logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    const analysisResult = analyzeThreat(targetUrl);

    // 3. Save the result to Supabase
    const { error: dbError } = await supabase
      .from('threat_logs')
      .insert([
        {
          user_id: userId,
          module_type: 'URL',
          target: targetUrl,
          risk_score: analysisResult.riskScore,
          status: analysisResult.status,
        }
      ]);

    if (dbError) {
      console.error('Database Error:', dbError);
      // We still return success to the user so the UI updates, but we log the error
    }

    // 4. Return data to the frontend
    return NextResponse.json({ success: true, target: targetUrl, ...analysisResult });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
