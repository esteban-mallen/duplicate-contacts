const {detectDuplicates} = require("./detect-duplicates");

const contacts = [
    { contactID: 1001, name: 'C', name1: 'F', email: 'mollis.lectus.pede@outlook.net', postalZip: '449-6990', address: 'Tellus Rd.' },
    { contactID: 1002, name: 'C', name1: 'French', email: 'mollis.lectus.pede@outlook.net', postalZip: '39746', address: '449-6990 Tellus. Rd.' },
    { contactID: 1003, name: 'Ciara', name1: 'F', email: 'non.lacinia.at@zoho.ca', postalZip: '39746', address: '' },

    { contactID: 1004, name: 'Test', name1: 'Person', email: 'test.person@hotmail.com', postalZip: '', address: '' },
    { contactID: 1005, name: 'Different', name1: 'Name', email: 'test.person@hotmail.com', postalZip: '123', address: '1234 TEST' },
    { contactID: 1006, name: 'Different', name1: 'Name', email: 'test.person@outlook.com', postalZip: '232', address: '' },
    { contactID: 1007, name: 'D', name1: 'Name', email: 'not-the-same@outlook.com', postalZip: '000', address: '' },

    { contactID: 1008, email: 'not-the-same@outlook.com' },
];

describe('duplicate contact detection', () => {
    it('should detect duplicate contacts', () => {
        const result = detectDuplicates(contacts);

        expect(result).toEqual([
            ['ContactID Source', 'ContactID Match', 'Accuracy'],
            [1001, 1002, 'High'],
            [1001, 1003, 'Low'],
            [1004, 1005, 'High'],
            [1004, 1006, 'Medium'],
            [1005, 1007, 'Low'],
            [1007, 1008, 'High'],
        ]);
    })
})
