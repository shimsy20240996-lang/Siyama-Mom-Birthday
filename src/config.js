const memoryModules = import.meta.glob('./assets/memories/*.{jpg,JPG,jpeg,png}', { eager: true });
const memoryPhotos = Object.values(memoryModules).map(module => module.default);

export const hameedFamilyConfig = {
  familyName: "Hameed Family",
  birthdayPerson: "Siyama",
  birthDate: "1971.08.20",
  music: import.meta.env.BASE_URL + "birthday-song.mp3",
  familyLetter: `Dear Siyama,

Today, we celebrate more than just your birthday.

We celebrate the love, warmth, strength, and kindness that you have brought into our family.

You have been there through every chapter, every celebration, every difficult moment, and every beautiful memory.

Our family is what it is because of the love you have given us.

Today, we simply want you to know how deeply loved and appreciated you are.

You are not just part of our family.

You are at the heart of it.

With all our love,

**The Hameed Family ❤️**`,
  
  familyMessages: [
    {
      name: "Family Member",
      relationship: "Son/Daughter",
      message: "Happy Birthday, Siyama. Thank you for being the heart of our family. We love you always."
    },
    {
      name: "Another Family Member",
      relationship: "Loved One",
      message: "Wishing you a day as beautiful and special as you are to all of us."
    },
    {
      name: "Someone Special",
      relationship: "Loved One",
      message: "Your warmth and kindness guide us every single day. Happy Birthday!"
    }
  ],
  
  timeline: [
    { period: "Then", description: "Where our family story began..." },
    { period: "The Years", description: "Growing together, one memory at a time." },
    { period: "Today", description: "Still together. Still making memories." },
    { period: "Always", description: "Because family is forever." }
  ],

  familyVoiceWishes: [
    { name: "Vappa", relationship: "Wife", wish: "Happy birthday, my dear wife. May Allah bless you with many more beautiful years.", voice: "male-warm" },
    { name: "Peryapp", relationship: "Maini", wish: "Happy birthday, my dear Maini.", voice: "male-deep" },
    { name: "Peryamma", relationship: "Thankachi", wish: "Happy birthday, my dear Thankachi.", voice: "female-warm" },
    { name: "Hilmy Mama", relationship: "Thatha", wish: "Happy birthday, my dear Thatha.", voice: "male-warm" },
    { name: "Hismy Mama", relationship: "Thatha", wish: "Happy birthday, my dear Thatha.", voice: "male-warm" },
    { name: "Rasmy Mama", relationship: "Thatha", wish: "Happy birthday, my dear Thatha.", voice: "male-warm" },
    { name: "Rifaya Mami", relationship: "Maini", wish: "Happy birthday, my dear Maini.", voice: "female-warm" },
    { name: "Rihanna Mami", relationship: "Maini", wish: "Happy birthday, my dear Maini.", voice: "female-warm" },
    { name: "Rinosa Mami", relationship: "Maini", wish: "Happy birthday, my dear Maini.", voice: "female-warm" },
    { name: "Sanath Bro", relationship: "Sachimma", wish: "Happy birthday, my dear Sachimma.", voice: "male-young" },
    { name: "Atheeba Maini", relationship: "Mami", wish: "Happy birthday, my dear Mami.", voice: "female-young" },
    { name: "Rees Bro", relationship: "Umma", wish: "Happy birthday, my dear Umma.", voice: "male-young" },
    { name: "Nibal Maini", relationship: "Mami", wish: "Happy birthday, my dear Mami.", voice: "female-young" },
    { name: "Has Bro", relationship: "Sachimma", wish: "Happy birthday, my dear Sachimma.", voice: "male-young" },
    { name: "Shim Bro", relationship: "Umma", wish: "Happy birthday, my dear Umma.", voice: "male-young" },
    { name: "Asky", relationship: "Sachimma", wish: "Happy birthday, my dear Sachimma.", voice: "male-young" },
    { name: "Hefad", relationship: "Mami", wish: "Happy birthday, my dear Mami.", voice: "male-young" },
    { name: "Hamdhan", relationship: "Mami", wish: "Happy birthday, my dear Mami.", voice: "male-young" },
    { name: "Sara", relationship: "Mami", wish: "Happy birthday, my dear Mami.", voice: "female-young" },
    { name: "Reesath", relationship: "Mami", wish: "Happy birthday, my dear Mami.", voice: "male-young" },
    { name: "Hudhaif", relationship: "Mami", wish: "Happy birthday, my dear Mami.", voice: "male-young" },
    { name: "Aysha", relationship: "Mami", wish: "Happy birthday, my dear Mami.", voice: "female-young" },
    { name: "Saadh", relationship: "Mami", wish: "Happy birthday, my dear Mami.", voice: "male-young" },
    { name: "Rasmiya", relationship: "Mami", wish: "", voice: "female-young", status: "loading" }
  ],

  youAre: [
    "Our strength.",
    "Our comfort.",
    "Our guide.",
    "Our happiness.",
    "Our home.",
    "Our heart."
  ],

  familyMembers: [
    { name: "Siyama", role: "The Heart of the Family ❤️", position: "center" },
    { name: "Member 1", role: "Son", position: "top-left" },
    { name: "Member 2", role: "Daughter", position: "top-right" },
    { name: "Member 3", role: "Loved One", position: "bottom-left" },
    { name: "Member 4", role: "Loved One", position: "bottom-right" }
  ],

  finalMessage: "My biggest wish is to have you with me for many, many more birthdays. ❤️\nYou deserve the whole universe, Siyama.",
  
  photos: memoryPhotos.map((url, index) => ({
    url: url,
    caption: [
      "Our favorite memory ❤️",
      "Always a beautiful moment.",
      "Forever grateful for this.",
      "Your beautiful smile 😊",
      "A day to remember ✨",
      "So much love 🤍",
      "Cherished moments ❤️",
      "Beautiful times together ✨"
    ][index % 8]
  }))
};
