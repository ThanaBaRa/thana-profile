import { createClient } from '@vercel/redis';

export default async function handler(request, response) {
  try {
    const redis = createClient();
    
    if (request.method === 'POST') {
      const newCount = await redis.incr('card_clicks');
      return response.status(200).json({ success: true, count: newCount });
    } else {
      const currentCount = await redis.get('card_clicks') || 0;
      return response.status(200).json({ success: true, count: currentCount });
    }
  } catch (error) {
    return response.status(500).json({ success: false, error: error.message });
  }
}
