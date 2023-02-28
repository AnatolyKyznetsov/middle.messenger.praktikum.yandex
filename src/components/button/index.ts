import template from './button.hbs';
import Component from '../../utils/Component';

interface IPropsButton {
    label?: string | Component,
    transparent?: boolean,
    className?: string,
    type?: string,
    events?: {
        click: () => void,
    },
}

export default class Button extends Component<IPropsButton> {
    render() {
        return this.compile(template, this.props);
    }
}
