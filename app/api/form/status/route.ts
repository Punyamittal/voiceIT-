import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET() {
  const now = dayjs();
  const start = dayjs("2025-06-10");
  const end = dayjs("2025-07-01");
  return NextResponse.json({ status: now.isAfter(start) && now.isBefore(end) ? "open" : "closed" });
}