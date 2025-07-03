import { Study } from "../types/study";

export const mockStudies: Study[] = [
  {
    id: "1",
    title: "스프링 부트로 배우는 백엔드 개발",
    description: "스프링 부트를 활용해 RESTful API를 개발하고 데이터베이스 연동까지 학습합니다. 매일 코딩 실습을 통해 실무 역량을 키워보세요.",
    maxParticipants: 8,
    currentParticipants: 5,
    participantFee: 15000,
    startDate: "2024-12-15",
    endDate: "2024-12-29",
    verificationFrequency: 1,
    status: 'recruiting',
    organizer: {
      id: "user1",
      name: "김개발",
      trustworthiness: 85
    },
    participants: [
      {
        id: "user1",
        name: "김개발",
        joinedAt: "2024-12-01T10:00:00Z",
        trustworthiness: 85,
        verifications: []
      },
      {
        id: "user3",
        name: "박코딩",
        joinedAt: "2024-12-02T14:30:00Z",
        trustworthiness: 72,
        verifications: []
      },
      {
        id: "user4",
        name: "이프로그래머",
        joinedAt: "2024-12-03T09:15:00Z",
        trustworthiness: 68,
        verifications: []
      },
      {
        id: "user5",
        name: "최개발자",
        joinedAt: "2024-12-04T16:45:00Z",
        trustworthiness: 91,
        verifications: []
      },
      {
        id: "user6",
        name: "정코더",
        joinedAt: "2024-12-05T11:20:00Z",
        trustworthiness: 59,
        verifications: []
      }
    ]
  },
  {
    id: "2",
    title: "리액트로 시작하는 프론트엔드",
    description: "리액트 기초부터 고급 훅까지, 모던 프론트엔드 개발의 핵심을 배워봅시다.",
    maxParticipants: 6,
    currentParticipants: 3,
    participantFee: 12000,
    startDate: "2024-12-20",
    endDate: "2024-12-27",
    verificationFrequency: 1,
    status: 'recruiting',
    organizer: {
      id: "user7",
      name: "홍프론트",
      trustworthiness: 78
    },
    participants: [
      {
        id: "user7",
        name: "홍프론트",
        joinedAt: "2024-12-06T13:00:00Z",
        trustworthiness: 78,
        verifications: []
      },
      {
        id: "user8",
        name: "강리액트",
        joinedAt: "2024-12-07T10:30:00Z",
        trustworthiness: 64,
        verifications: []
      },
      {
        id: "user9",
        name: "윤컴포넌트",
        joinedAt: "2024-12-08T15:45:00Z",
        trustworthiness: 82,
        verifications: []
      }
    ]
  },
  {
    id: "3",
    title: "파이썬 데이터 분석 마스터",
    description: "판다스와 넘파이를 활용한 데이터 분석 기법을 실습을 통해 익혀봅시다.",
    maxParticipants: 10,
    currentParticipants: 8,
    participantFee: 18000,
    startDate: "2024-12-18",
    endDate: "2025-01-01",
    verificationFrequency: 2,
    status: 'recruiting',
    organizer: {
      id: "user10",
      name: "임데이터",
      trustworthiness: 95
    },
    participants: [
      {
        id: "user10",
        name: "임데이터",
        joinedAt: "2024-12-05T09:00:00Z",
        trustworthiness: 95,
        verifications: []
      },
      {
        id: "user11",
        name: "박분석",
        joinedAt: "2024-12-06T14:20:00Z",
        trustworthiness: 76,
        verifications: []
      },
      {
        id: "user12",
        name: "김통계",
        joinedAt: "2024-12-07T11:30:00Z",
        trustworthiness: 83,
        verifications: []
      },
      {
        id: "user13",
        name: "이머신러닝",
        joinedAt: "2024-12-08T16:15:00Z",
        trustworthiness: 69,
        verifications: []
      },
      {
        id: "user14",
        name: "정시각화",
        joinedAt: "2024-12-09T10:45:00Z",
        trustworthiness: 88,
        verifications: []
      },
      {
        id: "user15",
        name: "조빅데이터",
        joinedAt: "2024-12-10T13:20:00Z",
        trustworthiness: 71,
        verifications: []
      },
      {
        id: "user16",
        name: "한인공지능",
        joinedAt: "2024-12-11T09:50:00Z",
        trustworthiness: 94,
        verifications: []
      },
      {
        id: "user17",
        name: "신딥러닝",
        joinedAt: "2024-12-12T15:10:00Z",
        trustworthiness: 62,
        verifications: []
      }
    ]
  },
  {
    id: "4",
    title: "토익 900점 달성 프로젝트",
    description: "체계적인 학습 계획으로 토익 900점을 목표로 하는 스터디입니다.",
    maxParticipants: 12,
    currentParticipants: 9,
    participantFee: 20000,
    startDate: "2024-12-22",
    endDate: "2025-01-05",
    verificationFrequency: 1,
    status: 'recruiting',
    organizer: {
      id: "user18",
      name: "영어마스터",
      trustworthiness: 92
    },
    participants: [
      {
        id: "user18",
        name: "영어마스터",
        joinedAt: "2024-12-01T08:00:00Z",
        trustworthiness: 92,
        verifications: []
      },
      {
        id: "user19",
        name: "토익킬러",
        joinedAt: "2024-12-02T12:30:00Z",
        trustworthiness: 77,
        verifications: []
      },
      {
        id: "user20",
        name: "문법왕",
        joinedAt: "2024-12-03T16:45:00Z",
        trustworthiness: 84,
        verifications: []
      },
      {
        id: "user21",
        name: "리스닝고수",
        joinedAt: "2024-12-04T10:20:00Z",
        trustworthiness: 66,
        verifications: []
      },
      {
        id: "user22",
        name: "단어암기왕",
        joinedAt: "2024-12-05T14:15:00Z",
        trustworthiness: 89,
        verifications: []
      },
      {
        id: "user23",
        name: "독해달인",
        joinedAt: "2024-12-06T11:40:00Z",
        trustworthiness: 73,
        verifications: []
      },
      {
        id: "user24",
        name: "스피킹프로",
        joinedAt: "2024-12-07T15:25:00Z",
        trustworthiness: 91,
        verifications: []
      },
      {
        id: "user25",
        name: "라이팅마스터",
        joinedAt: "2024-12-08T09:10:00Z",
        trustworthiness: 58,
        verifications: []
      },
      {
        id: "user26",
        name: "회화전문가",
        joinedAt: "2024-12-09T13:55:00Z",
        trustworthiness: 86,
        verifications: []
      }
    ]
  },
  {
    id: "5",
    title: "디자인 시스템 구축하기",
    description: "피그마와 스토리북을 활용해 체계적인 디자인 시스템을 만들어봅시다.",
    maxParticipants: 6,
    currentParticipants: 4,
    participantFee: 25000,
    startDate: "2024-12-25",
    endDate: "2025-01-08",
    verificationFrequency: 2,
    status: 'recruiting',
    organizer: {
      id: "user27",
      name: "디자인구루",
      trustworthiness: 88
    },
    participants: [
      {
        id: "user27",
        name: "디자인구루",
        joinedAt: "2024-12-01T10:00:00Z",
        trustworthiness: 88,
        verifications: []
      },
      {
        id: "user28",
        name: "UI전문가",
        joinedAt: "2024-12-02T14:20:00Z",
        trustworthiness: 75,
        verifications: []
      },
      {
        id: "user29",
        name: "UX디자이너",
        joinedAt: "2024-12-03T11:45:00Z",
        trustworthiness: 82,
        verifications: []
      },
      {
        id: "user30",
        name: "프로토타이퍼",
        joinedAt: "2024-12-04T16:30:00Z",
        trustworthiness: 79,
        verifications: []
      }
    ]
  }
];

export const mockMyStudies: Study[] = [
  {
    id: "my1",
    title: "알고리즘 문제 해결 스터디",
    description: "매일 알고리즘 문제를 풀고 인증하는 스터디입니다. 꾸준한 문제 해결을 통해 실력을 향상시켜봅시다.",
    maxParticipants: 5,
    currentParticipants: 4,
    participantFee: 10000,
    startDate: "2024-12-01",
    endDate: "2024-12-15",
    verificationFrequency: 1,
    status: 'ongoing',
    organizer: {
      id: "user2",
      name: "최민수",
      trustworthiness: 73
    },
    participants: [
      {
        id: "user2",
        name: "최민수",
        joinedAt: "2024-11-25T10:00:00Z",
        trustworthiness: 73,
        verifications: [
          {
            id: "v1",
            date: "2024-12-01",
            imageUrl: "/placeholder.svg",
            capturedAt: "2024-12-01T09:30:00Z",
            status: 'approved',
            reviewedBy: "user2",
            reviewedAt: "2024-12-01T12:00:00Z"
          },
          {
            id: "v2",
            date: "2024-12-02",
            imageUrl: "/placeholder.svg",
            capturedAt: "2024-12-02T10:15:00Z",
            status: 'pending'
          },
          {
            id: "v3",
            date: "2024-12-03",
            imageUrl: "/placeholder.svg",
            capturedAt: "2024-12-03T08:45:00Z",
            status: 'rejected',
            reviewedBy: "user2",
            reviewedAt: "2024-12-03T14:20:00Z"
          }
        ]
      },
      {
        id: "user11",
        name: "박알고리즘",
        joinedAt: "2024-11-26T14:30:00Z",
        trustworthiness: 67,
        verifications: [
          {
            id: "v4",
            date: "2024-12-01",
            imageUrl: "/placeholder.svg",
            capturedAt: "2024-12-01T11:20:00Z",
            status: 'approved',
            reviewedBy: "user2",
            reviewedAt: "2024-12-01T15:30:00Z"
          },
          {
            id: "v5",
            date: "2024-12-02",
            imageUrl: "/placeholder.svg",
            capturedAt: "2024-12-02T09:40:00Z",
            status: 'pending'
          }
        ]
      },
      {
        id: "user12",
        name: "김문제해결",
        joinedAt: "2024-11-27T16:15:00Z",
        trustworthiness: 89,
        verifications: [
          {
            id: "v6",
            date: "2024-12-01",
            imageUrl: "/placeholder.svg",
            capturedAt: "2024-12-01T13:10:00Z",
            status: 'approved',
            reviewedBy: "user2",
            reviewedAt: "2024-12-01T16:45:00Z"
          }
        ]
      },
      {
        id: "user13",
        name: "이코딩테스트",
        joinedAt: "2024-11-28T11:00:00Z",
        trustworthiness: 55,
        verifications: []
      }
    ]
  },
  {
    id: "my2",
    title: "영어 회화 매일 연습",
    description: "원어민과의 대화 녹음을 통해 영어 실력을 향상시키는 스터디입니다.",
    maxParticipants: 6,
    currentParticipants: 5,
    participantFee: 8000,
    startDate: "2024-11-20",
    endDate: "2024-12-10",
    verificationFrequency: 1,
    status: 'ongoing',
    organizer: {
      id: "user14",
      name: "조영어",
      trustworthiness: 81
    },
    participants: [
      {
        id: "user2",
        name: "최민수",
        joinedAt: "2024-11-18T13:00:00Z",
        trustworthiness: 73,
        verifications: [
          {
            id: "v7",
            date: "2024-11-20",
            imageUrl: "/placeholder.svg",
            capturedAt: "2024-11-20T19:30:00Z",
            status: 'approved',
            reviewedBy: "user14",
            reviewedAt: "2024-11-21T09:15:00Z"
          },
          {
            id: "v8",
            date: "2024-11-21",
            imageUrl: "/placeholder.svg",
            capturedAt: "2024-11-21T20:10:00Z",
            status: 'approved',
            reviewedBy: "user14",
            reviewedAt: "2024-11-22T10:30:00Z"
          }
        ]
      },
      {
        id: "user14",
        name: "조영어",
        joinedAt: "2024-11-15T10:00:00Z",
        trustworthiness: 81,
        verifications: [
          {
            id: "v9",
            date: "2024-11-20",
            imageUrl: "/placeholder.svg",
            capturedAt: "2024-11-20T18:45:00Z",
            status: 'approved',
            reviewedBy: "user14",
            reviewedAt: "2024-11-21T08:00:00Z"
          }
        ]
      },
      {
        id: "user31",
        name: "김회화",
        joinedAt: "2024-11-16T15:20:00Z",
        trustworthiness: 64,
        verifications: []
      },
      {
        id: "user32",
        name: "이스피킹",
        joinedAt: "2024-11-17T12:40:00Z",
        trustworthiness: 78,
        verifications: []
      },
      {
        id: "user33",
        name: "박발음",
        joinedAt: "2024-11-18T09:25:00Z",
        trustworthiness: 71,
        verifications: []
      }
    ]
  },
  {
    id: "my3",
    title: "독서 모임 - 개발 서적",
    description: "매주 개발 관련 서적을 읽고 요약 및 소감을 공유하는 스터디입니다.",
    maxParticipants: 8,
    currentParticipants: 6,
    participantFee: 15000,
    startDate: "2024-11-25",
    endDate: "2024-12-25",
    verificationFrequency: 3,
    status: 'ongoing',
    organizer: {
      id: "user15",
      name: "한독서",
      trustworthiness: 92
    },
    participants: [
      {
        id: "user2",
        name: "최민수",
        joinedAt: "2024-11-20T15:30:00Z",
        trustworthiness: 73,
        verifications: [
          {
            id: "v10",
            date: "2024-11-28",
            imageUrl: "/placeholder.svg",
            capturedAt: "2024-11-28T14:20:00Z",
            status: 'approved',
            reviewedBy: "user15",
            reviewedAt: "2024-11-29T10:15:00Z"
          }
        ]
      },
      {
        id: "user15",
        name: "한독서",
        joinedAt: "2024-11-18T09:00:00Z",
        trustworthiness: 92,
        verifications: [
          {
            id: "v11",
            date: "2024-11-28",
            imageUrl: "/placeholder.svg",
            capturedAt: "2024-11-28T16:45:00Z",
            status: 'approved',
            reviewedBy: "user15",
            reviewedAt: "2024-11-29T08:30:00Z"
          }
        ]
      },
      {
        id: "user34",
        name: "정리뷰",
        joinedAt: "2024-11-19T11:15:00Z",
        trustworthiness: 85,
        verifications: []
      },
      {
        id: "user35",
        name: "최요약",
        joinedAt: "2024-11-20T13:50:00Z",
        trustworthiness: 69,
        verifications: []
      },
      {
        id: "user36",
        name: "김서평",
        joinedAt: "2024-11-21T16:30:00Z",
        trustworthiness: 87,
        verifications: []
      },
      {
        id: "user37",
        name: "이북클럽",
        joinedAt: "2024-11-22T10:45:00Z",
        trustworthiness: 74,
        verifications: []
      }
    ]
  }
];
