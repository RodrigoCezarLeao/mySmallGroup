import { uuidv4 } from "../helpers/general";

export interface participant {
    id: string;
    name: string;
    alias: string;
    role: string;
}

export const createEmptyParticipant = () => {
    return {
        id: uuidv4(),
        name: "",
        alias: "",
        role: "",
    }
}