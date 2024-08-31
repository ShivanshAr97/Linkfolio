import { Event } from '@/models/Event';
import mongoose from 'mongoose';

export async function GET(req) {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI);

  // Parse the URL parameters
  const url = new URL(req.url);
  const urlParam = url.searchParams.get("url");
  const urlPara = url.searchParams.get("page");

  // Get the current date as a string (YYYY-MM-DD)
  const date = new Date();
  const dateString = date.toISOString().split("T")[0];

  // Find an existing event or create a new one with an incremented count
  const a  = await Event.findOneAndUpdate(
    { uri: urlParam, page: urlPara, date: dateString },
    { $inc: { count: 1 }, type: 'click' }, // Increment count by 1
    { upsert: true, new: true } // Create a new document if none exists
  );

  // Return the result as JSON
  return Response.json(a);
}
