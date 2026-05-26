import { createClient } from 'redis';

export default async function handler(request, response) {
  const redis = createClient({ url: process.env.REDIS_URL });

  try {
    await redis.connect();

    if (request.method === 'POST') {
      const newCount = await redis.incr('card_clicks');
      return response.status(200).json({ success: true, count: newCount });
    } else {
      const currentCount = (await redis.get('card_clicks')) ?? 0;
      return response.status(200).json({ success: true, count: Number(currentCount) });
    }
  } catch (error) {
    return response.status(500).json({ success: false, error: error.message });
  } finally {
    await redis.disconnect();
  }
}
