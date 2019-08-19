export interface Data {
    [x: string]: any;
    contacts: Array<Contact>;
};

export interface Contact {
    id: string,
    name: string,
    email: string,
    creationDate?: string,
    modifiedDate?: string
}

export interface Input {
    name: string,
    email: string
}

export interface InputContact {
    name: string,
    email: string,
    id: string
}


export interface PopperProps {
    refreshData: () => void,
    contactId: string,
    close: () => void,
    open: boolean,
    anchorEl: any
} 