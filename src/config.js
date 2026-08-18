const memoryModules = import.meta.glob('./assets/memories/*.{jpg,JPG,jpeg,png}', { eager: true });
const memoryPhotos = Object.values(memoryModules).map(module => module.default);

export const birthdayConfig = {
  motherName: "Siyama",
  birthDate: "1971.08.20",
  music: import.meta.env.BASE_URL + "happy-birthday.mp3",
  personalMessage: `Dear Siyama,

Happy Birthday to the most special person in my life.

I wanted to make something truly unique to celebrate you today. This website is a small reflection of all the beautiful memories we've shared, the endless love you've given me, and the wonderful person you are.

Thank you for your infinite patience, your warm hugs, and for always being my greatest supporter.

May this year bring you as much joy and happiness as you bring to everyone around you.`,
  finalMessage: "My biggest wish is to have you with me for many, many more birthdays. ❤️\nYou deserve the whole universe, Siyama.",
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
