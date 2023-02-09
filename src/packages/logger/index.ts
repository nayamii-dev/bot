import { createEnum } from '@naya/util/funcs';


export const LoggerTypes = createEnum([
    'LOG', 'ERROR', 'INFO',
    'FATAL'
]);
export type LoggerType = keyof typeof LoggerTypes;


export class Logger {
    constructor(readonly label: string, readonly file: boolean) { }


    log({ content, issuer }: { content: string; issuer?: string; }): void {
        return this.write({ content: issuer ? `[${issuer}]: ${content}` : content, type: LoggerTypes.LOG });
    }

    error({
        error,
        issuer,
        errorCode
    }: {
        error: Error;
        issuer?: string;
        errorCode: string;
    }) {

        return this.write({ content: `[${errorCode}]: ${error} `, type: LoggerTypes.ERROR, issuer });
    }




    public write({
        content,
        type,
        issuer,
        timezone = 'en-gb'
    }: {
        content: string;
        type: LoggerType;
        issuer?: string;
        timezone?: string;
    }) {

        const time = new Intl.DateTimeFormat(process.env.TZ || timezone || 'en-gb', { hour: '2-digit', minute: '2-digit' }).format(new Date());


        return console.log(` ${this.label} --| [${time}] <${type}>${issuer ? ` [${issuer}]` : ''}:: ${content}`);
    }




}


