import { NextResponse } from "next/server";
import { departments } from "@/config/departmentConfig";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dept = searchParams.get("dept") || "";
  const info = departments[dept];
  if (!info) return NextResponse.json({ error: "Invalid department" }, { status: 400 });
  return NextResponse.json(info);
}