import { OpenWith } from './enum.js';

export type OptionsType = {
  options: {
    remember: boolean; // 기억하기
    lastOpened: OpenWith; // 마지막으로 열었던 탭 이름
  };
};
