import { expect } from 'chai';
import Icon from './index';

describe('Icon', () => {
    const src = 'test';
    const alt = 'test';
    const className = 'test';

    it('should render', () => {
        new Icon({ src });
    });

    it('should render with passed class name', () => {
        const icon = new Icon({ src, className });

        expect(icon.element?.classList.contains(className)).to.eq(true);
    });

    it('should render image with passed src', () => {
        const icon = new Icon({ src });
        const img = icon.element?.querySelector('img');

        expect(img?.getAttribute('src')).to.eq(src);
    });

    it('should render image with passed alt', () => {
        const icon = new Icon({ src, alt });
        const img = icon.element?.querySelector('img');

        expect(img?.getAttribute('alt')).to.eq(alt);
    });
});
