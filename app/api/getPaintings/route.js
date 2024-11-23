import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('database'); // Replace with your database name

    const collection = db.collection('paintings'); // Replace with your collection name
    const data = await collection.find({}).toArray();

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json' },
    });    
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}