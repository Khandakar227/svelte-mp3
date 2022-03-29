import {writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const trackIndex: Writable<number> = writable(0);
export const isPlaying: Writable<boolean> = writable(false);
export const state: Writable<'no-repeat'|'repeat'|'repeat-all'> = writable('no-repeat');
