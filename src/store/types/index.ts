import { AppSlice } from 'store/slices/app';
import { StateCreator } from 'zustand';

export type Store = AppSlice;

export type StateSlice<T, U> = StateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]], [], U>;
