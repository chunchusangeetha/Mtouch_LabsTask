interface FilterBarProps {
  country: string;
  startDate: string;
  endDate: string;
  onFilterChange: (filters: {
    country: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export default function FilterBar({
  country,
  startDate,
  endDate,
  onFilterChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 justify-center">
      <select
        className="p-2 border rounded"
        value={country}
        onChange={(e) =>
          onFilterChange({ country: e.target.value, startDate, endDate })
        }
      >
        <option value="">All Countries</option>
        <option value="US">United States</option>
        <option value="IN">India</option>
        <option value="GB">United Kingdom</option>
        <option value="AU">Australia</option>
      </select>

      <input
        type="date"
        className="p-2 border rounded"
        value={startDate}
        onChange={(e) =>
          onFilterChange({ country, startDate: e.target.value, endDate })
        }
      />

      <input
        type="date"
        className="p-2 border rounded"
        value={endDate}
        onChange={(e) =>
          onFilterChange({ country, startDate, endDate: e.target.value })
        }
      />
    </div>
  );
}
