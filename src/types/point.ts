
export interface User {
  id: string;
  name: string;
  phone: string;
  points: number;
}

export interface GiftCard {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface PurchaseHistory {
  id: string;
  userId: string;
  giftCardId: string;
  purchasedAt: string;
  pointsUsed: number;
  status: 'completed' | 'pending' | 'failed';
}
