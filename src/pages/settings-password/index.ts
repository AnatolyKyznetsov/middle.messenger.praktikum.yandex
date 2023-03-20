import template from './settings-password.hbs';
import Component from '../../utils/Component';
import ButtonBack from '../../components/button-back';
import Form from '../../components/form';
import Label from '../../components/label';
import withStore from '../../hocs/withStore';
import IState from '../../interfaces/IState';
import IPasswords from '../../interfaces/IPasswords';
import UserController from '../../controllers/UserController';
import { Routes } from '../../utils/Router';
import { INPUTS } from '../../config';

const buttonBack = new ButtonBack({
    page: Routes.Profile,
});

const form = new Form({
    buttonLable: 'Сохранить',
    content: [
        new Label(INPUTS.OLD_PASSWORD),
        new Label(INPUTS.NEW_PASSWORD),
        new Label(INPUTS.NEW_PASSWORD_REPEAT),
    ],
    callback: (data: IPasswords) => {
        UserController.changePassword(data);
    }
});

class SettingsPassword extends Component {
    init() {
        this.children.buttonBack = buttonBack;
        this.children.form = form;
    }

    render() {
        form.setProps({
            error: this.props.error,
            status: this.props.status,
        });

        return this.compile(template, this.props);
    }
}

export default withStore((state: IState) => {
    return state.user || {};
})(SettingsPassword);
