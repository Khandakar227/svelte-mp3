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
export declare type NextIconProps = typeof __propDef.props;
export declare type NextIconEvents = typeof __propDef.events;
export declare type NextIconSlots = typeof __propDef.slots;
export default class NextIcon extends SvelteComponentTyped<NextIconProps, NextIconEvents, NextIconSlots> {
}
export {};
