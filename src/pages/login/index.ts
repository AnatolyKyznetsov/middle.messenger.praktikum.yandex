import template from './login.hbs';
import Component from '../../utils/Component';
import TitleMain from '../../components/title-main';
import Form from '../../components/form';
import Label from '../../components/label';
import Link from '../../components/link';
import AuthController from '../../controllers/AuthController';
import ISigninData from '../../interfaces/ISigninData';
import { Routes } from '../../utils/Router';
import { INPUTS } from '../../config';

const link = new Link({
    page: Routes.SignUp,
    content: [ 'Eщё не зарегистрированы?' ],
    className: 'link shape__link'
});

const form = new Form({
    buttonLable: 'Войти',
    content: [
        new Label(INPUTS.LOGIN),
        new Label(INPUTS.PASSWORD),
    ],
    callback: (data: ISigninData) => {
        AuthController.signin(data);
    }
});

const title = new TitleMain({
    className: 'shape__title shape__title_big',
    text: 'Вход',
});

export default class Login extends Component {
    init() {
        this.children.title = title;
        this.children.form = form;
        this.children.link = link;
    }

    render() {
        return this.compile(template, this.props);
    }
}
