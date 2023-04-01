import { expect } from 'chai';
import TitleSection from './index';

describe('TitleSection', () => {
    const className = 'test';
    const text = 'test';

    it('should render', () => {
        new TitleSection({});
    });

    it('should render with passed class name', () => {
        const titleSection = new TitleSection({ className, text });

        expect(titleSection.element?.classList.contains(className)).to.eq(true);
    });

    it('should render with passed text', () => {
        const titleSection = new TitleSection({ className, text });

        expect(titleSection.element?.textContent?.trim()).to.eq(text);
    });
});
