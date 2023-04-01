import Router, { Routes } from './Router';
import { expect } from 'chai';
import sinon from 'sinon';
import Component from './Component';

describe('Router', () => {
    const originalBack = global.window.history.back;
    const originalForward = global.window.history.forward;
    const getContentFake = sinon.fake.returns(document.createElement('div'));
    const dispatchComponentDidMountFake = sinon.stub();

    const ComponentMoch = class {
        getContent = getContentFake;
        dispatchComponentDidMount = dispatchComponentDidMountFake;
    } as unknown as typeof Component;

    before(() => {
        global.window.history.back = () => {
            if (typeof window.onpopstate === 'function') {
                window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
            }
        };

        global.window.history.forward = () => {
            if (typeof window.onpopstate === 'function') {
                window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
            }
        }
    });

    after(() => {
        global.window.history.back = originalBack;
        global.window.history.forward = originalForward;
    });

    beforeEach(() => {
        getContentFake.resetHistory();
    });

    it('use() should return Router instance', () => {
        const result = Router.use(Routes.Index, ComponentMoch);

        expect(result).to.eq(Router);
    });

    it('should render a page on history back action', () => {
        Router
            .use(Routes.Index, ComponentMoch)
            .start();

        Router.back();

        expect(getContentFake.callCount).to.eq(2);
    });

    it('should render a page on history forward action', () => {
        Router
            .use(Routes.Index, ComponentMoch)
            .start();

        Router.forward();

        expect(getContentFake.callCount).to.eq(2);
    });

    it('should render a page on go action', () => {
        Router
            .use(Routes.Index, ComponentMoch)
            .start();

        Router.go(Routes.Index);

        expect(getContentFake.callCount).to.eq(2);
    });

    it('should render a page on start', () => {
        Router
            .use(Routes.Index, ComponentMoch)
            .start();

        expect(getContentFake.callCount).to.eq(1);
    });
});
