import Input from './index';
import { expect } from 'chai';

describe('Input', () => {
    const value = 'test';
    const placeholder = 'test';
    const name = 'test';
    const className = 'test';
    const type = 'submit';
    const accept = 'image/png';
    const repeat = 'password';

    it('should render', () => {
        new Input({});
    });

    it('should render with passed class name', () => {
        const input = new Input({ className });

        expect(input.element?.classList.contains(className)).to.eq(true);
    });

    it('should render with class name "not-empty" if notEmpty is true', () => {
        const input = new Input({ notEmpty: true });

        expect(input.element?.classList.contains('not-empty')).to.eq(true);
    });

    it('should render passed type', () => {
        const input = new Input({ type });

        expect(input.element?.getAttribute('type')).to.eq(type);
    });

    it('should render passed name', () => {
        const input = new Input({ name });

        expect(input.element?.getAttribute('name')).to.eq(name);
    });

    it('should render passed value', () => {
        const input = new Input({ value });

        expect(input.element?.getAttribute('value')).to.eq(value);
    });

    it('should render passed placeholder', () => {
        const input = new Input({ placeholder });

        expect(input.element?.getAttribute('placeholder')).to.eq(placeholder);
    });

    it('should render passed accept', () => {
        const input = new Input({ accept });

        expect(input.element?.getAttribute('accept')).to.eq(accept);
    });

    it('should render passed repeat', () => {
        const input = new Input({ repeat });

        expect((input.element as HTMLElement).dataset.repeat).to.eq(repeat);
    });
});
