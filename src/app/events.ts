// Occurs when the group is loaded
export const SMALL_GROUP_LOADED = "SMALL_GROUP_LOADED";

// Occurs when the group is changed
export const SMALL_GROUP_CHANGE = "SMALL_GROUP_CHANGE";

// Occurs when the event need to be edited
export const EDIT_EVENT = "EDIT_EVENT";




export interface HubEvent {
    eventId: string;
    function: Function;
    args?: any;
};