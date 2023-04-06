import { expect } from 'chai';
import Button from './index';
import Text from '../text';

describe('Button', () => {
    const type = 'submit';
    const className = 'test';
    const label = 'Test';
    const text = new Text({});

    it('should render', () => {
        new Button({});
    });

    it('should render with passed class name', () => {
        const button = new Button({ className });

        expect(button.element?.classList.contains(className)).to.eq(true);
    });

    it('should render with class name "button_transparent" if transparent is true', () => {
        const button = new Button({ transparent: true });

        expect(button.element?.classList.contains('button_transparent')).to.eq(true);
    });

    it('should render passed label: text', () => {
        const button = new Button({ label });

        expect(button.element?.textContent?.trim()).to.eq(label);
    });

    it('should render passed label: Component', () => {
        const button = new Button({ label: text });

        expect(button.element?.innerHTML.trim()).to.eq(text.element?.outerHTML);
    });

    it('should render passed type', () => {
        const button = new Button({ type });

        expect(button.element?.getAttribute('type')).to.eq(type);
    });
});
