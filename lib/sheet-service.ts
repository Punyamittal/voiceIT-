import { google } from "googleapis";
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}'),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function appendToSheet(dept: string, data: any[]) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID!,
    range: `${dept}!A1`,
    valueInputOption: 'RAW',
    requestBody: { values: [data] },
  });
}

export async function getSheetTabs() {
  const metadata = await sheets.spreadsheets.get({
    spreadsheetId: process.env.SHEET_ID!,
  });
  return metadata.data.sheets?.map(s => s.properties?.title) || [];
}

export async function getTabData(tabName: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID!,
    range: `${tabName}!A1:Z1000`,
  });
  return response.data.values || [];
}