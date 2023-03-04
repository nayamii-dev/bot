

export class Markdown {

    static code(text: string, type: 'block' | 'inline', lang?: string): string {
        switch (type) {
            case 'block':
                return [
                    '```' + lang,
                    text,
                    '```'
                ].join('\n');
            case 'inline':
                return `\`${text}\``;
            default:
                throw RangeError('invalid type');
        }
    }
}
