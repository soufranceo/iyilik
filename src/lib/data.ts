import { Deed } from "./types";

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sampleDeeds: Deed[] = [
  {
    id: crypto.randomUUID(),
    numericId: 1,
    title: "Yavru Kedilere Yuva",
    description: "Sokakta bulduğum 3 yavru kediyi veterinere götürdüm, tedavilerini yaptırdım ve güvenilir ailelere sahiplendirdim.",
    author: "Ayşe Yılmaz",
    isAnonymous: false,
    date: "2024-03-20",
    time: "14:30",
    location: "İstanbul/Kadıköy",
    category: "hayvanlar",
    likes: getRandomNumber(150, 1500),
    dislikes: getRandomNumber(50, 150),
    image: "https://images.unsplash.com/photo-1570018144715-43110363d70a?q=80&w=1000",
    slug: "yavru-kedilere-yuva"
  },
  {
    id: crypto.randomUUID(),
    numericId: 2,
    title: "Sokak Köpeklerine Kulübe",
    description: "Mahalledeki sokak köpekleri için 5 adet yalıtımlı kulübe yaptım ve yerleştirdim.",
    author: "Mehmet Demir",
    isAnonymous: false,
    date: "2024-03-19",
    time: "09:15",
    location: "Ankara/Çankaya",
    category: "hayvanlar",
    likes: getRandomNumber(150, 1500),
    dislikes: getRandomNumber(50, 150),
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000",
    slug: "sokak-kopeklerine-kulube"
  },
  {
    id: crypto.randomUUID(),
    numericId: 3,
    title: "Kuşlar İçin Su Kapları",
    description: "Parkta ve bahçemde kuşlar için su kapları yerleştirdim, düzenli olarak temiz su koyuyorum.",
    author: "Zeynep Kaya",
    isAnonymous: false,
    date: "2024-03-18",
    time: "16:45",
    location: "İzmir/Karşıyaka",
    category: "hayvanlar",
    likes: getRandomNumber(150, 1500),
    dislikes: getRandomNumber(50, 150),
    slug: "kuslar-icin-su-kaplari"
  },
  {
    id: crypto.randomUUID(),
    numericId: 35,
    title: "Kedi Kısırlaştırma Projesi",
    description: "Mahallemizdeki 10 sokak kedisinin kısırlaştırma operasyonlarını üstlendim ve takiplerini yapıyorum.",
    author: "Canan Yıldız",
    isAnonymous: false,
    date: "2024-02-15",
    time: "09:00",
    location: "İstanbul/Beşiktaş",
    category: "hayvanlar",
    likes: getRandomNumber(150, 1500),
    dislikes: getRandomNumber(50, 150),
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000",
    slug: "kedi-kisirlatirma-projesi"
  }
];