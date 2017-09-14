import Zombie from 'zombie';

const testValues = [
    {"value": "il@yandex.ru", "expected": "no"},
    {"value": "ilya@yandex.ru", "expected": "yes"},
    {"value": "elias@gmail.ru", "expected": "no"},
    {"value": "il-ya@yandex.ru", "expected": "no"},
    {"value": "name#yandex.ru", "expected": "no"},
    {"value": "hahaha@yandex.ru", "expected": "yes"}
];
const emailTesterUrl = 'https://kodaktor.ru/g/e995564?test=';

const browser = new Zombie();
const promisifiedChecker = url => new Promise(resolve => browser.visit(url, resolve));

for (const testVal of testValues) {
    it('should check this email: ' + testVal.value, async () => {
        expect.assertions(1);
        
        await promisifiedChecker(emailTesterUrl + testVal.value)
            .then(() => {
                const response = browser.document.querySelector('h3#response').textContent;
                
                expect(response).toEqual(testVal.expected);
            });
    })
    
}
