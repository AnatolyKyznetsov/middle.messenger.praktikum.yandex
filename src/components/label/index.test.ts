import Label from './index';
import { expect } from 'chai';

describe('Label', () => {
    const className = 'test';

    it('should render', () => {
        new Label({});
    });

    it('should render with passed class name', () => {
        const label = new Label({ className });

        expect(label.element?.classList.contains(className)).to.eq(true);
    });

    it('should render with class name "error" if error is true', () => {
        const label = new Label({ error: true });

        expect(label.element?.classList.contains('error')).to.eq(true);
    });
});
