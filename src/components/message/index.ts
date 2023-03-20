import template from './message.hbs';
import Component from '../../utils/Component';
import indicator from '../../../static/icons/indicator.svg';
import UserController from '../../controllers/UserController';

interface IPropsMessage {
    sender?: string | null,
    from?: number | null,
    images?: string[],
    files?: string[],
    message?: string,
    indicator?: string,
    time?: string,
}

export default class Message extends Component<IPropsMessage> {
    init() {
        this.props.indicator = indicator;
    }

    async componentDidUpdate() {
        if (this.props.from) {
            this.props.sender = await UserController.getFriendName(this.props.from);
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
