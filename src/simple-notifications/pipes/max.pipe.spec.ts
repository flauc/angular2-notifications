import {MaxPipe} from './max.pipe';

describe('MaxPipe', () => {
    let pipe: MaxPipe,
        testString = 'test';

    beforeEach(() => pipe = new MaxPipe());

    it('Less then allowed', () => expect(pipe.transform(testString, testString.length + 1)).toEqual(testString));
    it('Equal to allowed', () => expect(pipe.transform(testString, testString.length)).toEqual(testString));
    it('More then allowed', () => expect(pipe.transform(testString, testString.length - 1)).toEqual(testString.slice(0, -1)));
});