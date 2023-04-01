import { expect } from 'chai';
import { set , localDate } from './helpers';

describe('helpers', () => {
    describe('set function', () => {
        let obj: Record<string, unknown>;

        const keypath = 'test';
        const value = 'test';

        beforeEach(() => {
            obj = {};
        });

        it('should set a value by keypath to the object', () => {
            set(obj, keypath, value);

            expect(obj).to.haveOwnProperty(keypath, value);
        });

        it('should return original object', () => {
            const result = set(obj, keypath, value);

            obj['test'] = 'another value';

            expect(result).to.equal(obj);
        });

        it('should return original object if it is not an object', () => {
            const notAnObject = 'string';

            const result = set(notAnObject, keypath, value);

            expect(result).to.eq(notAnObject);
        });
    });

    describe('localDate function', () => {
        it('shoud return local string date', () => {
            const date = '2023-03-30T09:01:08.866Z';
            const result = localDate(date);

            expect(result).to.eq('30.03.2023, 16:01:08')
        })
    });
});
