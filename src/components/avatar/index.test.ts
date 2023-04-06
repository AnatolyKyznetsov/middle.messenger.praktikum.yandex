import { expect } from 'chai';
import Avatar from './index';

describe('Avatar', () => {
    const display_name = 'Test';
    const className = 'test';

    it('should render', () => {
        new Avatar({});
    });

    it('should render first letter of display_name', () => {
        const avatar = new Avatar({});
        avatar.setProps({ display_name });
        const elem = avatar.element?.querySelector('.avatar__letter');

        expect(elem?.textContent?.trim()).to.eq(display_name[0]);
    });

    it('should render with passed class name', () => {
        const avatar = new Avatar({ className });

        expect(avatar.element?.classList.contains(className)).to.eq(true);
    });

    it('should render with class name "avatar_big" if big is true', () => {
        const avatar = new Avatar({ big: true });

        expect(avatar.element?.classList.contains('avatar_big')).to.eq(true);
    });

    it('should render input type file if load is true', () => {
        const avatar = new Avatar({ load: true });

        expect(avatar.element?.querySelector('input')?.type).to.eq('file');
    });
});
