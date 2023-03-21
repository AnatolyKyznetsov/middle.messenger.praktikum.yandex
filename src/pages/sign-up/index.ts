import template from './sign-up.hbs';
import Component from '../../utils/Component';
import TitleMain from '../../components/title-main';
import Form from '../../components/form';
import Label from '../../components/label';
import Link from '../../components/link';
import AuthController from '../../controllers/AuthController';
import ISignupData from '../../interfaces/ISignupData';
import { Routes } from '../../utils/Router';
import { INPUTS } from '../../config';

const link = new Link({
    page: Routes.Index,
    content: [ 'Войти' ],
    className: 'link shape__link'
});

const form = new Form({
    buttonLable: 'Зарегистрироваться',
    content: [
        new Label(INPUTS.FIRST_NAME),
        new Label(INPUTS.SECOND_NAME),
        new Label(INPUTS.LOGIN),
        new Label(INPUTS.EMAIL),
        new Label(INPUTS.PHONE),
        new Label(INPUTS.PASSWORD),
        new Label(INPUTS.PASSWORD_REPEAT),
    ],
    callback: (data: ISignupData) => {
        AuthController.signup(data)
    }
});

const title = new TitleMain({
    className: 'shape__title shape__title_big',
    text: 'Регистрация',
});

export default class SignUp extends Component {
    init() {
        this.children.title = title;
        this.children.form = form;
        this.children.link = link;
    }

    render() {
        return this.compile(template, this.props);
    }
}
