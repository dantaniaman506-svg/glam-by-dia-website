import { playBridalChime } from "@/lib/bridal-chime";

const HANDOFF_DELAY_MS = 420;
let handoffPending = false;

export function openEmailDraft(url: string): void {
  if (typeof window === "undefined" || handoffPending) {
    return;
  }

  handoffPending = true;
  playBridalChime();
  window.setTimeout(() => {
    handoffPending = false;
    window.location.href = url;
  }, HANDOFF_DELAY_MS);
}
