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
export declare type PauseIconProps = typeof __propDef.props;
export declare type PauseIconEvents = typeof __propDef.events;
export declare type PauseIconSlots = typeof __propDef.slots;
export default class PauseIcon extends SvelteComponentTyped<PauseIconProps, PauseIconEvents, PauseIconSlots> {
}
export {};
