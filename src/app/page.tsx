"use client";

import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/api";
import EventCard from "./components/EventCard";
import Pagination from "./components/Pagination";
import FilterBar from "./components/FilterBar";

export default function Home() {
  const [events, setEvents] = useState([]);
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
    setPage(0); // reset to first page when filters change
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        EventHub Lite – Trending Events
      </h1>

      <FilterBar
        country={country}
        startDate={startDate}
        endDate={endDate}
        onFilterChange={handleFilterChange}
      />

      {loading ? (
        <p className="text-center text-gray-600">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-red-500 mt-10">
          No events found. Try a different country or date range.
        </p>
      ) : (
        <>
          <div className="grid gap-4 max-w-3xl mx-auto">
            {events.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
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
