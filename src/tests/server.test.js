import {serverr} from "../server/server"
describe('Test, the function "handleSubmit()" should exist' , () => {
    test('It should return true', async () => {
        expect(serverr).toBeDefined();
    });
});
describe('Test, the function "handleSubmit()" should be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof serverr).toBe("function");
    });
});