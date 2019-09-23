import { authorization } from './authorization';
import { configs } from '../config';

const auth = new authorization();
const expect = global.expect;

describe('Authorization test', () => {
    describe('Generate JWT Token', () => {
        test('Should be generate a JWT Token', () => {
            const jwt = auth.genJwt();
            expect.stringContaining(jwt)
        });
    });
});
