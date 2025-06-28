import { NextRequest, NextResponse } from "next/server";
import { departments } from "@/config/departmentConfig";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const dept = url.searchParams.get("dept");

  if (!dept || !departments[dept]) {
    return NextResponse.json({ error: "Invalid department" }, { status: 400 });
  }

  const { name, description, questions } = departments[dept];
  return NextResponse.json({ department: name, description, questions });
}
