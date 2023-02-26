import template from './login.hbs';
import Component from '../../utils/Component';
import TitleMain from '../../components/title-main';
import Form from '../../components/form';
import Label from '../../components/label';
import Link from '../../components/link';
import IInputData from '../../interfaces/IInputData';
import inputs from '../../../static/data/inputs.json';
import TestNav from '../../components/test-nav';

const testNav = new TestNav();

const inputsData: IInputData[] = inputs.data.filter(item =>
    item.name === 'login' || item.name === 'password'
);

const link = new Link({
    page: 'registration',
    content: [ 'Eщё не зарегистрированы?' ],
    className: 'link shape__link'
});

const formLabels: Component[] = [];

inputsData.forEach(item => {
    const label = new Label({
        text: item.text,
        name: item.name,
        type: item.type,
        attrs: item.attrs,
        repeat: item.repeat,
        pattern: item.pattern,
        tooltip: item.tooltip
    });

    formLabels.push(label);
});

const form = new Form({
    buttonLable: 'Войти',
    content: formLabels
});

const title = new TitleMain({
    className: 'shape__title shape__title_big',
    text: 'Вход',
});

export default class Registration extends Component {
    init() {
        this.children.title = title;
        this.children.form = form;
        this.children.link = link;
        this.children.testNav = testNav;
    }

    render() {
        return this.compile(template, this.props);
    }
}
