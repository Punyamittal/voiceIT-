import { NextResponse } from "next/server";
import { exportSheetsAndNotifyLeads } from "@/lib/export-service";
import fs from "fs";
import path from "path";

const EXPORT_ALLOWED_AFTER_STR = process.env.EXPORT_ALLOWED_AFTER;
const EXPORT_ALLOWED_AFTER = EXPORT_ALLOWED_AFTER_STR ? new Date(EXPORT_ALLOWED_AFTER_STR) : null;

export async function POST() {
  try {
    const now = new Date();

    if (!EXPORT_ALLOWED_AFTER || isNaN(EXPORT_ALLOWED_AFTER.getTime())) {
      console.error("Invalid EXPORT_ALLOWED_AFTER environment variable:", EXPORT_ALLOWED_AFTER_STR);
      return NextResponse.json(
        { error: "Server configuration error: EXPORT_ALLOWED_AFTER is not set or is invalid." },
        { status: 500 }
      );
    }

    // 🚫 Block export if recruitment is still open
    if (now <= EXPORT_ALLOWED_AFTER) {
      return NextResponse.json(
        { error: "Form is still open. Export not allowed yet." },
        { status: 403 }
      );
    }

    await exportSheetsAndNotifyLeads();

    const EXPORT_FLAG_PATH = path.join(process.cwd(), "tmp", "exported.json");
    fs.mkdirSync(path.dirname(EXPORT_FLAG_PATH), { recursive: true });

    fs.writeFileSync(
      EXPORT_FLAG_PATH,
      JSON.stringify({ exported: true, date: now.toISOString() })
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Export error:", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
