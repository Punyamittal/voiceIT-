<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
import { departments } from '@/config/departmentConfig';
import { getTabData } from './sheet-service';
import * as XLSX from 'xlsx';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function exportSheetsAndNotifyLeads() {
  for (const [deptKey, deptInfo] of Object.entries(departments)) {
    try {
      const data = await getTabData(deptKey);

      if (!data || data.length === 0) {
        console.warn(`No data found for ${deptKey}, skipping...`);
        continue;
      }

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, deptKey);

      const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: deptInfo.email,
        subject: `Recruitment Submissions - ${deptInfo.name}`,
        text: `Attached are all the form submissions for your department.`,
        attachments: [
          {
            filename: `${deptInfo.name}.xlsx`,
            content: buffer,
            contentType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        ],
      });

      console.log(`✅ Sent Excel for ${deptKey}`);
    } catch (err) {
      console.error(`❌ Failed to process ${deptKey}:`, err);
    }
  }
}
<<<<<<< HEAD
>>>>>>> ba4c3f986f9e946e11d74ba4bf6b0df66242d2f1
=======
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
