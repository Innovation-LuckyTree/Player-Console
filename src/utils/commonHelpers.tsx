/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";

// Custom validator to check age
export const validateAge = (_: any, value: any) => {
    if (!value) {
        return Promise.reject("Please select your date of birth!");
    }

    const today = dayjs();
    const age = today.diff(value, "year");

    if (age < 21) {
        return Promise.reject("You must be at least 21 years old.");
    }

    return Promise.resolve();
};

// Output: 2025-06-16
export function formatDateToYMD(dateStr: string | null | undefined): string {
  if (!dateStr) return ""; // return empty string if input is null/undefined/empty
  const date = dayjs(dateStr);
  return date.isValid() ? date.format("YYYY-MM-DD") : "";
}

// Output: "2025-06-16 18:42:18"
export function formatDateTime(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const date = dayjs(dateStr);
  return date.isValid() ? date.format("YYYY-MM-DD HH:mm:ss") : "";
}