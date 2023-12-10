import create from 'zustand';
import { createAppSlice } from './slices/app';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Store } from 'store/types';

export const useStore = create<Store, [['zustand/devtools', never], ['zustand/immer', never]]>(
  devtools(
    immer((...args) => ({
      ...createAppSlice(...args),
    }))
  )
);
