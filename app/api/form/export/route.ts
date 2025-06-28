<<<<<<< HEAD
import { NextResponse, NextRequest } from "next/server";
=======
import { NextResponse } from "next/server";
>>>>>>> ba4c3f986f9e946e11d74ba4bf6b0df66242d2f1
import { exportSheetsAndNotifyLeads } from "@/lib/export-service";
import fs from "fs";
import path from "path";

<<<<<<< HEAD
// Define the date after which export is allowed.
// You should set this to a future date or a date that makes sense for your recruitment cycle.
const EXPORT_ALLOWED_AFTER = new Date("2023-01-01T00:00:00Z"); // Placeholder: Set to your actual date

export async function POST(req: NextRequest) {
=======
const EXPORT_ALLOWED_AFTER = new Date(process.env.EXPORT_ALLOWED_AFTER!);

export async function POST() {
>>>>>>> ba4c3f986f9e946e11d74ba4bf6b0df66242d2f1
  try {
    const now = new Date();

    // 🚫 Block export if recruitment is still open
    if (now <= EXPORT_ALLOWED_AFTER) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Export is not allowed yet. Recruitment might still be open." },
=======
        { error: "Form is still open. Export not allowed yet." },
>>>>>>> ba4c3f986f9e946e11d74ba4bf6b0df66242d2f1
        { status: 403 }
      );
    }

<<<<<<< HEAD
    const csvContent = await exportSheetsAndNotifyLeads();

    // Ensure the 'tmp' directory exists for the export flag
    const EXPORT_FLAG_PATH = path.join(process.cwd(), "tmp", "exported.json");
    fs.mkdirSync(path.dirname(EXPORT_FLAG_PATH), { recursive: true });
=======
    await exportSheetsAndNotifyLeads();

    const EXPORT_FLAG_PATH = path.join(process.cwd(), "tmp", "exported.json");
    fs.mkdirSync(path.dirname(EXPORT_FLAG_PATH), { recursive: true });

>>>>>>> ba4c3f986f9e946e11d74ba4bf6b0df66242d2f1
    fs.writeFileSync(
      EXPORT_FLAG_PATH,
      JSON.stringify({ exported: true, date: now.toISOString() })
    );

<<<<<<< HEAD
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
=======
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Export error:", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
>>>>>>> ba4c3f986f9e946e11d74ba4bf6b0df66242d2f1
