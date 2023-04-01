import { expect } from 'chai';
import AttachFile from './index';

describe('AttachFile', () => {
    const text = 'Test';
    const name = 'test';
    const accept = 'image/png';

    it('should render', () => {
        new AttachFile({ text, name });
    });

    it('should render passed text', () => {
        const attachFile = new AttachFile({ text, name });

        expect(attachFile.element?.textContent?.trim()).to.eq(text);
    });

    it('should render input with passed name', () => {
        const attachFile = new AttachFile({ text, name });
        const input = attachFile.element?.querySelector('input');

        expect(input?.name).to.eq(name);
    });

    it('should render input with passed accept', () => {
        const attachFile = new AttachFile({ text, name, accept });
        const input = attachFile.element?.querySelector('input');

        expect(input?.accept).to.eq(accept);
    });
});
