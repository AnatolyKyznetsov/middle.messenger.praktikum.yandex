import template from './404.hbs';
import Component from '../../utils/Component';
import TitleMain from '../../components/title-main';
import Text from '../../components/text';
import Link from '../../components/link';
import { Routes } from '../../utils/Router';

const link = new Link({
    page: Routes.Messenger,
    content: [ 'Назад к чатам' ],
    className: 'link'
});

const text = new Text({
    className: 'error-page__text',
    text: 'Не туда попали'
});

const title = new TitleMain({
    className: 'shape__title',
    text: '404'
});

export default class Page404 extends Component {
    init() {
        this.children.title = title;
        this.children.text = text;
        this.children.link = link;
    }

    render() {
        return this.compile(template, this.props);
    }
}
