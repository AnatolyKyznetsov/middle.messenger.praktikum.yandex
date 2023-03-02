import template from './tooltip.hbs';
import Component from '../../utils/Component';

interface IPropsTooltip {
    className?: string,
    posX?: 'left' | 'right',
    posY?: 'top' | 'bottom',
    text: string,
}

export default class Tooltip extends Component<IPropsTooltip> {
    render() {
        return this.compile(template, this.props);
    }
}
