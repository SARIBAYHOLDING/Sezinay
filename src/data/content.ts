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
  {
    id: 'photo-7',
    url: '/photos/photo7.jpg',
    caption: 'Sahil Parkında Sarılmamız 🌴❤️',
    date: 'Huzur Dolu Sahil Anı',
    isScratchable: true,
    scratchText: 'Sarılmak Sana Çok Yakışıyor 💋',
    rotation: 0,
  },
  {
    id: 'photo-8',
    url: '/photos/photo8.jpg',
    caption: 'Polaroidlerimiz & Kırmızı Balonumuz 🎈✨',
    date: 'Aşk Dolu Kareler',
    isScratchable: true,
    scratchText: 'Kalbim Balon Gibi Uçuyor 🎈',
    rotation: 0,
  },
  {
    id: 'photo-9',
    url: '/photos/photo9.jpg',
    caption: 'Kitabevi Önünde Sımsıkı Kucaklaşma 📚💖',
    date: 'En Sıcak Sarılışımız',
    isScratchable: true,
    scratchText: 'Sımsıkı Kucağım Senindir 🌹',
    rotation: 0,
  },
  {
    id: 'photo-10',
    url: '/photos/photo10.jpg',
    caption: 'FaceTime ile Birlikte Ders Çalışmamız 🎧✏️',
    date: 'Gece Mesaisi & Aşk',
    isScratchable: true,
    scratchText: 'Her Anım Senle Güzel ✍️',
    rotation: 0,
  },
  {
    id: 'photo-11',
    url: '/photos/photo11.jpg',
    caption: 'Kuzulu Sevgilim & Görüntülü Ders Gecemiz 🐑💚',
    date: 'Gece Sohbetlerimiz',
    isScratchable: true,
    scratchText: 'Kuzulu Prensesim Sezinay 🐑',
    rotation: 0,
  },
];

export const MEMORY_LOCATIONS: MemoryLocation[] = [
  {
    id: 'loc-1',
    title: 'İlk Buluştuğumuz Kafe ☕📍',
    location: 'Kushimoto Sokağı EspressoLab',
    date: '17 Temmuz 2026',
    description: 'Kushimoto Sokağı\'ndaki EspressoLab\'da içtiğimiz o harika kahvelerin tadı hâlâ damağımda... Kalbimin ilk defa böyle hızlı çarptığı, "Selo" ve "Ada" yazılı bardağımızla başlayan unutulmaz buluşmamız ❤️',
    coordinates: { x: 25, y: 45 },
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
    coordinates: { x: 75, y: 28 },
    icon: 'Flower2',
    photoUrl: '/photos/photo3.jpg',
    mapUrl: 'https://share.google/pDH3AMon5yyEffLL8',
  },
  {
    id: 'loc-3',
    title: 'Sahil Parkı & Palmiyeler 🌴',
    location: 'Palmiyeli Sahil Yolu',
    date: 'Aşk Dolu Bir Akşamüstü',
    description: 'Deniz esintisinde çimlerin üstüne oturup çeneni tutup seni öptüğüm ve sarıldığım o harika gün.',
    coordinates: { x: 38, y: 72 },
    icon: 'Heart',
    photoUrl: '/photos/photo7.jpg',
  },
  {
    id: 'loc-4',
    title: 'Öyküm Kitabevi Önü 📚',
    location: 'Kitabevi Sokağı',
    date: 'En Neşeli Kucaklaşma',
    description: 'Sokakta yürürken durup sana sımsıkı sarıldığım, kahkahalarımızın caddede çınladığı en tatlı anımız.',
    coordinates: { x: 62, y: 65 },
    icon: 'Heart',
    photoUrl: '/photos/photo9.jpg',
  },
  {
    id: 'loc-5',
    title: 'FaceTime & Gece Ders Çalışması 🎧',
    location: 'Online Kalp Bağı',
    date: 'Görüntülü Aramalarımız',
    description: 'Kulaklıkları takıp ekranda birbirimizin gözlerine bakarak ders çalıştığımız, saatlerin su gibi aktığı geceler.',
    coordinates: { x: 45, y: 35 },
    icon: 'Coffee',
    photoUrl: '/photos/photo10.jpg',
  },
  {
    id: 'loc-6',
    title: 'Kuzulu Sezinay & Gece Konuşmaları 🐑💚',
    location: 'Tatlı Gece Seansları',
    date: 'Sarı Stor Perde Akşamı',
    description: 'Kuzu oyuncağına sarılıp bana o tatlı bakışlarını attığın, dünyadaki en tatlı görüntülü konuşmamız.',
    coordinates: { x: 58, y: 48 },
    icon: 'Heart',
    photoUrl: '/photos/photo11.jpg',
  },
];

export const VOICE_NOTES: VoiceNote[] = [
  {
    id: 'vn-1',
    title: 'Sezinay\'a Özel Sesli Mesaj 🎙️',
    duration: '0:42',
    date: '17 Temmuz 2026',
    sender: 'SELO',
    transcript: 'İyi ki hayatımdasın Sezinay, güller kadar özelsin benim için. Seni her geçen gün daha çok seviyorum...',
  },
];

export const LOVE_LETTER: LoveLetterData = {
  sender: 'SELO',
  recipient: 'Sezinay',
  title: 'Benim Canım Sezinay\'ıma 🌸',
  paragraphs: [
    'Hayatıma girdiğin ilk andan itibaren etrafımdaki her şey daha parlak, daha renkli ve çok daha anlamlı hale geldi.',
    'Senin en sevdiğin güller gibi; güzelliğin ve içini ısıtan gülüşünle her günümü bir bayrama çeviriyorsun. 17 Temmuz 2026 tarihi benim hayatımın en özel dönüm noktası oldu.',
    'Bu siteyi sadece senin için, her detayına emek vererek hazırladım. Seni dünyadaki tüm güllerden daha çok seviyorum güzel sevgilim.',
  ],
  signatureDate: '17.07.2026 - Sonsuza Dek',
};

export const FEATURED_MUSIC: MusicTrack = {
  id: 'track-1',
  title: 'Duygularımızın Şarkısı 🎵',
  artist: 'SELO & Sezinay Özel Playlisting',
  coverUrl: '/photos/spotify_blend.jpg',
};

