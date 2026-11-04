import type { BookingInput } from "@/lib/booking.schema";

export type { BookingInput } from "@/lib/booking.schema";

export async function submitBooking(data: BookingInput): Promise<
  | { ok: true }
  | { ok: false; message: string }
> {
  const response = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = (await response.json().catch(() => null)) as
    | { ok?: boolean; message?: string }
    | null;

  if (!response.ok || !result?.ok) {
    return {
      ok: false,
      message: result?.message ?? "We couldn't save your request. Please try again.",
    };
  }

  return { ok: true };
}
