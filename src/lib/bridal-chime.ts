const NOTES_HZ = [587.33, 739.99, 880] as const;
const NOTE_GAP_SECONDS = 0.075;
const NOTE_LENGTH_SECONDS = 0.23;

export function playBridalChime(): void {
  if (typeof window === "undefined" || typeof window.AudioContext === "undefined") {
    return;
  }

  try {
    const audio = new window.AudioContext();
    const master = audio.createGain();
    master.gain.setValueAtTime(0.65, audio.currentTime);
    master.connect(audio.destination);

    if (audio.state === "suspended") {
      void audio.resume().catch(() => undefined);
    }

    NOTES_HZ.forEach((frequency, index) => {
      const startsAt = audio.currentTime + index * NOTE_GAP_SECONDS;
      const endsAt = startsAt + NOTE_LENGTH_SECONDS;
      const oscillator = audio.createOscillator();
      const envelope = audio.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, startsAt);
      envelope.gain.setValueAtTime(0.0001, startsAt);
      envelope.gain.exponentialRampToValueAtTime(0.13, startsAt + 0.015);
      envelope.gain.exponentialRampToValueAtTime(0.0001, endsAt);

      oscillator.connect(envelope);
      envelope.connect(master);
      oscillator.start(startsAt);
      oscillator.stop(endsAt + 0.01);
    });

    window.setTimeout(() => {
      void audio.close().catch(() => undefined);
    }, 520);
  } catch {
    // Audio is an enhancement; the email draft should still open if unavailable.
  }
}
