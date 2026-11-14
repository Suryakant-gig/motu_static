import confetti from 'canvas-confetti';

export function fireHeartConfetti() {
  const count = 40;
  const defaults = {
    origin: { y: 0.65 },
    zIndex: 9999,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Soft pastel romantic color palette
  const romanticColors = ['#EFA2BB', '#F8C8D8', '#E8E0FF', '#FFF9EF', '#FF6B8B', '#FFD1DC'];

  fire(0.25, {
    spread: 30,
    startVelocity: 45,
    colors: romanticColors,
    shapes: ['circle'],
  });

  fire(0.2, {
    spread: 60,
    colors: romanticColors,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.2,
    colors: romanticColors,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: romanticColors,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: romanticColors,
  });
}

export function fireContinuousCelebration() {
  const end = Date.now() + 3.5 * 1000;
  const colors = ['#EFA2BB', '#F8C8D8', '#E8E0FF', '#FF6B8B', '#FFF9EF'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

