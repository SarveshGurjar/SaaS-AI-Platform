import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    JSON.stringify({ message: "Payments are disabled. Enjoy free access!" }),
    { status: 200 }
  );
}
