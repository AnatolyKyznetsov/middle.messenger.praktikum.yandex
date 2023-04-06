import { expect } from 'chai';
import Input from '../input';
import sinon from 'sinon';
import Form from './index';

describe('Form', () => {
    const content = [ new Input({}) ];
    const action = 'test';
    const method = 'post';
    const name = 'test';
    const callback = sinon.spy();

    it('should render', () => {
        new Form({ content });
    });

    it('should render with passed action', () => {
        const form = new Form({ content, action });

        expect(form.element?.getAttribute('action')).to.eq(action);
    });

    it('should render with passed name', () => {
        const form = new Form({ content, name });

        expect(form.element?.getAttribute('name')).to.eq(name);
    });

    it('should render with passed method', () => {
        const form = new Form({ content, method });

        expect(form.element?.getAttribute('method')).to.eq(method);
    });

    it('should callback on submit', () => {
        const form = new Form({ content, callback });

        (form.element as HTMLFormElement).requestSubmit();

        expect(callback.called).to.eq(true);

    });
});
