import { create } from "zustand";

interface SubmissionStore {
  joinedWaitlist: boolean;
  markWaitlistJoined: () => void;
}

export const useSubmissionStore = create<SubmissionStore>((set) => ({
  joinedWaitlist: false,
  markWaitlistJoined: () => set({ joinedWaitlist: true }),
}));

