import './styles/style.scss';

import Router, { Routes } from './utils/Router';
import Page404 from './pages/404';
import Page500 from './pages/500';
import Login from './pages/login';
import Messenger from './pages/messenger';
import Profile from './pages/profile';
import Settings from './pages/settings';
import SettingsPassword from './pages/settings-password';
import SignUp from './pages/sign-up';
import AuthController from './controllers/AuthController';

window.addEventListener('DOMContentLoaded', async () => {
    let isProtectedRoute = true;

    Router
        .use(Routes.Index, Login)
        .use(Routes.SignUp, SignUp)
        .use(Routes.Profile, Profile)
        .use(Routes.Settings, Settings)
        .use(Routes.SettingsPassword, SettingsPassword)
        .use(Routes.Messenger, Messenger)
        .use(Routes.ServerError, Page500)
        .use(Routes.NotFound, Page404);

    switch (window.location.pathname) {
    case Routes.Index:
    case Routes.SignUp:
        isProtectedRoute = false;
        break;
    }

    try {
        await AuthController.getUser();

        Router.start();

        if (!isProtectedRoute) {
            Router.go(Routes.Messenger);
        }
    } catch {
        Router.start();

        if (isProtectedRoute) {
            Router.go(Routes.Index);
        }
    }
});
