import type { Writable } from 'svelte/store';
export declare const trackIndex: Writable<number>;
export declare const isPlaying: Writable<boolean>;
export declare const state: Writable<'no-repeat' | 'repeat' | 'repeat-all'>;
