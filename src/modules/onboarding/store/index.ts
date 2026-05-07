import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OnboardingState {
  name: string;
  avatar: string;
  profession: string;
  organization: string;
  logoUrl?: string;
  currentStep: number;
}

interface OnboardingActions {
  setName: (name: string, avatar: string) => void;
  setProfession: (profession: string) => void;
  setOrganization: (organization: string) => void;
  reset: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

type OnboardingStore = OnboardingState & OnboardingActions;

const initialState: OnboardingState = {
  name: "",
  profession: "",
  avatar: "",
  organization: "",
  logoUrl: undefined,
  currentStep: 1,
};

export const useOnboardingStore = create<OnboardingStore>()(
  devtools((set, get) => ({
    ...initialState,

    setName: (name: string, avatar: string) => set({ name, avatar }),
    setProfession: (profession: string) => set({ profession }),
    setOrganization: (organization: string) => set({ organization }),
    reset: () => set(initialState),

    /* handle next and prev step */
    nextStep: () => {
      const { currentStep } = get();
      set({ currentStep: currentStep + 1 }, false, "nextStep");
    },

    prevStep: () => {
      const { currentStep } = get();
      if (currentStep > 1) {
        set({ currentStep: currentStep - 1 }, false, "prevStep");
      }
    },
  }))
);
