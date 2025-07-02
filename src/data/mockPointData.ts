
import { User, GiftCard, PurchaseHistory } from '../types/point';

export const mockCurrentUser: User = {
  id: 'user2',
  name: '최민수',
  phone: '010-1234-5678',
  points: 2000
};

export const mockGiftCards: GiftCard[] = [
  {
    id: 'gc1',
    name: '메가커피 아메리카노',
    brand: '메가커피',
    price: 2000,
    imageUrl: '/placeholder.svg',
    description: '메가커피에서 사용 가능한 아메리카노 기프티콘입니다.'
  },
  {
    id: 'gc2',
    name: '스타벅스 아메리카노 Tall',
    brand: '스타벅스',
    price: 4500,
    imageUrl: '/placeholder.svg',
    description: '스타벅스에서 사용 가능한 아메리카노 톨사이즈 기프티콘입니다.'
  },
  {
    id: 'gc3',
    name: '컴포즈커피 아메리카노',
    brand: '컴포즈커피',
    price: 1500,
    imageUrl: '/placeholder.svg',
    description: '컴포즈커피에서 사용 가능한 아메리카노 기프티콘입니다.'
  },
  {
    id: 'gc4',
    name: '이디야커피 아메리카노',
    brand: '이디야커피',
    price: 2500,
    imageUrl: '/placeholder.svg',
    description: '이디야커피에서 사용 가능한 아메리카노 기프티콘입니다.'
  },
  {
    id: 'gc5',
    name: 'CU 편의점 3000원권',
    brand: 'CU',
    price: 3000,
    imageUrl: '/placeholder.svg',
    description: 'CU 편의점에서 사용 가능한 3000원 상품권입니다.'
  },
  {
    id: 'gc6',
    name: 'GS25 편의점 5000원권',
    brand: 'GS25',
    price: 5000,
    imageUrl: '/placeholder.svg',
    description: 'GS25 편의점에서 사용 가능한 5000원 상품권입니다.'
  }
];

export const mockPurchaseHistory: PurchaseHistory[] = [
  {
    id: 'ph1',
    userId: 'user2',
    giftCardId: 'gc1',
    purchasedAt: '2025-06-15T10:30:00Z',
    pointsUsed: 2000,
    status: 'completed'
  }
];
