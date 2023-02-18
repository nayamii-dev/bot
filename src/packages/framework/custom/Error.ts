export class CustomError extends Error {}

export class EventEmitterError extends CustomError {
    constructor(event: string, message: string) {
        super(`[${event}] ${message} `);
    }
}
