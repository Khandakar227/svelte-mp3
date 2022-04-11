<script lang='ts'>
import {onMount} from 'svelte';
import {AudioPlayer, trackIndex, isPlaying, PlayIcon, PauseIcon } from '../lib';

let clientSide = false;

onMount(() => {
    clientSide = true
})

const urls=[
 'https://filesamples.com/samples/audio/mp3/sample3.mp3',
 'https://filesamples.com/samples/audio/mp3/sample4.mp3',
 'https://filesamples.com/samples/audio/mp3/sample2.mp3',
 ];
 const mediaMetadata =[{title: "Sample 1", artist: " Shakib (not really)"}];
 function handleClick (trackNum:number) {
    if (trackNum != $trackIndex ) {
        trackIndex.set(trackNum)
        isPlaying.set(true)
        return
    }
    isPlaying.set(!$isPlaying);
 }
</script>
<svelte:head>
   <title>Svelte mp3 Demo</title>
   <meta name="description" content="This is a demo for svelte audio player package" />
</svelte:head>
<h1>Demo for svelte mp3</h1>
<div class='playlist'>
    {#each urls as _, i}
    <p>Sample {i+1}
    <button on:click={() => handleClick(i)}>
    {#if $trackIndex === i && $isPlaying }
        <PauseIcon/>
     {:else}
        <PlayIcon />
    {/if}
    </button>
    </p>
    {/each}
</div>
{#if clientSide}
    <AudioPlayer {urls} {mediaMetadata}/>
 {/if}
 
 <style>
 .playlist {
 max-width: 768px;
 margin: 0 auto;
 }
 .playlist p {
     padding: 5px;
     border-bottom: 1px solid black;
     display: flex;
     align-items:center;
     justify-content: space-between;
 }
.playlist button { background: transparent;border:none; outline:none;}
 </style>