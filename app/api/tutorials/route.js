import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Tutorial from '../../models/Tutorial';

// Named export for POST method
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const tutorial = await Tutorial.create(data);
    return NextResponse.json(tutorial);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// If you need other HTTP methods, export them like this:
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    // const category = searchParams.get('category');
    const slug = searchParams.get('slug');
     
    const query = {};
    if (slug) query.slug = slug;
    console.log(query, "query");
    const tutorials = await Tutorial.find(query)
      .sort({ createdAt: -1 });
      
    return NextResponse.json(tutorials);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}