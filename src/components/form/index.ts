import template from './form.hbs';
import Component from '../../utils/Component';
import Button from '../button';
import Icon from '../icon';
import arrow from '../../../static/icons/arrow.svg';
import withStore from '../../hocs/withStore';
import IState from '../../interfaces/IState';
import FormController from '../../controllers/FormController';
import UserController from '../../controllers/UserController';

interface IPropsForm {
    action?: string,
    name?: string,
    className?: string,
    method?: string,
    content: Component[],
    buttonLable?: string,
    iconButton?: boolean,
    error?: boolean,
    status?: string,
    events?: {
        submit: (e: Event) => void,
    },
    callback?: (data: unknown) => void,
}

class Form extends Component<IPropsForm> {
    init() {
        const isIconButton: boolean | undefined = this.props.iconButton;

        this.props.events = {
            submit: (e: Event) => {
                e.preventDefault();

                const data: Record<string, string | null> | undefined = FormController.validate(this);

                if (data && this.props.callback) {
                    this.props.callback(data);
                }
            },
            ...this.props.events,
        };

        this.children.submit = new Button({
            label: isIconButton ? new Icon({
                src: arrow,
                className: 'form__icon',
                alt: 'Отправить.',
            }) : this.props.buttonLable,
            className: isIconButton ? 'button_icon' : 'form__button',
            type: 'submit',
        });
    }

    componentDidMount() {
        UserController.clearMessage();
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withStore((state: IState) => {
    return state.user || {};
})(Form as typeof Component);
