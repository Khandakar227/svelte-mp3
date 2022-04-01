# Svelte-mp3

<img src="./docs/Logo.jpg" alt="Svelte mp3 Logo" />

This is a light blazingly fast yet simple minimalistic audio player for svelte.

## Installation
    npm install --save svelte-mp3

## Quickstart
Inside any *.svelte file:
  ```svelte
    <script>
      import {AudioPlayer} from 'svelte-mp3';
    </script>
    //...
    <AudioPlayer 
      urls=['url or src of an audio1','url or src of an audio2']
    />
  ```
  ## Features
  1. Previous track/Next track, shuffle, loop buttons
  2. Shuffle, volume, loop values persistant on local storage.
  3. Flexible.
  4. Customizable.


  ## Props
 
#### `bind:controller`

A way to interact with controller instance.
- _type:_  `HTMLElement`
- _default:_ ` {}`

```svelte
<script>
...
let controller: HTMLElement = {};
$:console.dir(controller) // Output: DOM element object
</script>

<AudioPlayer {url} bind:controller={controller}/>
```

#### `bind:audio`

A way to interact with audio instance.
- _type:_ ` HTMLAudioElement `
- _default:_ `{}`

```svelte
<script>
...
let audio: HTMLMediaElement = {};
$:console.dir(audio) // Output: audio element object
</script>

<AudioPlayer {url} bind:audio={audio}/>
```

#### `class`

Any global class name for styling your player
- _type:_ `string`
- _default:_ empty string 

#### `disableVolSlider`

Removes volume control slider if true.
- _type:_ `boolean`
- _default:_ `false`

#### `color`

coloring the outlines and buttons
- _type:_ `string`
- _default:_ `'black'`

#### `enableMediaSession`

If true, lets users control playback of media through user-agent defined interface elements (media notification). Interaction with these elements triggers action handlers in the web page, playing the media. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)
- _type:_ `boolean`
- _default:_ `true`

#### `loop`

playback same audio every time or all audio in a loop.
- _type:_ ` 'repeat-all', 'repeat', 'no-repeat'` 
- _default:_ ` 'no-repeat' `

#### `mediaMetadata`

An array of MediaMetadata which lets a web site provide rich metadata to the platform UI for media that is playing. This metadata includes the title, artist (creator) name, album (collection), and artwork. The platform can show this metadata in media centers, notifications, device lockscreens, etc. See: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata)
- _type:_ `MediaMetadataInit []`
- _default:_ ` [] `

#### `showNext`

hides next button if false.
- _type:_ `boolean`
- _default:_ `true`

#### `showPrev`

hides previous button if false.
- _type:_ `boolean`
- _default:_ `true`

#### `showTime`

display current time and duration of an audio.
- _type:_ `boolean`
- _default:_ `true`

#### `showTrackNum`

display currently playing track number.
- _type:_ `boolean`
- _default:_ `true`

#### `showShuffle`

display shuffle button if true.
- _type:_ `boolean`
- _default:_ `true`

#### `showVolume`

display speaker icon and volume control slider if true.
- _type:_ `boolean`
- _default:_ `true`

#### `shuffle`

playback random track number if true.
- _type:_ `boolean`
- _default:_ `true`

#### `style`

- _type:_ `string`
- _default:_ empty string

#### `urls`

array of audio source/url
- _type:_ `string []`
- _default:_ `[]`


#### `volume`

value between 0 to 1.
- _type:_ `number`
- _default:_ `1`

## API
name  | type |  default | desc  |
--- | --- | --- | --- |
isPlaying| writable store Boolean  | false | a global writable svelte store for checking and setting audio playback.
trackIndex |  writable store number | 0 | currently playing track number.
state | writable store  'repeat-all', 'repeat', 'no-repeat' | 'no-repeat' | looping values.
PlayIcon  | svelte component |   |    | 
  PauseIcon | svelte component |   |    |
PreviousIcon  | svelte component |   |    |
NextIcon  | svelte component |   |    |
ShuffleIcon | svelte component |   |    |
RepeatIcon  | svelte component |   |    |
RepeatOnceIcon  | svelte component |   |    |
NoRepeatIcon | svelte component |   |    |

With global stores you can import them from any svelte component to configure audio player.

## Events

svelte mp3 supports almost all events of audio tag. events are forwarded by event dispatcher.
see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#events).

**Note**: To access ```target``` inside of event object you need to write ```event.detail.target``` instead of ```event.target```.

name  |
--- |
`canplay`  |
`canplaythrough`  |
`durationchange`  |
`ended` |
`loadeddata` |
`playing` |
`ratechange` |
`stalled` |
`suspend` |
`timeupdate` |
`volumechange` |
`waiting` |


