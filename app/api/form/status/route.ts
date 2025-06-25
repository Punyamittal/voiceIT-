import { NextResponse } from "next/server";

const OPEN_FROM = new Date(process.env.RECRUITMENT_OPEN_FROM!);
const CLOSE_ON = new Date(process.env.RECRUITMENT_CLOSE_ON!);

export async function GET() {
  const now = new Date();
  const status = now >= OPEN_FROM && now <= CLOSE_ON ? "open" : "closed";
  return NextResponse.json({ status });
}
