import { google } from "googleapis";
import { departments } from "@/config/departmentConfig"; // Assuming this exists and is needed

// IMPORTANT: Ensure the following environment variables are set for Google Sheets API access:
// GOOGLE_CLIENT_EMAIL
// GOOGLE_PRIVATE_KEY (replace \\n with actual newlines if copied from a single line)
// GOOGLE_SHEET_ID

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function exportSheetsAndNotifyLeads(): Promise<string> {
  let csvRows: string[] = [];
  // Define your CSV header based on the data you expect from your sheets
  csvRows.push("Department,Name,Email,Phone,Year,Answers"); // Example header

  for (const [deptKey, deptInfo] of Object.entries(departments)) {
    try {
      // Assuming deptInfo has a 'sheetName' property
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `${deptInfo.sheetName}!A:Z`, // Adjust range as needed to cover all data
      });

      const rows = response.data.values;
      if (rows && rows.length > 0) {
        // Append data rows, escaping double quotes and enclosing in quotes
        rows.forEach((row: any[]) => {
          csvRows.push(row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","));
        });
      }
    } catch (error) {
      console.error(`Error fetching data for department ${deptKey}:`, error);
      // Continue to next department even if one fails
    }
  }

  if (csvRows.length <= 1) { // Only header exists, meaning no data was fetched
    return "No data available for export.";
  }

  return csvRows.join("\n");
}