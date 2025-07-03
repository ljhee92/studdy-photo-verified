
import { create } from 'zustand';
import { Study } from '@/types/study';
import { mockStudies, mockMyStudies } from '@/data/mockData';

interface StudyStore {
  studies: Study[];
  myStudies: Study[];
  addStudy: (study: Study) => void;
  joinStudy: (studyId: string, participant: any) => void;
  getStudyById: (id: string) => Study | undefined;
}

export const useStudyStore = create<StudyStore>((set, get) => ({
  studies: [...mockStudies],
  myStudies: [...mockMyStudies],
  
  addStudy: (study: Study) => set((state) => {
    const newStudies = [study, ...state.studies];
    const newMyStudies = [study, ...state.myStudies];
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
  }
}));
