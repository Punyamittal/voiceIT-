import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/sheet-service";

export async function POST(req: Request) {
  const { name, email, phone, year, department, answers } = await req.json();

  if (!name || !email || !phone || !year || !department || !answers) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const row = [new Date().toISOString(), name, email, phone, year, department, ...Object.values(answers)];
    await appendToSheet(department, row); // Pass correct sheet/tab name and row
    return NextResponse.json({ message: "Success" });
  } catch (err: any) {
    console.error("Sheet error:", err);
    return NextResponse.json({ error: "Failed to submit data" }, { status: 500 });
  }
}
