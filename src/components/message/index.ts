import template from './message.hbs';
import Component from '../../utils/Component';
import indicator from '../../../static/icons/indicator.svg';

interface IPropsMessage {
    from?: string | null,
    images?: string[],
    files?: string[],
    message?: string,
    indicator?: string,
    time: string,
}

export default class Message extends Component<IPropsMessage> {
    init() {
        this.props.indicator = indicator;
    }

    render() {
        return this.compile(template, this.props);
    }
}
