// Verified Quran Dataset with Surahs, Ayahs, Saheeh International English Translations, and Metadata
export const SURAH_LIST = [
  { id: 1, name: "Al-Fatihah", arabic: "الفاتحة", english: "The Opening", verses: 7, type: "Makkah", juz: 1 },
  { id: 2, name: "Al-Baqarah", arabic: "البقرة", english: "The Cow", verses: 286, type: "Madinah", juz: 1 },
  { id: 3, name: "Ali 'Imran", arabic: "آل عمران", english: "Family of Imran", verses: 200, type: "Madinah", juz: 3 },
  { id: 4, name: "An-Nisa", arabic: "النساء", english: "The Women", verses: 176, type: "Madinah", juz: 4 },
  { id: 5, name: "Al-Ma'idah", arabic: "المائدة", english: "The Table Spread", verses: 120, type: "Madinah", juz: 6 },
  { id: 6, name: "Al-An'am", arabic: "الأنعام", english: "The Cattle", verses: 165, type: "Makkah", juz: 7 },
  { id: 7, name: "Al-A'raf", arabic: "الأعراف", english: "The Heights", verses: 206, type: "Makkah", juz: 8 },
  { id: 8, name: "Al-Anfal", arabic: "الأنفال", english: "The Spoils of War", verses: 75, type: "Madinah", juz: 9 },
  { id: 9, name: "At-Tawbah", arabic: "التوبة", english: "The Repentance", verses: 129, type: "Madinah", juz: 10 },
  { id: 10, name: "Yunus", arabic: "يونس", english: "Jonah", verses: 109, type: "Makkah", juz: 11 },
  { id: 12, name: "Yusuf", arabic: "يوسف", english: "Joseph", verses: 111, type: "Makkah", juz: 12 },
  { id: 18, name: "Al-Kahf", arabic: "الكهف", english: "The Cave", verses: 110, type: "Makkah", juz: 15 },
  { id: 19, name: "Maryam", arabic: "مريم", english: "Mary", verses: 98, type: "Makkah", juz: 16 },
  { id: 36, name: "Ya-Sin", arabic: "يس", english: "Ya-Sin", verses: 83, type: "Makkah", juz: 22 },
  { id: 55, name: "Ar-Rahman", arabic: "الرحمن", english: "The Beneficent", verses: 78, type: "Madinah", juz: 27 },
  { id: 56, name: "Al-Waqi'ah", arabic: "الواقعة", english: "The Inevitable", verses: 96, type: "Makkah", juz: 27 },
  { id: 67, name: "Al-Mulk", arabic: "الملك", english: "The Sovereignty", verses: 30, type: "Makkah", juz: 29 },
  { id: 78, name: "An-Naba", arabic: "النبأ", english: "The Tidings", verses: 40, type: "Makkah", juz: 30 },
  { id: 112, name: "Al-Ikhlas", arabic: "الإخلاص", english: "The Sincerity", verses: 4, type: "Makkah", juz: 30 },
  { id: 113, name: "Al-Falaq", arabic: "الفلق", english: "The Daybreak", verses: 5, type: "Makkah", juz: 30 },
  { id: 114, name: "An-Nas", arabic: "الناس", english: "Mankind", verses: 6, type: "Makkah", juz: 30 }
];

export const AUTHENTIC_TRANSLATIONS = [
  { id: "saheeh", name: "Saheeh International", language: "English" },
  { id: "pickthall", name: "M. M. Pickthall", language: "English" },
  { id: "yusufali", name: "Abdullah Yusuf Ali", language: "English" }
];

export const VERIFIED_QURAN_VERSES = [
  // Surah Al-Fatiha
  { surah: 1, surahName: "Al-Fatihah", ayah: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", juz: 1, type: "Makkah" },
  { surah: 1, surahName: "Al-Fatihah", ayah: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "[All] praise is [due] to Allah, Lord of the worlds -", juz: 1, type: "Makkah" },
  { surah: 1, surahName: "Al-Fatihah", ayah: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "The Entirely Merciful, the Especially Merciful,", juz: 1, type: "Makkah" },
  { surah: 1, surahName: "Al-Fatihah", ayah: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", translation: "Sovereign of the Day of Recompense.", juz: 1, type: "Makkah" },
  { surah: 1, surahName: "Al-Fatihah", ayah: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "It is You we worship and You we ask for help.", juz: 1, type: "Makkah" },
  { surah: 1, surahName: "Al-Fatihah", ayah: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Guide us to the straight path -", juz: 1, type: "Makkah" },
  { surah: 1, surahName: "Al-Fatihah", ayah: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.", juz: 1, type: "Makkah" },

  // Surah Al-Mulk excerpts
  { surah: 67, surahName: "Al-Mulk", ayah: 1, arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", translation: "Blessed is He in whose hand is dominion, and He is over all things competent -", juz: 29, type: "Makkah" },
  { surah: 67, surahName: "Al-Mulk", ayah: 2, arabic: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا وَهُوَ الْعَزِيزُ الْغَفُورُ", translation: "[He] who created death and life to test you as to which of you is best in deed - and He is the Exalted in Might, the Forgiving -", juz: 29, type: "Makkah" },
  { surah: 67, surahName: "Al-Mulk", ayah: 3, arabic: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا", translation: "[He] who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency.", juz: 29, type: "Makkah" },

  // Surah Al-Ikhlas
  { surah: 112, surahName: "Al-Ikhlas", ayah: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Say, 'He is Allah, [who is] One,", juz: 30, type: "Makkah" },
  { surah: 112, surahName: "Al-Ikhlas", ayah: 2, arabic: "اللَّهُ الصَّمَدُ", translation: "Allah, the Eternal Refuge.", juz: 30, type: "Makkah" },
  { surah: 112, surahName: "Al-Ikhlas", ayah: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "He neither begets nor is born,", juz: 30, type: "Makkah" },
  { surah: 112, surahName: "Al-Ikhlas", ayah: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", translation: "Nor is there to Him any equivalent.'", juz: 30, type: "Makkah" },

  // Surah Al-Falaq
  { surah: 113, surahName: "Al-Falaq", ayah: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", translation: "Say, 'I seek refuge in the Lord of daybreak", juz: 30, type: "Makkah" },
  { surah: 113, surahName: "Al-Falaq", ayah: 2, arabic: "مِن شَرِّ مَا خَلَقَ", translation: "From the evil of that which He created", juz: 30, type: "Makkah" },
  { surah: 113, surahName: "Al-Falaq", ayah: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", translation: "And from the evil of darkness when it settles", juz: 30, type: "Makkah" },

  // Surah An-Nas
  { surah: 114, surahName: "An-Nas", ayah: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", translation: "Say, 'I seek refuge in the Lord of mankind,", juz: 30, type: "Makkah" },
  { surah: 114, surahName: "An-Nas", ayah: 2, arabic: "مَلِكِ النَّاسِ", translation: "The Sovereign of mankind.", juz: 30, type: "Makkah" },
  { surah: 114, surahName: "An-Nas", ayah: 3, arabic: "إِلَٰهِ النَّاسِ", translation: "The God of mankind,", juz: 30, type: "Makkah" }
];
