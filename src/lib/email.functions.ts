import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1ssOAOAv9hK-2HCl7J-9ICnRd_l2QV-WnE2kyton5EyQ";
const SHEET_NAME = "emails";

const schema = z.object({
  email: z.string().trim().email().max(255),
  source: z.string().trim().max(80).default("newsletter"),
  name: z.string().trim().max(120).optional(),
});

export const subscribeEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const gatewayKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!lovableKey || !gatewayKey) {
      throw new Error("Google Sheets connector no configurado");
    }

    const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:D:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

    const row = [
      new Date().toISOString(),
      data.email,
      data.source,
      data.name ?? "",
    ];

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gatewayKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Sheets append failed [${res.status}]: ${body}`);
      throw new Error(`No pudimos guardar tu email (${res.status})`);
    }

    return { ok: true as const };
  });
