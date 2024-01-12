import { event } from "./event";
import { participant } from "./participant";

export interface group {
    id: string;
    name: string;
    participants: participant[];
    events: event[];
}

export const emptyGroup: group = {
    id: "",
    name: "",
    participants: [],
    events: [],
}