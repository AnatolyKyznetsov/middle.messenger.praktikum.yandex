import template from './menu.hbs';
import Component from '../../utils/Component';

interface IPropsMenu {
    icon: string,
    iconAlt?: string,
    posX?: 'left' | 'right',
    posY?: 'top' | 'bottom',
    content: Component[],
}

export default class Menu extends Component<IPropsMenu> {
    render() {
        return this.compile(template, this.props);
    }
}
