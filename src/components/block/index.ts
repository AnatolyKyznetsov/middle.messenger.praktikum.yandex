import template from './block.hbs';
import Component from '../../utils/Component';

interface IPropsBlock {
    className?: string,
    content?: Component[],
}

export default class Block extends Component<IPropsBlock> {
    render() {
        return this.compile(template, this.props);
    }
}
