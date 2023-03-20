import template from './settings.hbs';
import Component from '../../utils/Component';
import Avatar from '../../components/avatar';
import ButtonBack from '../../components/button-back';
import Form from '../../components/form';
import Label from '../../components/label';
import IUser from '../../interfaces/IUser';
import UserController from '../../controllers/UserController';
import { INPUTS } from '../../config';
import { Routes } from '../../utils/Router';

const avatar = new Avatar({
    className: 'profile__avatar',
    load: true,
    showAlt: true,
    big: true,
    events: {
        change(e: Event) {
            UserController.changeAvatar(e.target as HTMLInputElement);
        }
    }
});

const formLabels: Component[] = [
    new Label({ ...INPUTS.FIRST_NAME, notEmpty: true }),
    new Label({ ...INPUTS.SECOND_NAME, notEmpty: true }),
    new Label({ ...INPUTS.DISPLAY_NAME, notEmpty: true }),
    new Label({ ...INPUTS.LOGIN, notEmpty: true }),
    new Label({ ...INPUTS.EMAIL, notEmpty: true }),
    new Label({ ...INPUTS.PHONE, notEmpty: true }),
];

const buttonBack = new ButtonBack({
    page: Routes.Profile,
});

const form = new Form({
    buttonLable: 'Сохранить',
    content: formLabels,
    callback: (data: IUser) => {
        UserController.changeData(data);
    }
});

export default class Settings extends Component {
    init() {
        this.children.buttonBack = buttonBack;
        this.children.avatar = avatar;
        this.children.form = form;
    }

    componentDidMount() {
        formLabels.forEach(label => {
            const labelName: keyof IUser = label.getProp('name');

            (label.children.input as Component).setProps({
                value: UserController.getData(labelName),
            });
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
