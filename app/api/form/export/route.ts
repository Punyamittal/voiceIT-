import { NextResponse } from "next/server";
import { exportSheetsAndNotifyLeads } from "@/lib/export-service";
import fs from "fs";
import path from "path";

const EXPORT_ALLOWED_AFTER = new Date(process.env.EXPORT_ALLOWED_AFTER!);

export async function POST() {
  try {
    const now = new Date();

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
