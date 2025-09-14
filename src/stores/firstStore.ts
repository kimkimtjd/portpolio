import { create } from "zustand";

interface QA {
  question: string | null;
  answer: string | null;
}

interface FirstState {
  title: string | null;           // 입력창 상태
  setTitle: (value: string) => void;

  choice: string | null;           // 입력창 상태
  setChoice: (value: string) => void;

  qaList: QA[];                   // 질문/답변 배열
  addQA: (qa: QA) => void;       
  updateLastAnswer: (answer: string) => void;
  clearQA: () => void;            // 전체 초기화
}

export const useFirstStore = create<FirstState>((set) => ({
  title: null,
  setTitle: (value) => set({ title: value }),
  
  choice: null,
  setChoice: (value) => set({ choice: value }),

  qaList: [],
  addQA: (qa) => set((state) => ({
    qaList: [...state.qaList, qa],
  })),
  updateLastAnswer: (answer) => set((state) => {
    const newList = [...state.qaList];
    if (newList.length > 0) {
      newList[newList.length - 1].answer = answer;
    }
    return { qaList: newList };
  }),
  clearQA: () => set({ qaList: [], title: null }),
}));