import { google } from "googleapis";
import { DateTime } from "luxon";
import Papa from "papaparse";
import * as dotenv from "dotenv";

import calendarsData from "../data/calendars.json" assert { type: "json" };

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// get entries by lists, sorted from oldest to newest
export async function getEntries(
  start: string = DateTime.now().startOf("month").toISO(),
  end: string = DateTime.now().endOf("month").toISO(),
  calendars: any[] = calendarsData
) {
  const calendar = google.calendar({
    version: "v3",
    auth: GOOGLE_API_KEY,
  });

  const parsedEvents: Array<{
    name: string;
    id?: string;
    publisher: string;
    date: string;
    description?: string;
    imageUrl?: string;
    price: number;
  }> = [];

  await Promise.all(
    calendars.map(async (publisher) => {
      const res = await calendar.events.list({
        calendarId: publisher.id,
        timeMin: start,
        timeMax: end,
      });

      const events = res.data.items;

      if (!events || events.length === 0) {
        return;
      }

      events.map((entry) => {
        const parsedData: any[] = entry.description // not empty (!null)
          ? entry.description[0] != "<" // not html
            ? Papa.parse(entry.description).data // parse as csv
            : [[]] // dont parse
          : [[]]; // dont parse

        // price,image_url,description

        const data = parsedData[0];

        parsedEvents.push({
          name: entry.summary || "",
          id: entry.id || undefined,
          publisher: publisher.value,
          date: entry.start?.date || "",
          description: data[2] || undefined,
          imageUrl: data[1] || undefined,
          price: data[0] || 0,
        });
      });
    })
  );

  return parsedEvents;
}
