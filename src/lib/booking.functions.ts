import type { BookingInput } from "@/lib/booking.schema";

export type { BookingInput } from "@/lib/booking.schema";

type BookingResult =
  { ok: true; emailSent: boolean; message?: string } | { ok: false; message: string };

export async function submitBooking(data: BookingInput): Promise<BookingResult> {
  const apiBase = (import.meta.env["VITE_BOOKING_API_BASE_URL"] as string | undefined)?.replace(
    /\/+$/,
    "",
  );
  const endpoint = `${apiBase ?? ""}/api/booking`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    return {
      ok: false,
      message: "We couldn't reach the booking service. Please try again or call Dia.",
    };
  }

  const result = (await response.json().catch(() => null)) as {
    ok?: boolean;
    emailSent?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !result?.ok) {
    return {
      ok: false,
      message: result?.message ?? "We couldn't save your request. Please try again or call Dia.",
    };
  }

  return {
    ok: true,
    emailSent: result.emailSent === true,
    ...(result.message ? { message: result.message } : {}),
  };
}
