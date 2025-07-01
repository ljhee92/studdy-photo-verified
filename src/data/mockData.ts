
import { Study } from '../types/study';

export const mockStudies: Study[] = [
  {
    id: '1',
    title: '토익 900점 달성 스터디',
    description: '토익 900점을 목표로 하는 3개월 집중 스터디입니다. 매일 문제풀이와 단어암기를 진행합니다.',
    maxParticipants: 6,
    currentParticipants: 4,
    participantFee: 1000,
    startDate: '2025-07-15',
    endDate: '2025-10-15',
    verificationFrequency: 1,
    status: 'recruiting',
    organizer: {
      id: 'user1',
      name: '김철수'
    },
    participants: [
      {
        id: 'user1',
        name: '김철수',
        joinedAt: '2025-07-01',
        verifications: []
      },
      {
        id: 'user2',
        name: '이영희',
        joinedAt: '2025-07-02',
        verifications: []
      },
      {
        id: 'user3',
        name: '박민수',
        joinedAt: '2025-07-03',
        verifications: []
      },
      {
        id: 'user4',
        name: '정수연',
        joinedAt: '2025-07-04',
        verifications: []
      }
    ]
  },
  {
    id: '2',
    title: '알고리즘 코딩테스트 준비',
    description: '프로그래머스와 백준 문제를 통해 알고리즘 실력을 향상시키는 스터디입니다.',
    maxParticipants: 8,
    currentParticipants: 6,
    participantFee: 500,
    startDate: '2025-07-10',
    endDate: '2025-09-10',
    verificationFrequency: 2,
    status: 'recruiting',
    organizer: {
      id: 'user5',
      name: '최개발'
    },
    participants: [
      {
        id: 'user5',
        name: '최개발',
        joinedAt: '2025-07-01',
        verifications: []
      },
      {
        id: 'user6',
        name: '한코딩',
        joinedAt: '2025-07-02',
        verifications: []
      },
      {
        id: 'user7',
        name: '김알고',
        joinedAt: '2025-07-03',
        verifications: []
      },
      {
        id: 'user8',
        name: '이자료',
        joinedAt: '2025-07-04',
        verifications: []
      },
      {
        id: 'user9',
        name: '박구조',
        joinedAt: '2025-07-05',
        verifications: []
      },
      {
        id: 'user10',
        name: '정문제',
        joinedAt: '2025-07-06',
        verifications: []
      }
    ]
  },
  {
    id: '3',
    title: '공인회계사 1차 시험 준비',
    description: '공인회계사 1차 시험 합격을 목표로 하는 장기 스터디입니다. 매주 모의고사를 진행합니다.',
    maxParticipants: 4,
    currentParticipants: 2,
    participantFee: 1000,
    startDate: '2025-08-01',
    endDate: '2025-11-30',
    verificationFrequency: 3,
    status: 'recruiting',
    organizer: {
      id: 'user11',
      name: '회계맨'
    },
    participants: [
      {
        id: 'user11',
        name: '회계맨',
        joinedAt: '2025-07-01',
        verifications: []
      },
      {
        id: 'user12',
        name: '세무여',
        joinedAt: '2025-07-02',
        verifications: []
      }
    ]
  },
  {
    id: '4',
    title: '기술면접 준비 스터디',
    description: '개발자 기술면접을 준비하는 스터디입니다. CS 지식과 실무 경험을 공유합니다.',
    maxParticipants: 10,
    currentParticipants: 8,
    participantFee: 500,
    startDate: '2025-07-20',
    endDate: '2025-08-20',
    verificationFrequency: 1,
    status: 'recruiting',
    organizer: {
      id: 'user13',
      name: '면접왕'
    },
    participants: [
      {
        id: 'user13',
        name: '면접왕',
        joinedAt: '2025-07-01',
        verifications: []
      },
      {
        id: 'user14',
        name: '취업준비생',
        joinedAt: '2025-07-02',
        verifications: []
      },
      {
        id: 'user15',
        name: '개발자꿈',
        joinedAt: '2025-07-03',
        verifications: []
      },
      {
        id: 'user16',
        name: '코딩마스터',
        joinedAt: '2025-07-04',
        verifications: []
      },
      {
        id: 'user17',
        name: '프론트엔드',
        joinedAt: '2025-07-05',
        verifications: []
      },
      {
        id: 'user18',
        name: '백엔드맨',
        joinedAt: '2025-07-06',
        verifications: []
      },
      {
        id: 'user19',
        name: '풀스택개발',
        joinedAt: '2025-07-07',
        verifications: []
      },
      {
        id: 'user20',
        name: '데이터분석가',
        joinedAt: '2025-07-08',
        verifications: []
      }
    ]
  }
];

export const mockMyStudies: Study[] = [
  {
    id: '1',
    title: '토익 900점 달성 스터디',
    description: '토익 900점을 목표로 하는 3개월 집중 스터디입니다. 매일 문제풀이와 단어암기를 진행합니다.',
    maxParticipants: 6,
    currentParticipants: 4,
    participantFee: 1000,
    startDate: '2025-07-15',
    endDate: '2025-10-15',
    verificationFrequency: 1,
    status: 'recruiting',
    organizer: {
      id: 'user1',
      name: '김철수'
    },
    participants: [
      {
        id: 'user1',
        name: '김철수',
        joinedAt: '2025-07-01',
        verifications: [
          {
            id: 'v1',
            date: '2025-07-01',
            imageUrl: '/placeholder.svg',
            capturedAt: '2025-07-01T08:30:00Z',
            status: 'approved',
            reviewedBy: 'user1',
            reviewedAt: '2025-07-01T09:00:00Z'
          }
        ]
      },
      {
        id: 'user2',
        name: '이영희',
        joinedAt: '2025-07-02',
        verifications: [
          {
            id: 'v2',
            date: '2025-07-01',
            imageUrl: '/placeholder.svg',
            capturedAt: '2025-07-01T09:15:00Z',
            status: 'pending'
          }
        ]
      },
      {
        id: 'user3',
        name: '박민수',
        joinedAt: '2025-07-03',
        verifications: []
      },
      {
        id: 'user4',
        name: '정수연',
        joinedAt: '2025-07-04',
        verifications: []
      }
    ]
  }
];
