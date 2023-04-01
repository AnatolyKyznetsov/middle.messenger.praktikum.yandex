import { expect } from 'chai';
import TitleMain from './index';

describe('TitleMain', () => {
    const className = 'test';
    const text = 'test';

    it('should render', () => {
        new TitleMain({});
    });

    it('should render with passed class name', () => {
        const titleMain = new TitleMain({ className, text });

        expect(titleMain.element?.classList.contains(className)).to.eq(true);
    });

    it('should render with passed text', () => {
        const titleMain = new TitleMain({ className, text });

        expect(titleMain.element?.textContent?.trim()).to.eq(text);
    });
});
