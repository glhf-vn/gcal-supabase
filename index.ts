import boxen from "boxen";
import client from "./lib/supabase.js";
import { DateTime } from "luxon";
import { getEntries } from "./lib/google-calendar.js";

console.log(
  boxen("Migrating from Google Calendar to Supabase Database", {
    title: "gcal-supabase",
    titleAlignment: "center",
  })
);

const data = await getEntries(
  DateTime.now().minus({ month: 1 }).startOf("month").toISO(),
  DateTime.now().plus({ month: 1 }).endOf("month").toISO()
);

const parsedData: object[] = data.map((entry) => {
  return {
    name: entry.name,
    publisher: entry.publisher,
    date: entry.date,
    description: entry.description || null,
    image_url: entry.imageUrl || null,
    price: entry.price,
  };
});

const { error } = await client.from("publication").insert(parsedData);

console.log(error);
