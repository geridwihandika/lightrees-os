import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Verify webhook secret if configured
    const webhookSecret = process.env.WEBHOOK_SECRET;
    const authHeader = req.headers.get('authorization') || req.headers.get('x-webhook-secret');

    if (webhookSecret && authHeader !== webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json({ error: 'Unauthorized webhook call' }, { status: 401 });
    }

    console.log('[Make.com Webhook Received]:', {
      timestamp: new Date().toISOString(),
      event: payload.event || 'feasibility_processed',
      dataKeys: Object.keys(payload),
    });

    return NextResponse.json({
      received: true,
      timestamp: new Date().toISOString(),
      status: 'acknowledged',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Invalid webhook payload', details: msg },
      { status: 400 }
    );
  }
}
