type SuccessChime = {
  play: () => void;
  cancel: () => void;
};

export function prepareSuccessChime(): SuccessChime {
  if (typeof window === "undefined" || !window.AudioContext) {
    return { play: () => undefined, cancel: () => undefined };
  }

  let context: AudioContext;
  try {
    context = new AudioContext();
  } catch {
    return { play: () => undefined, cancel: () => undefined };
  }

  const ready =
    context.state === "suspended" ? context.resume().catch(() => undefined) : Promise.resolve();
  let played = false;

  return {
    play() {
      if (played) return;
      played = true;
      void ready.then(() => {
        if (context.state !== "running") {
          void context.close().catch(() => undefined);
          return;
        }

        const start = context.currentTime;
        [659.25, 880].forEach((frequency, index) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const noteStart = start + index * 0.14;

          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(frequency, noteStart);
          gain.gain.setValueAtTime(0.0001, noteStart);
          gain.gain.exponentialRampToValueAtTime(0.055, noteStart + 0.035);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.42);
          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.start(noteStart);
          oscillator.stop(noteStart + 0.44);
        });

        window.setTimeout(() => {
          void context.close().catch(() => undefined);
        }, 800);
      });
    },
    cancel() {
      if (!played) void context.close().catch(() => undefined);
    },
  };
}
