// Occurs when the group is loaded
export const SMALL_GROUP_LOADED = "SMALL_GROUP_LOADED";

// Occurs when the group is changed
export const SMALL_GROUP_CHANGE = "SMALL_GROUP_CHANGE";

// Occurs when the event need to be edited
export const EDIT_EVENT = "EDIT_EVENT";

// Occurs when the return button is pressed to the calendar view
export const RETURN_EDIT_EVENT_PAGE = "RETURN_EDIT_EVENT_PAGE";

// Occurs when the presence must be shuffled
export const OPEN_SHUFFLE_DIALOG = "OPEN_SHUFFLE_DIALOG";

// Occurs when the presence must be shuffled
export const CLOSE_SHUFFLE_DIALOG = "CLOSE_SHUFFLE_DIALOG";

// Occurs when the presence img must be seen in separete dialog
export const OPEN_IMG_DIALOG = "OPEN_IMG_DIALOG";

// Occurs when the presence img dialog must be closed and deleted
export const CLOSE_IMG_DIALOG_DELETE = "CLOSE_IMG_DIALOG_DELETE";




export interface HubEvent {
    eventId: string;
    function: Function;
    args?: any;
};