import Modal from './index';
import Text from '../text';
import { expect } from 'chai';

describe('Modal', () => {
    const name = 'test';

    it('should render', () => {
        new Modal({ name: 'test', title: 'Test', content: [ new Text({}) ] });
    });

    it('should render with class name "isActive" if modal_active is true', () => {
        const modal = new Modal({ isActive: true });

        expect(modal.element?.classList.contains('modal_active')).to.eq(true);
    });

    it('should render with passed name', () => {
        const modal = new Modal({ name });

        expect((modal.element as HTMLElement).dataset.name).to.eq(name);
    });
});
