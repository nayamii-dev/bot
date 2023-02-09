import { CustomEvent, CustomEventOptions } from '@naya/events/Event';


interface QueryEvent {
    query: string;
    timestamp: Date;
    duration: number;
    params: string;
    target: string;
}

@CustomEvent.applyOptions<CustomEventOptions>({
    event: 'query',
    handler: 'prisma',
    id: 'events.prisma.query',
    type: 'on'
})
export default class PrismaQueryEvent extends CustomEvent {
    run(eventData: QueryEvent) {
        let db = eventData.query.split('.')[1];
        if (eventData.query.includes(`${db}.aggregate`)) {
            db = `${db} [aggregation] `;
        }
        this.client.logger.log({
            content: `new query on db ${db}  `,
            issuer: `${eventData.target}`
        });

    }

}
