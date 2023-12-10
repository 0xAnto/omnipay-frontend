import { StateSlice, Store } from 'store/types';
export type AppSlice = {
  isSubmitOpen: boolean;
  sourceSelectedValue:number;
  targetSelectedValue:number;
  arbitrumGoerliUsdcValue:number;
  mantletestnetUsdcValue:number;
  scrollsepoliaUsdcValue:number;
  basegoerliUsdcValue:number;
  mumbaiUsdcValue:number;
  updateSubmitOpen(payload: boolean): void;
  updateSourceSelectedValue(payload: number): void;
  updateTargetSelectedValue(payload: number): void;
  updatedArbitrumGoerliUSDC(payload: number): void;
  updatedMantletestnetUSDC(payload: number): void;
  updatedScrollsepoliaUSDC(payload: number): void;
  updatedBasegoerliUSDC(payload: number): void;
  updatedMumbaiUSDC(payload: number): void;
};

export const createAppSlice: StateSlice<Store, AppSlice> = (set:any) => ({
  isSubmitOpen: false,
  sourceSelectedValue:0,
  targetSelectedValue:0,
  arbitrumGoerliUsdcValue:0,
  mantletestnetUsdcValue:0,
  scrollsepoliaUsdcValue:0,
  basegoerliUsdcValue:0,
  mumbaiUsdcValue:0,
  updateSubmitOpen(payload: AppSlice['isSubmitOpen']) {
    set({ isSubmitOpen: payload });
  },
  updateSourceSelectedValue(payload: AppSlice['sourceSelectedValue']) {
    set({ sourceSelectedValue: payload });
  },
  updateTargetSelectedValue(payload: AppSlice['targetSelectedValue']) {
    set({ targetSelectedValue: payload });
  },
  updatedArbitrumGoerliUSDC(payload: AppSlice['arbitrumGoerliUsdcValue']) {
    set({ arbitrumGoerliUsdcValue: payload });
  },
  updatedMantletestnetUSDC(payload: AppSlice['mantletestnetUsdcValue']) {
    set({ mantletestnetUsdcValue: payload });
  },
  updatedScrollsepoliaUSDC(payload: AppSlice['scrollsepoliaUsdcValue']) {
    set({ scrollsepoliaUsdcValue: payload });
  },
  updatedBasegoerliUSDC(payload: AppSlice['basegoerliUsdcValue']) {
    set({ basegoerliUsdcValue: payload });
  },
  updatedMumbaiUSDC(payload: AppSlice['mumbaiUsdcValue']) {
    set({ mumbaiUsdcValue: payload });
  }
});
