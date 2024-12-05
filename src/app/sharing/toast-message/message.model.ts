export enum Severity {
    INFO,
    WARNING,
    ERROR,
    SUCCESS
}

export class Message {
 
    constructor(
    public message: string,
    public severity: Severity) {}

    public static createSuccessfulMessage(message: string) {
        return new Message(message, Severity.SUCCESS);
    }

    public static createSimpleErrorMessage(message: string) {
        return new Message(message, Severity.ERROR);
    }

    public static createSimpleInfoMessage(message: string) {
        return new Message(message, Severity.INFO);
    }
    
}