import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

function analyzeScript(code: string) {
  let riskScore = 5; // Base score
  const flags = [];
  const normalizedCode = code.toLowerCase();

  // Heuristic rule checks
  if (normalizedCode.includes('rm -rf') || normalizedCode.includes('del /f')) {
    riskScore += 40;
    flags.push({ type: 'danger', msg: 'Destructive file deletion detected' });
  }
  if (normalizedCode.includes('curl') || normalizedCode.includes('wget') || normalizedCode.includes('urllib')) {
    riskScore += 25;
    flags.push({ type: 'warning', msg: 'External network request detected' });
  }
  if (normalizedCode.includes('os.system') || normalizedCode.includes('subprocess') || normalizedCode.includes('eval(') || normalizedCode.includes('exec(')) {
    riskScore += 30;
    flags.push({ type: 'danger', msg: 'Arbitrary code execution or shell spawning' });
  }
  if (normalizedCode.includes('chmod +x') || normalizedCode.includes('icacls')) {
    riskScore += 20;
    flags.push({ type: 'warning', msg: 'File permission modification' });
  }
  if (normalizedCode.includes('base64')) {
    riskScore += 15;
    flags.push({ type: 'warning', msg: 'Potential payload obfuscation (Base64)' });
  }

  riskScore = Math.min(riskScore, 100);
  let status = 'Clean';
  if (riskScore > 35) status = 'Suspicious';
  if (riskScore > 70) status = 'Malicious';

  return { riskScore, status, flags };
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { scriptContent } = await request.json();
    if (!scriptContent) return NextResponse.json({ error: 'Script content is required' }, { status: 400 });

    // Simulate heavy AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysisResult = analyzeScript(scriptContent);
    
    // Log target snippet (first 30 chars) so DB isn't flooded with massive code blocks
    const targetSnippet = scriptContent.substring(0, 30).replace(/\n/g, ' ') + '...';

    const { error: dbError } = await supabase
      .from('threat_logs')
      .insert([{
          user_id: userId,
          module_type: 'SANDBOX',
          target: targetSnippet,
          risk_score: analysisResult.riskScore,
          status: analysisResult.status,
      }]);

    if (dbError) console.error('Database Error:', dbError);

    return NextResponse.json({ success: true, ...analysisResult });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
