interface EventCardProps {
  event: {
    name: string;
    dates?: {
      start?: {
        localDate?: string;
        localTime?: string;
      };
    };
    info?: string;
    _embedded?: {
      venues?: Array<{
        name?: string;
        country?: {
          name?: string;
        };
      }>;
    };
  };
}

export default function EventCard({ event }: EventCardProps) {
  const date = event?.dates?.start?.localDate || "Unknown date";
  const time = event?.dates?.start?.localTime || "Unknown time";
  const venue = event?._embedded?.venues?.[0];

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-semibold text-blue-600">{event.name}</h2>

      <p className="text-sm text-gray-500">
        {date} – {time}
      </p>

      <p className="text-gray-700 mt-1">
        {event?.info || "No description available."}
      </p>

      <p className="mt-2 text-sm text-gray-600">
        Venue: {venue?.name || "N/A"}, {venue?.country?.name || "N/A"}
      </p>
    </div>
  );
}
