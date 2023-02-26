import template from './button-back.hbs';
import Component from '../../utils/Component';
import Link from '../link';
import Icon from '../icon';
import arrow from '../../../static/icons/arrow.svg';

export default class ButtonBack extends Component {
    init() {
        this.children.content = new Link({
            className: 'shape__back',
            content: [
                new Icon({
                    src: arrow,
                    alt: 'Назад.',
                }),
            ],
            page: this.props.page,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
