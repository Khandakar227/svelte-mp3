import {get} from 'svelte/store'
import {isPlaying, trackIndex} from '../store';

export const showMediaSession = (metadata:MediaMetadataInit, numOfTracks: number) => {
  if (!('mediaSession' in navigator)) return
  
  navigator.mediaSession.metadata = new MediaMetadata(metadata);
  
  navigator.mediaSession.setActionHandler('play', function() {
    isPlaying.set(true);
    navigator.mediaSession.playbackState = "playing";
  });
  
  navigator.mediaSession.setActionHandler('pause', function() {
    isPlaying.set(false);
    navigator.mediaSession.playbackState  = "paused";
  });
  navigator.mediaSession.setActionHandler('stop', function() {
    isPlaying.set(false);
  })
  navigator.mediaSession.setActionHandler('previoustrack', function() {
    const tI = get(trackIndex);
    if (tI - 1 < 0) trackIndex.set(0);
    else trackIndex.set(tI - 1);
  });
  navigator.mediaSession.setActionHandler('nexttrack', function() {
    const tI = get(trackIndex);
    if (tI < numOfTracks - 1) trackIndex.set(tI + 1);
    else trackIndex.set(0);
  })
}