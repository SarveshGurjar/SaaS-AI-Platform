import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    // Search iTunes for the song - no API key needed, completely free
    const searchQuery = encodeURIComponent(prompt);
    const response = await fetch(
      `https://itunes.apple.com/search?term=${searchQuery}&media=music&limit=1&entity=song`
    );

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return new NextResponse("No song found", { status: 404 });
    }

    const song = data.results[0];
    
    await increaseApiLimit();

    return NextResponse.json({
      audio: song.previewUrl,        // 30 second MP3 preview
      title: song.trackName,
      artist: song.artistName,
      artwork: song.artworkUrl100,
    });
  } catch (error) {
    console.log("[MUSIC_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}