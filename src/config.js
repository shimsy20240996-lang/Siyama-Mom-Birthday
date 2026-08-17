const memoryModules = import.meta.glob('./assets/memories/*.{jpg,JPG,jpeg,png}', { eager: true });
const memoryPhotos = Object.values(memoryModules).map(module => module.default);

export const birthdayConfig = {
  motherName: "Mom",
  birthDate: "1971.08.20",
  personalMessage: `Dear Mom,

Happy Birthday to the most special person in my life.

Thank you for every sacrifice, every prayer, every smile, every lesson, and every moment you've been there for me.

No words will ever be enough to explain how much you mean to me.

I may grow older, but I'll always be your child.

I love you, Mom. ❤️`,
  finalMessage: "My biggest wish is to have you with me for many, many more birthdays. ❤️\nYou deserve the whole universe, Mom.",
  photos: memoryPhotos.map((url, index) => ({
    url: url,
    caption: [
      "One of my favorite memories ❤️",
      "Always a beautiful moment.",
      "Forever grateful for this.",
      "Your beautiful smile 😊",
      "A day to remember ✨",
      "So much love 🤍",
      "Cherished moments ❤️",
      "Beautiful times together ✨"
    ][index % 8] // Cycle through captions
  })),
  reasons: [
    {
      title: "Your Kindness 🌷",
      description: "You always care about everyone around you."
    },
    {
      title: "Your Strength ✨",
      description: "You've taught me what it means to stay strong."
    },
    {
      title: "Your Sacrifices 🤍",
      description: "You've given so much without ever asking for anything in return."
    },
    {
      title: "Your Smile 😊",
      description: "Somehow, your smile can make everything feel better."
    },
    {
      title: "Your Love ❤️",
      description: "Your love has always been my safest place."
    },
    {
      title: "Your Support 🌟",
      description: "You've always believed in me."
    }
  ],
  music: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_24a2bbec09.mp3?filename=cinematic-time-lapse-115672.mp3" // Placeholder audio
};
