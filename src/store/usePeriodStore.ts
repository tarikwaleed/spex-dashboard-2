import { create } from 'zustand';

interface PeriodState {
  period: string;
  setPeriod: (value: string) => void;
}

const usePeriodStore = create<PeriodState>((set, get) => ({
  period: 'daily', // Default value
  setPeriod: (newPeriod) => {
    const { period } = get();
    if (period !== newPeriod) {
      console.log(`${newPeriod}`);
    }
    set({ period: newPeriod });
  },
}));

export default usePeriodStore;
