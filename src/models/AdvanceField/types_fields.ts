export enum FieldType {
    TEXT = "TEXT",
    OPTION = "OPTION",
    YEAR = "YEAR",
    DROPDOWN = "DROPDOWN",
}

export enum TextType {
    TEXT = "TEXT",
    NUMBER = "NUMBER",
}

export enum EColumn {
    ONE_THIRD = 4,
    ONE_QUARTER = 3,
    HALF = 6,
    FULL = 12,
}

export interface Reference {
    name: string;
    option: string[]
}

export interface RequireOption {
    [name: string]: string[];
}

export interface Depend {
    [name: string]: Array<string>
}