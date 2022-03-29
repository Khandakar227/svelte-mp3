<script >import { onDestroy, createEventDispatcher } from 'svelte';
import './index.css';
import { RepeatIcon, NoRepeatIcon, RepeatOnceIcon, ShuffleIcon, NextIcon, PreviousIcon, PlayIcon, PauseIcon } from './icons';
import { trackIndex, isPlaying, state } from './store';
import { displayDuration } from './utils';
const dispatch = createEventDispatcher();
let className = '';
export { className as class };
export let style = '';
export let volume = isNaN(+(localStorage?.getItem('volume'))) ? 1 : +(localStorage?.getItem('volume')) ?? 1;
export let shuffle = localStorage?.getItem('shuffle') == 'true' || false;
export let urls = [];
export let color = 'black';
export let loop = localStorage?.getItem('loop') || 'no-repeat';
export let showTime = true;
export let showTrackNum = true;
export let showVolume = true;
export let disableVolSlider = false;
export let showShuffle = true;
export let showNext = true;
export let showPrev = true;
$: audio = new Audio(urls[$trackIndex]);
$: duration = audio.duration || 0;
let trackprogress = 0;
let interval = 0; //For requestAnimationFrame
onDestroy(() => {
    cancelAnimationFrame(interval);
});
$: {
    // Change the state to repeat or not
    state.set(loop);
    if (typeof (window) != 'undefined')
        localStorage.setItem('loop', loop.toString());
}
$: {
    // set the audio volume
    audio.volume = volume;
    localStorage.setItem('volume', volume.toString());
}
//Event dispatch 
// add meta data when audio loads
$: audio.onloadedmetadata = (e) => {
    duration = audio.duration;
    audio.volume = volume;
    dispatch('loadedmetadata', e);
    console.dir(audio);
};
$: {
    if (audio) {
        audio.oncanplay = (e) => dispatch("canplay", e);
        audio.oncanplaythrough = (e) => dispatch("canplaythrough", e);
        audio.ondurationchange = (e) => dispatch("durationchange", e);
        audio.onended = (e) => dispatch("ended", e);
        audio.onloadeddata = (e) => dispatch("loadeddata", e);
        audio.onplaying = (e) => dispatch("playing", e);
        audio.onratechange = (e) => dispatch("ratechange", e);
        audio.onstalled = (e) => dispatch("stalled", e);
        audio.onsuspend = (e) => dispatch("suspend", e);
        audio.ontimeupdate = (e) => dispatch("timeupdate", e);
        audio.onvolumechange = (e) => dispatch("volumechange", e);
        audio.onwaiting = (e) => dispatch("waiting", e);
    }
}
// start or stop playing audio
$: {
    if ($isPlaying) {
        audio.play().then(() => {
            //Start tracking progress
            play();
        });
    }
    else {
        audio.pause();
    }
}
const toNextTrack = () => {
    if ($isPlaying)
        audio.pause();
    if ($trackIndex < urls.length - 1) {
        trackIndex.set($trackIndex + 1);
    }
    else {
        trackIndex.set(0);
    }
};
const toPrevTrack = () => {
    if ($isPlaying)
        audio.pause();
    if ($trackIndex - 1 < 0) {
        trackIndex.set(0);
    }
    else {
        trackIndex.set($trackIndex - 1);
    }
};
//Animate track progress and change track after an audio ends
function play() {
    const timer = () => {
        cancelAnimationFrame(interval); // Cancel any previous animation
        trackprogress = audio.currentTime; //set the track progress
        duration = audio.duration;
        interval = requestAnimationFrame(timer);
        if (audio.ended) {
            //Repeat all audio one after another
            if ($state === 'repeat-all') {
                // if shuffle is true play audio of any random number track
                if (shuffle)
                    trackIndex.set(Math.floor(Math.random() * urls.length));
                else
                    toNextTrack();
            }
            // Repeat the same audio
            else if ($state === 'repeat')
                audio.play();
            // Stop playing
            else {
                isPlaying.set(false);
                cancelAnimationFrame(interval);
            }
        }
        return () => cancelAnimationFrame(interval);
    };
    if (window.requestAnimationFrame)
        timer();
}
// set repeat or not
function changeState() {
    if (loop === 'no-repeat')
        loop = 'repeat';
    else if (loop === 'repeat')
        loop = 'repeat-all';
    else
        loop = 'no-repeat';
}
// on range slider input change
const onScrub = (e) => {
    cancelAnimationFrame(interval);
    audio.currentTime = +e.target.value || 0;
    trackprogress = +e.target.value || 0;
};
const changeVolume = (e) => {
    cancelAnimationFrame(interval);
    volume = +e.target.value ?? 1;
};
const mute = () => {
    if (audio.volume != 0)
        volume = 0;
    else
        volume = 1;
};
const setShuffle = () => {
    shuffle = !shuffle;
    localStorage.setItem('shuffle', shuffle.toString());
};
</script>

<div class={`player ${className}`} {style}>
<input class='trackslider'
    max={duration}
    min={0}
    value={trackprogress}
    on:input={onScrub}
    type='range'/>
    
 {#if showTime}   
    <div class='track-time'>
        <small>{displayDuration(trackprogress)}</small>
      {#if showTrackNum}
        <small>{`${$trackIndex+1} / ${urls.length}`}</small>
      {/if}
        <small>{displayDuration(duration)}</small>
    </div>
    {:else if showTrackNum}
        <div style='text-align:center;font-size:12px;'>{`${$trackIndex+1} / ${urls.length}`}</div>
{/if}

<div class='control'>
    <button on:click={() => changeState()} >
        {#if $state === 'repeat-all'}
            <RepeatIcon {color}/>
        {:else if $state === 'repeat'}
            <RepeatOnceIcon {color}/>
        {:else} <NoRepeatIcon {color}/>
        {/if}
    </button>
{#if showShuffle}    
    <button on:click={()=>setShuffle()} style="background-color: {shuffle ? '#ff726f':''}">
        <ShuffleIcon {color}/>
    </button>
{/if}
{#if showPrev}
    <button on:click={()=> toPrevTrack()}>
    <PreviousIcon {color}/>
    </button>
{/if}   
    {#if $isPlaying}
         <button class='play' on:click={() => isPlaying.set(false)}>
            <PauseIcon {color}/>
        </button>
    {:else}
        <button class='play' on:click={() => isPlaying.set(true)}>
            <PlayIcon {color}/>
        </button>
    {/if}

{#if showNext}
    <button on:click={()=> toNextTrack()}>
    <NextIcon {color}/>
    </button>
{/if}
    {#if showVolume}
    <div class="volume">
        <button on:click={mute}>
        {#if volume!==0}
            <svg width="15" height="15" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5C8 1.31062 7.893 1.13749 7.72361 1.05279C7.55421 0.968093 7.35151 0.986371 7.2 1.1L3.33333 4H1.5C0.671573 4 0 4.67158 0 5.5V9.5C0 10.3284 0.671573 11 1.5 11H3.33333L7.2 13.9C7.35151 14.0136 7.55421 14.0319 7.72361 13.9472C7.893 13.8625 8 13.6894 8 13.5V1.5ZM3.8 4.9L7 2.5V12.5L3.8 10.1C3.71345 10.0351 3.60819 10 3.5 10H1.5C1.22386 10 1 9.77614 1 9.5V5.5C1 5.22386 1.22386 5 1.5 5H3.5C3.60819 5 3.71345 4.96491 3.8 4.9ZM10.833 3.95949C10.7106 3.77557 10.4623 3.72567 10.2784 3.84804C10.0944 3.97041 10.0445 4.21871 10.1669 4.40264C11.4111 6.27268 11.4111 8.72728 10.1669 10.5973C10.0445 10.7813 10.0944 11.0296 10.2784 11.1519C10.4623 11.2743 10.7106 11.2244 10.833 11.0405C12.2558 8.90199 12.2558 6.09798 10.833 3.95949Z" fill={color} fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        {:else}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.72361 1.05279C7.893 1.13749 8 1.31062 8 1.5V13.5C8 13.6894 7.893 13.8625 7.72361 13.9472C7.55421 14.0319 7.35151 14.0136 7.2 13.9L3.33333 11H1.5C0.671573 11 0 10.3284 0 9.5V5.5C0 4.67158 0.671573 4 1.5 4H3.33333L7.2 1.1C7.35151 0.986371 7.55421 0.968093 7.72361 1.05279ZM7 2.5L3.8 4.9C3.71345 4.96491 3.60819 5 3.5 5H1.5C1.22386 5 1 5.22386 1 5.5V9.5C1 9.77614 1.22386 10 1.5 10H3.5C3.60819 10 3.71345 10.0351 3.8 10.1L7 12.5V2.5ZM14.8536 5.14645C15.0488 5.34171 15.0488 5.65829 14.8536 5.85355L13.2071 7.5L14.8536 9.14645C15.0488 9.34171 15.0488 9.65829 14.8536 9.85355C14.6583 10.0488 14.3417 10.0488 14.1464 9.85355L12.5 8.20711L10.8536 9.85355C10.6583 10.0488 10.3417 10.0488 10.1464 9.85355C9.95118 9.65829 9.95118 9.34171 10.1464 9.14645L11.7929 7.5L10.1464 5.85355C9.95118 5.65829 9.95118 5.34171 10.1464 5.14645C10.3417 4.95118 10.6583 4.95118 10.8536 5.14645L12.5 6.79289L14.1464 5.14645C14.3417 4.95118 14.6583 4.95118 14.8536 5.14645Z" fill={color} fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        {/if}
        </button>
        {#if !disableVolSlider}
            <input type='range' max={1} min={0} step={0.1} value={volume} on:input={changeVolume}/>
        {/if}
    </div>
    {/if}
</div>
</div>

<style>
.track-time {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>