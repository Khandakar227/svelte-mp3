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
export declare type ShuffleIconProps = typeof __propDef.props;
export declare type ShuffleIconEvents = typeof __propDef.events;
export declare type ShuffleIconSlots = typeof __propDef.slots;
export default class ShuffleIcon extends SvelteComponentTyped<ShuffleIconProps, ShuffleIconEvents, ShuffleIconSlots> {
}
export {};
