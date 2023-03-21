import IPropsWithRouter from '../interfaces/IPropsWithRouter';
import Component from '../utils/Component';
import Router from '../utils/Router';

export default function withRouter(component: typeof Component<any>) {
    return class WithRouter extends component {
        constructor(props: any & IPropsWithRouter) {
            super({ ...props, router: Router });
        }
    }
}
