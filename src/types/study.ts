
export interface Study {
  id: string;
  title: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  participantFee: number;
  startDate: string;
  endDate: string;
  verificationFrequency: number; // days
  status: 'recruiting' | 'ongoing' | 'completed' | 'cancelled';
  organizer: {
    id: string;
    name: string;
    trustworthiness: number;
  };
  participants: Participant[];
  chatMessages: ChatMessage[];
}

export interface Participant {
  id: string;
  name: string;
  joinedAt: string;
  trustworthiness: number;
  verifications: Verification[];
}

export interface Verification {
  id: string;
  date: string;
  imageUrl: string;
  capturedAt: string; // metadata timestamp
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'system';
}
