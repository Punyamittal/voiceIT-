import { NextResponse } from "next/server";
import { appendToSheet } from "../../../../lib/sheet-service";
import { sendEmailToLead } from "../../../../lib/email-service";

export async function POST(req: Request) {
  const { name, email, phone, year, department, answers } = await req.json();


  if (!name || !email || !department || !answers) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  try {
    await Promise.all([
      appendToSheet({ name, email, phone, year, department, answers }),
      sendEmailToLead({ name, email, phone, department, answers }),
    ]);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}