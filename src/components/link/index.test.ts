import { BaseLink as Link } from './index';
import { expect } from 'chai';
import Router, { Routes } from '../../utils/Router';
import sinon from 'sinon';
import Text from '../text';

describe('Link', () => {
    const text = new Text({});
    const content = [ 'Home' ];
    const page = Routes.Index;
    const callback = sinon.stub();
    const router = { go: callback } as unknown as typeof Router;

    it('should render', () => {
        new Link({ content, page, router });
    });

    it('should render passed content: text', () => {
        const link = new Link({ content, page, router });

        expect(link.element?.textContent?.trim()).to.eq(content[0]);
    });

    it('should render passed content: Component', () => {
        const link = new Link({ content: [ text ], page, router });

        expect(link.element?.innerHTML.trim()).to.eq(text.element?.outerHTML);
    });

    it('should call Router.go with passed route on click', () => {
        const link = new Link({ content, page, router });

        (link.element as HTMLElement).click();

        expect(callback.calledWith(Routes.Index)).to.eq(true);
    });
});
