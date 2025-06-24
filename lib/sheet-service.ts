import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}'),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SHEET_ID = process.env.SHEET_ID || "";

export async function appendToSheet({ name, email, phone , year, department, answers }) {
  const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });
  const row = [
  new Date().toISOString(),
  name,
  email,
  phone,
  year,
  department,
  ...Object.values(answers),
];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Responses!A1",
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}