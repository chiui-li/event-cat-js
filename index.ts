interface EventCatMap {
    [eventName: string]: Array<(...args: any[]) => unknown>;
}

/**
 *  EventCat
 */
class EventCat {
    static __global_instance: EventCat | null = null;
    static get event() {
        if (EventCat.__global_instance === null) {
            EventCat.__global_instance = new EventCat();
        }
        return EventCat.__global_instance;
    }

    static create() {
        return new EventCat()
    }

    private eventsMap: EventCatMap = {}

    constructor() { }

    on = (eventName: string, callback: EventCatMap[string][0]) => {
        const { eventsMap } = this
        if (!Array.isArray(eventsMap[eventName])) {
            eventsMap[eventName] = [];
        }
        if (typeof callback !== 'function') {
            console.log(`EventCat: ${eventName} callback is not a function`)
            return
        }
        eventsMap[eventName].push(callback);
    }

    emit = (eventName: string, ...args: unknown[]) => {
        const { eventsMap } = this
        if (Array.isArray(eventsMap[eventName]) && eventsMap[eventName].length) {
            eventsMap[eventName].forEach((callback) => {
                callback(...args);
            });
        } else {
            const errorMessage = `EventCat: ${eventName} is not registered`
            return new Error(errorMessage)
        }
    }

    off = (eventName: string, callback: EventCatMap[string][0]) => {
        const { eventsMap } = this
        if (Array.isArray(eventsMap[eventName])) {
            eventsMap[eventName] = eventsMap[eventName]
                .filter((callbackInner) => callbackInner !== callback);
        }
    }

    once = (eventName: string, callback: EventCatMap[string][0]) => {
        const { eventsMap } = this
        const onceCallback = (...args: unknown[]) => {
            callback(...args);
            this.off(eventName, onceCallback);
        };
        if (!eventsMap[eventName]) {
            eventsMap[eventName] = []
        }
        eventsMap[eventName].push(onceCallback);
    }

    clear = (eventKey?: string) => {
        if (eventKey) {
            this.eventsMap[eventKey] = []
        } else {
            this.eventsMap = {}
        }
    }
}

export default EventCat