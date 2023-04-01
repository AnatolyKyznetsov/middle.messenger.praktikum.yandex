import { expect } from 'chai';
import sinon from 'sinon';
import EventBus from './EventBus';

describe('EventBus', () => {
    const event = 'test';
    const callback = sinon.stub();

    beforeEach(() => {
        callback.resetHistory();
    });

    it('should add and emit event', () => {
        const eventBus = new EventBus();

        eventBus.on(event, callback);
        eventBus.emit(event);

        expect(callback.callCount).to.eq(1);
    });

    it('should throw error if no event', () => {
        const eventBus = new EventBus();

        const tryOff = () => {
            eventBus.off(event, callback);
        };

        expect(tryOff).to.throw(Error, event)
    });

    it('should remove event', () => {
        const eventBus = new EventBus();

        eventBus.on(event, callback);
        eventBus.off(event, callback);
        eventBus.emit(event);

        expect(callback.callCount).to.eq(0);
    });
});
