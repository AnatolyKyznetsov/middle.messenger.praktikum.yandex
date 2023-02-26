import EventBus from './EventBus';
import uuid from './uuid';

interface IChildren {
    [key: string]: Component | Component[],
}

export default class Component {
    static EVENTS: Record<string, string> = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    public id: string = uuid();
    private _eventBus: () => EventBus;
    private _element: Element | null = null;
    protected props: any;
    public children: IChildren;

    constructor(propsAndChildren: Record<string, any> | IChildren = {} ) {
        const eventBus = new EventBus();

        const { props, children } = this._getPropsAndChildren(propsAndChildren);

        this.children = children;

        this.props = this._makePropsProxy(props);

        this._eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Component.EVENTS.INIT);
    }

    private _getPropsAndChildren(propsAndChildrens: any): {props: Record<string, any>, children: IChildren} {
        const children: IChildren = {};
        const props: Record<string, any> = {};

        Object.entries(propsAndChildrens).forEach(([ key, value ]) => {
            if (Array.isArray(value) && value.every(e => e instanceof Component)) {
                children[key] = value;
            } else if (value instanceof Component) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children };
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Component.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _init(): void {
        this.init();
        this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }

    protected init(): void {}

    private _render() {
        const fragment: DocumentFragment = this.render();
        const newElement = fragment.firstChild as Element;

        if (this._element) {
            this._removeEvents();
            this._element.replaceWith(newElement!);
        }

        this._element = newElement;

        this._addEvents();
    }

    protected render(): DocumentFragment {
        return new DocumentFragment;
    }

    private _componentDidMount(): void {
        this.componentDidMount();
    }

    protected componentDidMount(): void {}

    public dispatchComponentDidMount(): void {
        this._eventBus().emit(Component.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach((child: Component | Component[]) => {
            if (Array.isArray(child)) {
                child.forEach(item => {
                    item.dispatchComponentDidMount();
                });
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    protected componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>): boolean {
        return oldProps !== newProps;
    }

    private _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) : void {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
        }
    }

    public getProp(prop: string): any {
        return this.props[prop];
    }

    private _makePropsProxy(props: any): void {
        const self = this;

        return new Proxy(props, {
            set(target: Record<string, any>, prop: string, value: any) {
                const oldProp: Record<string, any> = target[prop];

                target[prop] = value;

                self._eventBus().emit(Component.EVENTS.FLOW_CDU, oldProp, value);

                return true;
            },
            deleteProperty() {
                throw new Error('Ты не имеешь права. О ты не имеешь права!');
            }
        });
    }

    public setProps(nextProps: any): void {
        if (nextProps) {
            Object.assign(this.props, nextProps);
        }
    }

    public get element(): Element | null {
        return this._element;
    }

    public getContent(): Element | null {
        return this.element;
    }

    private _addEvents(): void {
        const { events = {} } = this.props as {events: Record<string, () => void>};

        Object.keys(events).forEach((event: string) => {
            this._element!.addEventListener(event, events[event]);
        });
    }

    private _removeEvents() {
        const { events = {} } = this.props as {events: Record<string, () => void>};

        Object.keys(events).forEach((event: string) => {
            this._element!.removeEventListener(event, events[event]);
        });
    }

    private _stubReplace(temp: HTMLTemplateElement, component: Component) {
        const stub: HTMLElement | null = temp.content.querySelector(`[data-id="${component.id}"]`);

        if (!stub) {
            return false;
        }

        stub.replaceWith(component.getContent()!);
    }

    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs: any = { ...context };

        Object.entries(this.children).forEach(([ name, component ]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component.map(child => `<div data-id=${child.id}></div>`);
            } else {
                contextAndStubs[name] = `<div data-id=${component.id}></div>`;
            }
        });

        const temp: HTMLTemplateElement = document.createElement('template');

        temp.innerHTML = template(contextAndStubs);

        Object.entries(this.children).forEach(([ _, component ]) => {
            if (Array.isArray(component)) {
                component.forEach(child => this._stubReplace(temp, child));
            } else {
                this._stubReplace(temp, component);
            }
        });

        return temp.content;
    }

    public show() {
        const element = this.getContent() as HTMLElement;

        element!.style.display = '';
    }

    public hide() {
        const element = this.getContent() as HTMLElement;

        element!.style.display = 'none';
    }
}
