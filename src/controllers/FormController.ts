import Input from '../components/input';
import Component from '../utils/Component';
import ValidateController from './ValidateController';

export class FormController {
    private _inputs: Component[];

    constructor() {
        this._inputs = [];
    }

    validate(component: Component): Record<string, string | null> | undefined {
        this._inputs.length = 0;

        let isAllValid = true;
        const content: Component | Component[] = component.children.content;
        const data: Record<string, string | null> = {};

        if (Array.isArray(content)) {
            content.forEach((item :Component | Component[]) => {
                this.findInput(item);
            });

            for (let i = 0; i < this._inputs.length; i++) {
                const element: HTMLInputElement = <HTMLInputElement>this._inputs[i].getContent();

                isAllValid = ValidateController.call(this._inputs[i]);

                if (!isAllValid) {
                    break;
                }

                if (element.name && element.value) {
                    data[element.name] = element.value;
                }
            }

            return isAllValid ? data : undefined;
        }
    }

    findInput(component: Component | Component[]): void {
        if (Array.isArray(component)) {
            for (let i = 0; i < component.length; i++) {
                this.findInput(component[i]);
            }
        } else {
            if (component.getContent()?.tagName === 'INPUT') {
                this._inputs.push(component);
            } else {
                const childrens = Object.values(component.children);

                for (let i = 0; i < childrens.length; i++) {
                    this.findInput(childrens[i]);
                }
            }
        }
    }

    getInput(component: Component): Component {
        this._inputs.length = 0;

        this.findInput(component);

        return this._inputs[0];
    }

    clearForm(): void {
        this._inputs.forEach((input) => {
            (input as Input).clear();
        });
    }
}

export default new FormController();
