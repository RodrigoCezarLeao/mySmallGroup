export interface group {
    id: string;
    name: string;
    participants: any;
}

export const emptyGroup: group = {
    id: "",
    name: "",
    participants: undefined,
}