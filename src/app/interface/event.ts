import { uuidv4 } from "../helpers/general";
import { participant } from "./participant";

export interface event {
    id: string;
    dateStr: string;
    title: string;
    description: string;    
    presence: string[];
    frequencyFlag: boolean;
}


export const createEmptyEvent = () => {
    return {
        id: uuidv4(),
        dateStr: new Date().toISOString(),
        title: "",
        description: "",        
        presence: [],
        frequencyFlag: false,
    }
}