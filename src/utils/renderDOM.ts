import Page404 from '../pages/404';
import Page500 from '../pages/500';
import Login from '../pages/login';
import MessengerPage from '../pages/messenger';
import Profile from '../pages/profile';
import ProfileChange from '../pages/profile-change';
import ProfileChangePassword from '../pages/profile-change-password';
import Registration from '../pages/registration';

const ROUTES: Record<string, any> = {
    '404': Page404,
    '500': Page500,
    'login': Login,
    'messenger': MessengerPage,
    'profile': Profile,
    'profile-change': ProfileChange,
    'profile-change-password': ProfileChangePassword,
    'registration': Registration,
};

export default function renderDOM(route: keyof typeof ROUTES): void {
    const app: HTMLDivElement | null = document.querySelector('#app');
    const page = ROUTES[route];

    if (!page) {
        return;
    }

    const component = new page();
    const node = component.getContent() as string | Node;

    if (app) {
        app.innerHTML = '';
        app.append(node);
        component.dispatchComponentDidMount();
    }
}
