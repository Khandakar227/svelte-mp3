import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        color?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type PlayIconProps = typeof __propDef.props;
export declare type PlayIconEvents = typeof __propDef.events;
export declare type PlayIconSlots = typeof __propDef.slots;
export default class PlayIcon extends SvelteComponentTyped<PlayIconProps, PlayIconEvents, PlayIconSlots> {
}
export {};
