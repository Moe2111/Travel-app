import {updateUI} from "../client//js/app"


describe('Test, the function "handleSubmit()" should exist' , () => {
    test('It should return true', async () => {
        expect(updateUI).toBeDefined();
    });
});
describe('Test, the function "handleSubmit()" should be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof updateUI).toBe("function");
    });
});


