export async function fetchEvents({
  page = 0,
  countryCode = "",
  startDate = "",
  endDate = "",
}: {
  page?: number;
  countryCode?: string;
  startDate?: string;
  endDate?: string;
}) {
  try {
    const params = new URLSearchParams();
    params.append("page", String(page));
    if (countryCode) params.append("countryCode", countryCode);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const response = await fetch(`/api/events?${params.toString()}`);

    if (!response.ok) {
      return { events: [], totalPages: 0 };
    }

    const data = await response.json();

    const events = data._embedded?.events || [];
    const totalPages = data.page?.totalPages || 0;

    return { events, totalPages };
  } catch (error) {
    return { events: [], totalPages: 0 };
  }
}
