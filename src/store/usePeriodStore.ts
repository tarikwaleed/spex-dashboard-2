import { create } from 'zustand';

interface PeriodState {
  period: 'daily' | 'monthly';
  setPeriod: (newPeriod: 'daily' | 'monthly') => void;
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
