import { expect } from 'chai';
import Chat from './index';

describe('Chat', () => {
    const name = 'test';

    it('should render', () => {
        new Chat({ name: 'test' });
    });

    it('should render with class name "chats__item_active" if isActive is true', () => {
        const button = new Chat({ name, isActive: true });

        expect(button.element?.classList.contains('chats__item_active')).to.eq(true);
    });
});
