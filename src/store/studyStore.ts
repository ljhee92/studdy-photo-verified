
import { create } from 'zustand';
import { Study, ChatMessage } from '@/types/study';
import { mockStudies, mockMyStudies, mockChatMessages } from '@/data/mockData';

interface StudyStore {
  studies: Study[];
  myStudies: Study[];
  addStudy: (study: Study) => void;
  joinStudy: (studyId: string, participant: any) => void;
  getStudyById: (id: string) => Study | undefined;
  sendMessage: (studyId: string, message: ChatMessage) => void;
}

export const useStudyStore = create<StudyStore>((set, get) => ({
  studies: [...mockStudies.map(study => ({ ...study, chatMessages: mockChatMessages[study.id] || [] }))],
  myStudies: [...mockMyStudies.map(study => ({ ...study, chatMessages: mockChatMessages[study.id] || [] }))],
  
  addStudy: (study: Study) => set((state) => {
    const studyWithChat = { ...study, chatMessages: [] };
    const newStudies = [studyWithChat, ...state.studies];
    const newMyStudies = [studyWithChat, ...state.myStudies];
    return {
      studies: newStudies,
      myStudies: newMyStudies
    };
  }),
  
  joinStudy: (studyId: string, participant: any) => set((state) => {
    const updateStudy = (studies: Study[]) => 
      studies.map(study => 
        study.id === studyId 
          ? {
              ...study,
              currentParticipants: study.currentParticipants + 1,
              participants: [...study.participants, participant]
            }
          : study
      );
    
    return {
      studies: updateStudy(state.studies),
      myStudies: updateStudy(state.myStudies)
    };
  }),
  
  getStudyById: (id: string) => {
    const state = get();
    return state.studies.find(study => study.id === id) || 
           state.myStudies.find(study => study.id === id);
  },

  sendMessage: (studyId: string, message: ChatMessage) => set((state) => {
    const updateStudyMessages = (studies: Study[]) =>
      studies.map(study =>
        study.id === studyId
          ? { ...study, chatMessages: [...study.chatMessages, message] }
          : study
      );

    return {
      studies: updateStudyMessages(state.studies),
      myStudies: updateStudyMessages(state.myStudies)
    };
  })
}));
