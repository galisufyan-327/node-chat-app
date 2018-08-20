var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correnct message object', () => {
        var from = 'Farhan';
        var text = 'Going to offer Prayer';
        var res = generateMessage(from, text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Ali';
        var lat = 1;
        var lng = 1;
        var url = `https://www.google.com/maps/?q=${lat},${lng}`;
        var res = generateLocationMessage(from, lat, lng);

        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({from, url});
    });
});