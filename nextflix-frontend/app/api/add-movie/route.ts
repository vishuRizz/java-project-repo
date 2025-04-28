// File: app/api/movies/route.ts

// @ts-ignore
import { Pool } from 'pg';
import { NextResponse } from 'next/server';

// Create a connection pool to the Neon PostgreSQL database
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_26WSVXnecqzY@ep-spring-rice-a4dvsu57-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: true
  }
});

// Helper function to add a movie and its source
async function addMovie(
  categoryName: string,
  title: string,
  subtitle: string,
  description: string,
  thumb: string,
  sourceUrl: string
) {
  const client = await pool.connect();
  
  try {
    // Start transaction
    await client.query('BEGIN');
    
    // Check if category exists, create if not
    let categoryId;
    const categoryResult = await client.query(
      'SELECT id FROM categories WHERE name = $1',
      [categoryName]
    );
    
    if (categoryResult.rows.length === 0) {
      const newCategory = await client.query(
        'INSERT INTO categories (name) VALUES ($1) RETURNING id',
        [categoryName]
      );
      categoryId = newCategory.rows[0].id;
    } else {
      categoryId = categoryResult.rows[0].id;
    }
    
    // Insert the video
    const videoResult = await client.query(
      'INSERT INTO videos (category_id, title, subtitle, description, thumb) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [categoryId, title, subtitle, description, thumb]
    );
    const videoId = videoResult.rows[0].id;
    
    // Insert the video source
    await client.query(
      'INSERT INTO video_sources (video_id, source_url) VALUES ($1, $2)',
      [videoId, sourceUrl]
    );
    
    // Commit transaction
    await client.query('COMMIT');
    
    return { success: true, videoId };
  } catch (error) {
    // Rollback in case of error
    await client.query('ROLLBACK');
    console.error('Database error:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Update in app/api/movies/route.ts
export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { 
        categoryName, 
        title, 
        subtitle, 
        description, 
        thumb, 
        sourceUrl 
      } = body;
      
      console.log("Received request body:", body); // Add logging
      
      // Validate required fields
      if (!categoryName || !title || !sourceUrl) {
        console.log("Validation failed"); // Add logging
        return NextResponse.json(
          { error: 'Category name, title, and source URL are required' },
          { status: 400 }
        );
      }
      
      const result = await addMovie(
        categoryName,
        title,
        subtitle || '',
        description || '',
        thumb || '',
        sourceUrl
      );
      
      console.log("Operation successful:", result); // Add logging
      return NextResponse.json(result);
    } catch (error: any) {
      console.error('API error:', error);
      // Return a proper error response
      return NextResponse.json(
        { error: error.message || 'Internal server error', stack: process.env.NODE_ENV === 'development' ? error.stack : undefined },
        { status: 500 }
      );
    }
  }

// For adding multiple movies at once
export async function PUT(request: Request) {
  try {
    const { movies } = await request.json();
    
    if (!Array.isArray(movies) || movies.length === 0) {
      return NextResponse.json(
        { error: 'Please provide an array of movies' },
        { status: 400 }
      );
    }
    
    const results = [];
    
    for (const movie of movies) {
      const { 
        categoryName, 
        title, 
        subtitle, 
        description, 
        thumb, 
        sourceUrl 
      } = movie;
      
      if (!categoryName || !title || !sourceUrl) {
        results.push({ 
          title, 
          error: 'Category name, title, and source URL are required'
        });
        continue;
      }
      
      try {
        const result = await addMovie(
          categoryName,
          title,
          subtitle || '',
          description || '',
          thumb || '',
          sourceUrl
        );
        results.push({ title, ...result });
      } catch (error: any) {
        results.push({ 
          title, 
          error: error.message 
        });
      }
    }
    
    return NextResponse.json({ results });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}