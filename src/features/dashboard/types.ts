export interface ProductDetail {
  id: string;
  brandName: string | null;
  prdName: string;
  price: number | null;
  description: string | null;
  imageUrl: string[] | null;
  tag: string[] | null;
  category: string | null;
  userId: string;
  groupId: string[] | null;
  created_at: string;
}
