import { event } from "./event";
import { participant } from "./participant";

export interface group {
    id: string;
    name: string;
    participants: participant[];
    events: event[];
    template: Record<string, any>;
}

export const emptyGroup: group = {
    id: "",
    name: "",
    participants: [],
    events: [],
    template: {}
}