import template from './profile-change-password.hbs';
import Component from '../../utils/Component';
import ButtonBack from '../../components/button-back';
import Form from '../../components/form';
import Label from '../../components/label';
import IInputData from '../../interfaces/IInputData';
import inputs from '../../../static/data/inputs.json';
import TestNav from '../../components/test-nav';

const testNav = new TestNav();

const inputsData: IInputData[] = inputs.data.filter(item =>
    item.name == 'oldPassword' ||
    item.name == 'newPassword' ||
    item.repeat == 'newPassword'
);

const formLabels: Component[] = [];

inputsData.forEach(item => {
    const label = new Label({
        text: item.text,
        name: item.name,
        type: item.type,
        attrs: item.attrs,
        repeat: item.repeat,
        pattern: item.pattern,
        value: item.value,
        tooltip: item.tooltip,
    });

    formLabels.push(label);
});

const buttonBack = new ButtonBack({
    page: 'profile',
});

const form = new Form({
    buttonLable: 'Сохранить',
    content: formLabels,
});

export default class ProfileChangePassword extends Component {
    init() {
        this.children.buttonBack = buttonBack;
        this.children.form = form;
        this.children.testNav = testNav;
    }

    render() {
        return this.compile(template, this.props);
    }
}
