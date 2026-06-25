"use client";

export type DateAvailableValue = {
  date: string;
  time?: string;
};

type DateAvailableProps = {
  value: DateAvailableValue;
  onChange: (value: DateAvailableValue) => void;
  showTime?: boolean;
  minDate?: string;
  maxDate?: string;
  dateLabel?: string;
  timeLabel?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

const inputClassName =
  "w-full rounded-md border-2 border-gray-200 p-3 transition-colors focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

const DateAvailable = ({
  value,
  onChange,
  showTime = false,
  minDate,
  maxDate,
  dateLabel = "Date",
  timeLabel = "Time",
  className = "",
  disabled = false,
  required = false,
}: DateAvailableProps) => {
  const handleDateChange = (date: string) => {
    onChange({ ...value, date });
  };

  const handleTimeChange = (time: string) => {
    onChange({ ...value, time: time || undefined });
  };

  return (
    <div className={`flex w-full flex-col md:flex-row gap-4 ${className}`}>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">{dateLabel}</span>
        <input
          type="date"
          value={value.date}
          onChange={(event) => handleDateChange(event.target.value)}
          min={minDate}
          max={maxDate}
          disabled={disabled}
          required={required}
          className={inputClassName}
        />
      </label>

      {showTime && (
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">{timeLabel}</span>
          <input
            type="time"
            value={value.time ?? ""}
            onChange={(event) => handleTimeChange(event.target.value)}
            disabled={disabled}
            className={inputClassName}
          />
        </label>
      )}
    </div>
  );
};

export default DateAvailable;
