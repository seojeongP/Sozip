import { create } from "zustand";

interface LegendState {
    isVisible: boolean;
    setIsVisible: (isVisibie: boolean) => void;
}

const useLegendStore = create<LegendState>(set => ({
    isVisible: false,
    setIsVisible: (isVisible: boolean) => {
        set({isVisible});
    },
}));

export default useLegendStore;