import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY!;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || "0";
  const countryCode = searchParams.get("countryCode");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const params: any = {
    apikey: API_KEY,
    size: 10,
    page,
    ...(countryCode && { countryCode }),
    ...(startDate && {
      startDateTime: new Date(`${startDate}T00:00:00Z`).toISOString(),
    }),
    ...(endDate && {
      endDateTime: new Date(`${endDate}T23:59:59Z`).toISOString(),
    }),
  };



  try {
    const response = await axios.get(`${BASE_URL}/events`, {
      params,
      timeout: 10000,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
