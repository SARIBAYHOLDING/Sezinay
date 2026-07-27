import type { PolaroidPhoto, MemoryLocation, VoiceNote, LoveLetterData, MusicTrack } from '../types';

export const PASSCODE = '170726';
export const RELATIONSHIP_START_DATE = '2026-07-17T00:00:00';

export const BOYFRIEND_NAME = 'SELO';
export const GIRLFRIEND_NAME = 'Sezinay';

export const INITIAL_PHOTOS: PolaroidPhoto[] = [
  {
    id: 'photo-1',
    url: '/photos/photo1.jpg',
    caption: 'Tatlı Gülüşün & Ben 💋',
    date: '17 Temmuz 2026',
    isScratchable: true,
    scratchText: 'Kazı beni Sezinay! ❤️',
    rotation: 0,
  },
  {
    id: 'photo-2',
    url: '/photos/photo2.jpg',
    caption: 'Öpücük Yağmuru 😘',
    date: 'Unutulmaz An',
    isScratchable: true,
    scratchText: 'Sürpriz Öpücük 💋',
    rotation: 0,
  },
  {
    id: 'photo-6',
    url: '/photos/photo6.jpg',
    caption: 'İlk Kahvelerimiz (Selo & Ada) ☕',
    date: '17 Temmuz 2026',
    isScratchable: true,
    scratchText: 'İlk Kahve Anımız ☕',
    rotation: 0,
  },
  {
    id: 'photo-3',
    url: '/photos/photo3.jpg',
    caption: 'AVM Gezimiz & Karizmamız ✨',
    date: 'En Neşeli Günümüz',
    isScratchable: true,
    scratchText: 'Kazı & Gör 🤫',
    rotation: 0,
  },
  {
    id: 'photo-4',
    url: '/photos/photo4.jpg',
    caption: 'Poz Vermek Bizim İşimiz ✌️',
    date: 'Aşk Dolu Bir Gün',
    isScratchable: true,
    scratchText: 'Seni Çok Seviyorum 🌸',
    rotation: 0,
  },
  {
    id: 'photo-5',
    url: '/photos/photo5.jpg',
    caption: 'En Komik & Tatlı Halimiz 🥸',
    date: 'Gülmekten Öldüğümüz An',
    isScratchable: true,
    scratchText: 'Bıyıklı Sevgililer 🤣',
    rotation: 0,
  },
];

export const MEMORY_LOCATIONS: MemoryLocation[] = [
  {
    id: 'loc-1',
    title: 'İlk Buluştuğumuz Kafe ☕📍',
    location: 'Gözlerimizin İlk Kesiştiği Yer',
    date: '17 Temmuz 2026',
    description: 'Kalbimin ilk defa böyle hızlı çarptığı, "Selo" ve "Ada" yazılı kahvelerimizi içtiğimiz o unutulmaz kafe buluşmamız...',
    coordinates: { x: 35, y: 45 },
    icon: 'Coffee',
    photoUrl: '/photos/photo6.jpg',
    mapUrl: 'https://share.google/M8Qf7w10qxOyMfwM1',
  },
  {
    id: 'loc-2',
    title: 'Gittiğimiz Forum AVM 🛍️',
    location: 'Forum Alışveriş Merkezi',
    date: 'Unutulmaz Günlerimiz',
    description: 'El ele gezdiğimiz, mağazalara girip komik pozlar verdiğimiz ve anı biriktirdiğimiz yer.',
    coordinates: { x: 65, y: 32 },
    icon: 'Flower2',
    photoUrl: '/photos/photo3.jpg',
    mapUrl: 'https://share.google/pDH3AMon5yyEffLL8',
  },
  {
    id: 'loc-3',
    title: 'Öpücük & Gülme Krizlerimiz 💋',
    location: 'Saatlerce Konuştuğumuz Köşe',
    date: 'Her Anımızda',
    description: 'Dünyayı unutup sadece birbirimizi dinlediğimiz, kahkahalarımızın hiç eksilmediği özel anlar.',
    coordinates: { x: 50, y: 70 },
    icon: 'Heart',
    photoUrl: '/photos/photo2.jpg',
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
  coverUrl: '/photos/spotify_blend.jpg',
};
