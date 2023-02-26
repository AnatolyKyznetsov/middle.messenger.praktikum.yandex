import template from './form.hbs';
import Component from '../../utils/Component';
import Button from '../button';
import Icon from '../icon';
import inputValidator from '../../utils/inputValidator';
import arrow from '../../../static/icons/arrow.svg';

const inputs: Component[] = [];

function findInput(Component: Component | Component[]): void {
    if (Array.isArray(Component)) {
        for (let i = 0; i < Component.length; i++) {
            findInput(Component[i]);
        }
    } else {
        if (Component.getContent()?.tagName === 'INPUT') {
            inputs.push(Component);
        } else {
            const childrens = Object.values(Component.children);

            for (let i = 0; i < childrens.length; i++) {
                findInput(childrens[i]);
            }
        }
    }
}

export default class Form extends Component {
    init() {
        const isIconButton = this.props.iconButton;

        this.props.events = {
            ...this.props.events,
            submit: (e: Event) => {
                e.preventDefault();

                inputs.length = 0;
                const data: Record<string, string | FileList | null> = {};
                const content: Component | Component[] = this.children.content;
                let isAllValid = true;

                if (Array.isArray(content)) {
                    content.forEach((item :Component | Component[]) => {
                        findInput(item);
                    });

                    for (let i = 0; i < inputs.length; i++) {
                        const element: HTMLInputElement = <HTMLInputElement>inputs[i].getContent();

                        isAllValid = inputValidator(inputs[i]);

                        if (!isAllValid) {
                            break;
                        }

                        if (element.name && element.value) {
                            if (element.type === 'file') {
                                data[element.name] = element.files;
                            } else {
                                data[element.name] = element.value;
                            }
                        }
                    }

                    if (isAllValid) {
                        console.log(data);
                    }
                }
            }
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

    render() {
        return this.compile(template, this.props);
    }
}
