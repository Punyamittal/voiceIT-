import { NextResponse, NextRequest } from "next/server";
import { exportSheetsAndNotifyLeads } from "@/lib/export-service";
import fs from "fs";
import path from "path";

// Define the date after which export is allowed.
// You should set this to a future date or a date that makes sense for your recruitment cycle.
const EXPORT_ALLOWED_AFTER = new Date("2023-01-01T00:00:00Z"); // Placeholder: Set to your actual date

export async function POST(req: NextRequest) {
  try {
    const now = new Date();

    // 🚫 Block export if recruitment is still open
    if (now <= EXPORT_ALLOWED_AFTER) {
      return NextResponse.json(
        { error: "Export is not allowed yet. Recruitment might still be open." },
        { status: 403 }
      );
    }

    const csvContent = await exportSheetsAndNotifyLeads();

    // Ensure the 'tmp' directory exists for the export flag
    const EXPORT_FLAG_PATH = path.join(process.cwd(), "tmp", "exported.json");
    fs.mkdirSync(path.dirname(EXPORT_FLAG_PATH), { recursive: true });
    fs.writeFileSync(
      EXPORT_FLAG_PATH,
      JSON.stringify({ exported: true, date: now.toISOString() })
    );

    // Send CSV as response
    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="voiceit-export-${now.toISOString()}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    return NextResponse.json(
      { error: "Failed to export data. Check server logs for details." },
      { status: 500 }
    );
  }
}