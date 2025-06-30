"use client";

import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/api";
import EventCard from "./components/EventCard";
import Pagination from "./components/Pagination";
import FilterBar from "./components/FilterBar";

type Event = {
  id: string;
  name: string;
  dates?: {
    start?: {
      localDate?: string;
      localTime?: string;
    };
  };
  info?: string;
  _embedded?: {
    venues?: {
      name?: string;
      country?: {
        name?: string;
        countryCode?: string;
      };
    }[];
  };
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchEvents({ page, countryCode: country, startDate, endDate }).then(
      (data) => {
        setEvents(data.events);
        setTotalPages(data.totalPages);
        setLoading(false);
      }
    );
  }, [page, country, startDate, endDate]);

  const handleFilterChange = ({
    country,
    startDate,
    endDate,
  }: {
    country: string;
    startDate: string;
    endDate: string;
  }) => {
    setCountry(country);
    setStartDate(startDate);
    setEndDate(endDate);
    setPage(0);
  };

  return (
    <main className="p-4">
      <FilterBar
        country={country}
        startDate={startDate}
        endDate={endDate}
        onFilterChange={handleFilterChange}
      />

      {loading ? (
        <p className="text-center text-gray-600">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-red-500 mt-10">No events found.</p>
      ) : (
        <div className="grid gap-4 max-w-3xl mx-auto">
          {events.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </main>
  );
}
