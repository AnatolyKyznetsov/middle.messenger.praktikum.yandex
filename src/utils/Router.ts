import Component from './Component';

function render(query: string, component: Component | null): HTMLElement | never {
    const root: HTMLElement | null = document.querySelector(query);

    if (root === null || component === null) {
        throw new Error('no root or component');
    }

    root.innerHTML = '';

    root.append(component.getContent()!);
    component.dispatchComponentDidMount();

    return root;
}

export enum Routes {
    Index = '/',
    SignUp = '/sign-up',
    Profile = '/profile',
    Settings = '/settings',
    SettingsPassword = '/settings-password',
    Messenger = '/messenger',
    NotFound = '*'
}

class Route {
    private _pathname: string;
    private _componentClass: typeof Component;
    private _component: Component | null;
    private _props: Record<string, string>;

    constructor(pathname: string, component: typeof Component, props: { rootQuery: string; }) {
        this._pathname = pathname;
        this._componentClass = component;
        this._component = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        this._component = null;
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._component) {
            this._component = new (this._componentClass as unknown as new () => Component)();
        }

        render(this._props.rootQuery, this._component);
    }
}

class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private _currentRoute: Route | null = null;
    private history = window.history;
    private _rootQuery = '';

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, component: typeof Component) {
        const route = new Route(pathname, component, { rootQuery: this._rootQuery });
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (e: PopStateEvent) => {
            this._onRoute((e.currentTarget as Window).location.pathname);
        }

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname);

        route = !route ? this.getRoute('*') : route;

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;

        route!.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string): Route | null {
        const route = this.routes.find(route => route.match(pathname));

        return route ? route : null;
    }
}

export default new Router('#app');
