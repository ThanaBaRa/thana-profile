import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // เช็คว่าหน้าเว็บส่งคำสั่งขอ "บวกเลข" (POST) หรือแค่ "ดึงเลขไปโชว์" (GET)
    if (request.method === 'POST') {
      const newCount = await kv.incr('card_clicks');
      return response.status(200).json({ success: true, count: newCount });
    } else {
      const currentCount = await kv.get('card_clicks') || 0;
      return response.status(200).json({ success: true, count: currentCount });
    }
  } catch (error) {
    return response.status(500).json({ success: false, error: error.message });
  }
}
