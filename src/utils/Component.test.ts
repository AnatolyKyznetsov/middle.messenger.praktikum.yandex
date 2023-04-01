import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type ComponentType from './Component';

const eventBusMock = {
    on: sinon.stub(),
    emit: sinon.stub(),
}

const { default: Component } = proxyquire('./Component', {
    './EventBus': {
        default: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        }
    }
}) as { default: typeof ComponentType }

describe('Component', () => {
    const key = 'test';
    const value = 123;
    const props: Record<string, number> = {};
    props[key] = value;

    beforeEach(() => {
        eventBusMock.emit.reset();
        eventBusMock.on.reset();
    });

    class ComponentMock extends Component {}

    it('should fire init event on initialization', () => {
        new ComponentMock(props);

        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
    });

    it('should return prop value by name', () => {
        const component = new ComponentMock(props);

        expect(component.getProp(key)).to.eq(value);
    });

    it('should add prop', () => {
        const component = new ComponentMock({});

        component.setProps(props);

        expect(component.getProp(key)).to.eq(value);
    });

    it('should fire update event after setting prop', () => {
        const component = new ComponentMock({});

        component.setProps(props);

        expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
    });

    it('should fire mount event on mount', () => {
        const component = new ComponentMock(props);

        component.dispatchComponentDidMount();

        expect(eventBusMock.emit.calledWith('flow:component-did-mount')).to.eq(true);
    });
});
