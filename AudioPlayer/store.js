import { writable } from 'svelte/store';
export const trackIndex = writable(0);
export const isPlaying = writable(false);
export const state = writable('no-repeat');
