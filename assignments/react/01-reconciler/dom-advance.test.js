const fs = require('fs');
const path = require('path');
const code = fs.readFileSync(path.join(__dirname, 'script-ugly.js'), 'utf8');

// This test intentionally fails against the original script-ugly.js:
// it only passes once the student has solved the assignment.
describe('script-ugly (efficiency)', () => {
  beforeEach(() => {
    jest.useFakeTimers();                                   // keeps setInterval from firing
    jest.spyOn(console, 'log').mockImplementation(() => {});
    document.body.innerHTML = '<div id="mainArea"></div>';
    window.eval(code);                                      // makes createDomElements global
  });
  afterEach(() => { jest.useRealTimers(); jest.restoreAllMocks(); });

  test('does not recreate an element that already exists', () => {
    const parent = document.getElementById('mainArea');
    createDomElements([{ id: 1, title: 'a', description: 'b' }]);
    const before = parent.querySelector('[data-id="1"]');
    const spy = jest.spyOn(parent, 'appendChild');
    createDomElements([{ id: 1, title: 'a', description: 'b' }]);
    expect(parent.querySelector('[data-id="1"]')).toBe(before); // same element
    expect(spy).not.toHaveBeenCalled();
  });
});
