import { expect } from 'chai';
import Text from './index';

describe('Text', () => {
    const className = 'test';
    const text = 'test';

    it('should render', () => {
        new Text({ className, text });
    });

    it('should render with passed class name', () => {
        const elem = new Text({ className, text });

        expect(elem.element?.classList.contains(className)).to.eq(true);
    });

    it('should render with passed text', () => {
        const elem = new Text({ className, text });

        expect(elem.element?.textContent?.trim()).to.eq(text);
    });
});
