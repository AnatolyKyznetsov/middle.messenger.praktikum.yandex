import { expect } from 'chai';
import sinon from 'sinon';
import ModalController from '../../controllers/ModalController';
import ModalOpener from './index';

describe('ModalOpener', () => {
    const modalName = 'test';
    const label = 'Test';
    const className = 'test';
    const callback = sinon.spy();
    const openModal = sinon.spy(ModalController, 'open');

    it('should render', () => {
        new ModalOpener({ modalName, label });
    });

    it('should render with passed class name', () => {
        const modalOpener = new ModalOpener({ modalName, label, className });

        expect(modalOpener.element?.classList.contains(className)).to.eq(true);
    });

    it('should render with passed name', () => {
        const modalOpener = new ModalOpener({ modalName, label });

        expect((modalOpener.element as HTMLElement).dataset.modal).to.eq(modalName);
    });

    it('should callback on click', () => {
        const modalOpener = new ModalOpener({ modalName, label, callback });

        (modalOpener.element as HTMLElement).click();

        expect(callback.called).to.eq(true);
    });

    it('should call ModalController.open on click', () => {
        const modalOpener = new ModalOpener({ modalName, label, callback });

        (modalOpener.element as HTMLElement).click();

        expect(openModal.called).to.eq(true);
    });
});
