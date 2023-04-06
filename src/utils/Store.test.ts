import { expect } from 'chai';
import Store from './Store';

describe('Store', () => {
    const value = { test: 123 };
    const key = 'user';

    it('should be value at state after set', () => {
        Store.set(key, value);

        expect(Store.getState()[key]).to.eq(value)
    });
});
