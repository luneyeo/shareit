import type { MyGroupSummary } from "@/shared/api/group/types";
import type { ProductListItem } from "@/shared/api/product/getGroupProducts";

export const DEMO_GROUPS: MyGroupSummary[] = [
  { id: "demo-group-1", name: "우리 가족 위시리스트", role: "owner", memberCount: 3 },
  { id: "demo-group-2", name: "친구들 공유템", role: "member", memberCount: 5 },
];

/** 목록 카드 + 상세 화면 모두에 쓰이는 데모 상품 타입 */
export type DemoProduct = ProductListItem & {
  category: string | null;
  brandName: string | null;
  description: string | null;
  store: string | null;
  recommender: string;
};

const GROUP1_PRODUCTS: DemoProduct[] = [
  {
    id: "d1-p1",
    prdName: "삼바 OG",
    brandName: "adidas",
    price: 139000,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/7c748287-e586-48ea-8b8e-8fa93315d3a5.avif",
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/5888828_17683565822395_big.webp",
    ],
    tag: ["스니커즈", "데일리"],
    userId: "demo-user-b",
    category: "패션",
    description:
      "유행 타지 않는 디자인이라 오래 신어도 질리지 않아요. 사이즈는 반 치수 크게 추천해요.",
    store: "아디다스 공식몰",
    recommender: "민준",
  },
  {
    id: "d1-p2",
    prdName: "베이직 울 카디건",
    brandName: "LEMAIRE",
    price: 189000,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/3665191_17908321839332_big.webp",
    ],
    tag: ["데일리", "오버핏"],
    userId: "demo-user-a",
    category: "패션",
    description:
      "어떤 옷에도 자연스럽게 어울리는 카디건이에요. 소재가 너무 좋아서 세탁 후에도 형태가 잘 유지돼요.",
    store: "무신사",
    recommender: "수진",
  },
  {
    id: "d1-p3",
    prdName: "시카플라스트 밤 B5",
    brandName: "La Roche-Posay",
    price: 36900,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/A00000017431608ko.webp",
    ],
    tag: ["수분", "트러블"],
    userId: "demo-user-a",
    category: "뷰티",
    description:
      "피부 장벽 약한 분들께 강추해요. 자극 없이 빠르게 진정되고, 피부과에서도 추천받은 제품이에요.",
    store: "올리브영",
    recommender: "수진",
  },
  {
    id: "d1-p4",
    prdName: "레티놀 선크림 SPF50+",
    brandName: "innisfree",
    price: 15900,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/70f6c24b-fed0-4a27-97ce-b87163fe3135.jpg",
    ],
    tag: ["선케어", "수분"],
    userId: "demo-user-c",
    category: "뷰티",
    description: "발림성이 좋고 백탁 현상이 없어서 매일 쓰고 있어요. 가격 대비 성능이 너무 좋아요.",
    store: "이니스프리 직영몰",
    recommender: "지현",
  },
  {
    id: "d1-p5",
    prdName: "에어프라이어 HD9252",
    brandName: "Philips",
    price: 89000,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/vrs_e1fbf52a_894e_4461_bd94ea6ba53fd118.avif",
    ],
    tag: ["주방가전", "에어프라이어"],
    userId: "demo-user-b",
    category: "홈/인테리어",
    description: "용량이 적당하고 소음이 거의 없어요. 치킨, 감자튀김 모두 잘 돼요. 세척도 편해요.",
    store: "쿠팡",
    recommender: "민준",
  },
  {
    id: "d1-p6",
    prdName: "에어랩 멀티스타일러",
    brandName: "Dyson",
    price: 659000,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/2064245142L.jpg",
    ],
    tag: ["헤어스타일링", "드라이어"],
    userId: "demo-user-a",
    category: "뷰티",
    description:
      "비싸지만 그 값 하는 제품이에요. 열 손상 없이 볼륨 살아있는 머리결을 만들 수 있어요.",
    store: "다이슨 공식몰",
    recommender: "수진",
  },
  {
    id: "d1-p7",
    prdName: "싱글 오리진 원두 500g",
    brandName: "Blue Bottle",
    price: 32000,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/479b18141e8b9cb60ca0a91a82e784c1.jpg",
    ],
    tag: ["커피", "핸드드립"],
    userId: "demo-user-c",
    category: "음식/카페",
    description:
      "산미가 살아있고 과일 향이 나요. 핸드드립으로 내리면 훨씬 맛있어요. 선물용으로도 좋아요.",
    store: "블루보틀 성수점",
    recommender: "지현",
  },
  {
    id: "d1-p8",
    prdName: "2024 썸머 에디션 텀블러",
    brandName: "Starbucks",
    price: 29000,
    imageUrl: null,
    tag: ["텀블러", "한정판"],
    userId: "demo-user-b",
    category: "음식/카페",
    description:
      "한정판이라 구하기 어렵지만 디자인이 예쁘고 보온도 잘 돼요. 매장에서 직접 구매해야 해요.",
    store: "스타벅스 직영점",
    recommender: "민준",
  },
];

const GROUP2_PRODUCTS: DemoProduct[] = [
  {
    id: "d2-p1",
    prdName: "덩크 로우 판다",
    brandName: "Nike",
    price: 129000,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/0900e479d5a15e7e02b128185e4f7381.jpg",
    ],
    tag: ["스니커즈", "화이트"],
    userId: "demo-user-d",
    category: "패션",
    description:
      "야 이거 진짜 뭐든 다 어울림ㅋㅋ 화이트블랙이라 코디 걱정 없어. 발볼 좁으니까 꼭 반 치수 크게 사!",
    store: "나이키 공식몰",
    recommender: "태양",
  },
  {
    id: "d2-p2",
    prdName: "플리스 풀집업",
    brandName: "UNIQLO",
    price: 49900,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/167118e1f39821ee60ec436f52382989.jpg",
    ],
    tag: ["겨울", "캐주얼"],
    userId: "demo-user-e",
    category: "패션",
    description:
      "나 이거 사고 완전 후회 없음 👍 겨울 내내 입을 수 있고 색도 많아서 두 개 살 뻔 했잖아ㅋㅋ",
    store: "유니클로 명동점",
    recommender: "유리",
  },
  {
    id: "d2-p3",
    prdName: "오일 그린티 로션",
    brandName: "이니스프리",
    price: 28000,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/images.jpeg",
    ],
    tag: ["수분", "그린티"],
    userId: "demo-user-d",
    category: "뷰티",
    description:
      "민낯에 바르기 딱 좋아 🌿 끈적임 없이 쏙 흡수되고 그린티 향이 너무 좋음. 올영 가면 꼭 사봐",
    store: "올리브영",
    recommender: "태양",
  },
  {
    id: "d2-p4",
    prdName: "알티지 오메가3",
    brandName: "Nutriday",
    price: 24900,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/A00000014672614ko.webp",
    ],
    tag: ["영양제", "건강"],
    userId: "demo-user-f",
    category: "웰니스/헬스",
    description:
      "오메가3 먹어야 한다고 맨날 미루다가 이거 추천받고 드디어 시작함ㅎㅎ 비린내 없어서 진짜 꾸준히 먹게 되더라",
    store: "iHerb",
    recommender: "성훈",
  },
  {
    id: "d2-p5",
    prdName: "웨이 프로틴 초코맛 1kg",
    brandName: "Dr. Benefit",
    price: 59000,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/2181f4e20ba13c0a3f5e97af843774c9dbc22408ee417fee830169cd762d_1782885931996.jpg",
    ],
    tag: ["운동", "단백질"],
    userId: "demo-user-e",
    category: "웰니스/헬스",
    description:
      "헬스 시작하고 이것저것 먹어봤는데 여기서 제일 맛있음 진심ㅋㅋ 초코맛인데 너무 달지 않고 딱 좋아",
    store: "쿠팡",
    recommender: "유리",
  },
  {
    id: "d2-p6",
    prdName: "초음파 아로마 가습기",
    brandName: "MUJI",
    price: 55000,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/c4d4f8274d2be55d8992640d4b460ceb.jpg",
    ],
    tag: ["인테리어", "가습기"],
    userId: "demo-user-d",
    category: "홈/인테리어",
    description:
      "자면서도 틀어놔도 될 정도로 완전 조용함 🤫 인테리어에도 잘 어울리고 향 넣으면 집 분위기 달라짐",
    store: "무지 홍대점",
    recommender: "태양",
  },
  {
    id: "d2-p7",
    prdName: "XT-6 GTX 트레킹화",
    brandName: "Salomon",
    price: 219000,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/L45566600_0_GHO_XT-6GTXKOREA_Cloudburst-FtwSilver-DarkGullGray_1024x1024.webp",
    ],
    tag: ["트레킹", "고프코어"],
    userId: "demo-user-f",
    category: "패션",
    description:
      "지난 주 북한산 갔을 때 신고 갔는데 발 하나도 안 아팠음 😮 비 와도 끄떡없고 가벼워서 완전 추천",
    store: "살로몬 공식몰",
    recommender: "성훈",
  },
  {
    id: "d2-p8",
    prdName: "BEKANT 전동 스탠딩 책상",
    brandName: "IKEA",
    price: 189000,
    imageUrl: [
      "https://zwurekbugvtnuzxthgkn.supabase.co/storage/v1/object/public/product-images/817ab098-34c5-47ba-a50b-0b10b75ec99a/550.jpeg",
    ],
    tag: ["홈오피스", "스탠딩"],
    userId: "demo-user-e",
    category: "홈/인테리어",
    description:
      "재택하면서 허리 너무 아파서 샀는데 진작 살 걸 그랬다 싶음ㅠ 버튼 하나로 높이 조절되는 거 꿀이야",
    store: "이케아 광명점",
    recommender: "유리",
  },
];

export const DEMO_PRODUCTS: Record<string, DemoProduct[]> = {
  "demo-group-1": GROUP1_PRODUCTS,
  "demo-group-2": GROUP2_PRODUCTS,
};

/** id로 데모 상품을 빠르게 조회하기 위한 플랫 맵 */
export const DEMO_PRODUCTS_BY_ID: Record<string, DemoProduct> = Object.fromEntries(
  [...GROUP1_PRODUCTS, ...GROUP2_PRODUCTS].map((p) => [p.id, p])
);
