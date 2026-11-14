const fs = require('fs');
const path = require('path');
const code = fs.readFileSync(path.join(__dirname, 'script-ugly.js'), 'utf8');

describe('script-ugly', () => {
  beforeEach(() => {
    jest.useFakeTimers();                                   // keeps setInterval from firing
    jest.spyOn(console, 'log').mockImplementation(() => {});
    document.body.innerHTML = '<div id="mainArea"></div>';
    window.eval(code);                                      // makes createDomElements global
  });
  afterEach(() => { jest.useRealTimers(); jest.restoreAllMocks(); });

  test('mainArea exists', () => {
    expect(document.getElementById('mainArea')).not.toBeNull();
  });

  test('adds an item to the DOM', () => {
    createDomElements([{ id: 1, title: 'new element title', description: 'the element description' }]);
    const el = document.querySelector('[data-id="1"]');
    expect(el).not.toBeNull();
    expect(el.children).toHaveLength(3);
    expect(el.children[0].innerHTML).toBe('new element title');
    expect(el.children[1].innerHTML).toBe('the element description');
    expect(el.children[2].tagName.toLowerCase()).toBe('button');
    expect(el.children[2].getAttribute('onclick')).toBe('deleteTodo(1)');
  });

  test('updates the text of an existing item', () => {
    createDomElements([{ id: 1, title: 'old title', description: 'old description' }]);
    createDomElements([{ id: 1, title: 'new title', description: 'new description' }]);
    const parent = document.getElementById('mainArea');
    const el = parent.querySelector('[data-id="1"]');
    expect(parent.children).toHaveLength(1);
    expect(el.children[0].innerHTML).toBe('new title');
    expect(el.children[1].innerHTML).toBe('new description');
  });

  test('removes an item that is no longer in the list', () => {
    createDomElements([
      { id: 1, title: 'a', description: 'b' },
      { id: 2, title: 'c', description: 'd' },
    ]);
    createDomElements([{ id: 1, title: 'a', description: 'b' }]);
    const parent = document.getElementById('mainArea');
    expect(parent.children).toHaveLength(1);
    expect(parent.querySelector('[data-id="1"]')).not.toBeNull();
    expect(parent.querySelector('[data-id="2"]')).toBeNull();
  });
});