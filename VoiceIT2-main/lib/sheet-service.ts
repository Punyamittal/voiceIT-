import { google } from "googleapis";
const GOOGLE_CREDENTIALS = process.env.GOOGLE_CREDENTIALS;
if (!GOOGLE_CREDENTIALS) {
  throw new Error("GOOGLE_CREDENTIALS environment variable is not set.");
}

let credentials;
try {
  credentials = JSON.parse(GOOGLE_CREDENTIALS);
} catch (e) {
  throw new Error("Failed to parse GOOGLE_CREDENTIALS. Ensure it's valid JSON.");
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: 'v4', auth });

const SHEET_ID = process.env.SHEET_ID;
if (!SHEET_ID) {
  throw new Error("SHEET_ID environment variable is not set.");
}

export async function appendToSheet(dept: string, data: any[]) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${dept}!A1`,
    valueInputOption: 'RAW',
    requestBody: { values: [data] },
  });
}

export async function getSheetTabs() {
  const metadata = await sheets.spreadsheets.get({
    spreadsheetId: SHEET_ID,
  });
  return metadata.data.sheets?.map(s => s.properties?.title) || [];
}

export async function getTabData(tabName: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${tabName}!A1:Z1000`,
  });
  return response.data.values || [];
}