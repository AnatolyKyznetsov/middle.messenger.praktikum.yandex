import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type AuthControllerType from './AuthController';
import ISigninData from '../interfaces/ISigninData';
import ISignupData from '../interfaces/ISignupData';
import { Routes } from '../utils/Router';
import MessageController from '../controllers/MessageController';

const AIPMock = {
    signin: sinon.spy(),
    signup: sinon.spy(),
    logout: sinon.spy(),
    read: sinon.stub().returns({}),
}

const RouterMock = {
    go: sinon.stub(),
}

const StoreMock = {
    set: sinon.stub(),
}

const { default: AuthController } = proxyquire('./AuthController', {
    '../api/AuthAPI': {
        default: new class {
            signin = AIPMock.signin;
            signup = AIPMock.signup;
            logout = AIPMock.logout;
            read = AIPMock.read;
        },
    },
    '../utils/Router': {
        default: new class {
            go = RouterMock.go;
        },
    },
    '../utils/Store': {
        default: new class {
            set = StoreMock.set;
        },
    },
}) as { default: typeof AuthControllerType }

const AuthControllerCall = sinon.spy(AuthController, 'call');
const MessageControllerCloseAll = sinon.stub(MessageController, 'closeAll');

describe('AuthController', () => {
    const data = {};

    beforeEach(() => {
        AIPMock.signin.resetHistory();
        AIPMock.signup.resetHistory();
        AIPMock.read.resetHistory();
        AIPMock.logout.resetHistory();
        AuthControllerCall.resetHistory();
        MessageControllerCloseAll.resetHistory();
    });

    it('should call API signin', () => {
        AuthController.signin(data as ISigninData);

        expect(AIPMock.signin.called).to.eq(true);
    });

    it('should call API signup', () => {
        AuthController.signup(data as ISignupData);

        expect(AIPMock.signup.called).to.eq(true);
    });

    it('should call method call on signin', () => {
        AuthController.signin(data as ISigninData);

        expect(AuthControllerCall.called).to.eq(true);
    });

    it('should call method call on singup', () => {
        AuthController.signup(data as ISignupData);

        expect(AuthControllerCall.called).to.eq(true);
    });

    it('should go to message page after method call success', async () => {
        await AuthController.call(() => {});

        expect(RouterMock.go.calledWith(Routes.Messenger)).to.eq(true);
    });

    it('should show error after method call cancled', async () => {
        await AuthController.call(() => { throw new Error });

        expect(StoreMock.set.calledWith('user.error', true)).to.eq(true);
    });

    it('should call store method set after getting user ', async () => {
        await AuthController.getUser();

        expect(StoreMock.set.called).to.eq(true);
    });

    it('should call API read', () => {
        AuthController.getUser();

        expect(AIPMock.read.called).to.eq(true);
    });

    it('should call API logout', () => {
        AuthController.logout();

        expect(AIPMock.logout.called).to.eq(true);
    });

    it('should call store method set after logout', async () => {
        await AuthController.logout();

        expect(StoreMock.set.calledWith('user.data', undefined)).to.eq(true);
    });

    it('should go to index page in after logout', async () => {
        await AuthController.logout();

        expect(RouterMock.go.calledWith(Routes.Index)).to.eq(true);
    });

    it('should call MessageController method closeAll after logout', async () => {
        await AuthController.logout();

        expect(RouterMock.go.calledWith(Routes.Index)).to.eq(true);
    });
});
