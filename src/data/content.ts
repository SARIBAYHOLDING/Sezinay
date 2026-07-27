import type { PolaroidPhoto, MemoryLocation, VoiceNote, LoveLetterData, MusicTrack } from '../types';

export const PASSCODE = '170726';
export const RELATIONSHIP_START_DATE = '2026-07-17T00:00:00';

export const BOYFRIEND_NAME = 'SELO';
export const GIRLFRIEND_NAME = 'Sezinay';

export const INITIAL_PHOTOS: PolaroidPhoto[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    caption: 'En Sevdiğim Gül Kokun 🌹',
    date: '17 Temmuz 2026',
    isScratchable: true,
    scratchText: 'Kazı beni Sezinay! ❤️',
    rotation: -4,
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    caption: 'Birlikte İlk Günümüz ✨',
    date: '17 Temmuz 2026',
    isScratchable: true,
    scratchText: 'Scratch me! 🤫',
    rotation: 5,
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    caption: 'Gözlerindeki Gülüş 😍',
    date: 'Unutulmaz An',
    isScratchable: true,
    scratchText: 'Kazı & Gör ✨',
    rotation: -2,
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80',
    caption: 'Benim En Güzel Manzaram 💖',
    date: 'Sonsuza Dek',
    isScratchable: true,
    scratchText: 'Seni Çok Seviyorum 🌹',
    rotation: 6,
  },
];

export const MEMORY_LOCATIONS: MemoryLocation[] = [
  {
    id: 'loc-1',
    title: 'İlk Buluştuğumuz Yer 📍',
    location: 'Gözlerimizin İlk Kesiştiği Nokta',
    date: '17 Temmuz 2026',
    description: 'Kalbimin ilk defa böyle hızlı çarptığı, Sezinay\'ın o güzel tebessümünü gördüğüm an...',
    coordinates: { x: 35, y: 45 },
    icon: 'Heart',
  },
  {
    id: 'loc-2',
    title: 'En Sevdiğimiz Pembe Gül Bahçesi 🌹',
    location: 'Aşkımızın Yeşerdiği Yer',
    date: 'Unutulmaz Bir Gün',
    description: 'En sevdiğin pembe güller arasında el ele yürüdüğümüz ve zamanın durduğu an.',
    coordinates: { x: 62, y: 30 },
    icon: 'Flower2',
  },
  {
    id: 'loc-3',
    title: 'Kahve & Sohbet Mekanımız ☕',
    location: 'Saatlerce Konuştuğumuz Köşe',
    date: 'Her Hafta Sonu',
    description: 'Dünyayı unutup sadece birbirimizi dinlediğimiz, kahvelerimizin soğuduğu ama içimizin ısındığı yer.',
    coordinates: { x: 50, y: 70 },
    icon: 'Coffee',
  },
];

export const VOICE_NOTES: VoiceNote[] = [
  {
    id: 'vn-1',
    title: 'Sezinay\'a Özel Sesli Mesaj 🎙️',
    duration: '0:42',
    date: '17 Temmuz 2026',
    sender: 'SELO',
    transcript: 'İyi ki hayatımdasın Sezinay, pembe güller kadar zarif ve özelsin benim için. Seni her geçen gün daha çok seviyorum...',
  },
];

export const LOVE_LETTER: LoveLetterData = {
  sender: 'SELO',
  recipient: 'Sezinay',
  title: 'Benim Canım Sezinay\'ıma 🌸',
  paragraphs: [
    'Hayatıma girdiğin ilk andan itibaren etrafımdaki her şey daha parlak, daha renkli ve çok daha anlamlı hale geldi.',
    'Senin en sevdiğin pembe güller gibi; zarafetin, güzelliğin ve içini ısıtan gülüşünle her günümü bir bayrama çeviriyorsun. 17 Temmuz 2026 tarihi benim hayatımın en özel dönüm noktası oldu.',
    'Bu siteyi sadece senin için, her detayına emek vererek hazırladım. Seni dünyadaki tüm pembe güllerden daha çok seviyorum güzel sevgilim.',
  ],
  signatureDate: '17.07.2026 - Sonsuza Dek',
};

export const FEATURED_MUSIC: MusicTrack = {
  id: 'track-1',
  title: 'Duygularımızın Şarkısı 🎵',
  artist: 'SELO & Sezinay Özel Playlisting',
  coverUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80',
};
