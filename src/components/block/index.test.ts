import { expect } from 'chai';
import Block from './index';
import Text from '../text';

describe('Block', () => {
    const className = 'test';
    const text = new Text({});

    it('should render', () => {
        new Block({});
    });

    it('should render with passed class name', () => {
        const block = new Block({ className });

        expect(block.element?.classList.contains(className)).to.eq(true);
    });

    it('should render passed content', () => {
        const block = new Block({ content: [ text ] });

        expect(block.element?.innerHTML.trim()).to.eq(text.element?.outerHTML);
    });
});
