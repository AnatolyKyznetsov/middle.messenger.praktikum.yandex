import { Routes } from '../../utils/Router';
import ButtonBack from './index';

describe('ButtonBack', () => {
    it('should render', () => {
        new ButtonBack({ page: Routes.Index });
    });
});
