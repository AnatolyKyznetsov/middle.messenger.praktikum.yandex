import { expect } from 'chai';
import Tooltip from './index';

describe('Tooltip', () => {
    const className = 'test';
    const text = 'test';

    it('should render', () => {
        new Tooltip({ text: 'Test' });
    });

    it('should render with passed class name', () => {
        const tooltip = new Tooltip({ className, text });

        expect(tooltip.element?.classList.contains(className)).to.eq(true);
    });

    it('should render with passed text at data-text', () => {
        const tooltip = new Tooltip({ className, text });

        expect((tooltip.element as HTMLElement).dataset.text).to.eq(text);
    });
});
