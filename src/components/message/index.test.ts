import Message from './index';
import { expect } from 'chai';

describe('Message', () => {
    it('should render', () => {
        new Message({});
    });

    it('should render with class name "message_from" if error is true', () => {
        const message = new Message({ from: 123 });

        expect(message.element?.classList.contains('message_from')).to.eq(true);
    });
});
