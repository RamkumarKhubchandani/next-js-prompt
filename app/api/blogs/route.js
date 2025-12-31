import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Tutorial from '../../models/Tutorial';
import { getAllTutorials } from '../../lib/tutorials';

// Named export for POST method (Admin Creation)
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    // Basic validation
    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure slug is unique
    const existing = await Tutorial.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    const tutorial = await Tutorial.create(data);
    return NextResponse.json(tutorial);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// GET all tutorials (Hybrid: Static + Dynamic)
export async function GET(request) {
  try {
    const tutorials = await getAllTutorials();
    return NextResponse.json(tutorials);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}