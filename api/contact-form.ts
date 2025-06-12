import type { VercelRequest, VercelResponse } from '@vercel/node';

async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Received contact:', { name, email, message });

    return res.status(200).json({ message: 'Form submitted successfully!' });
}

export default handler;