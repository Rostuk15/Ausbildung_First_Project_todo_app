// tasks.test.js
import { filterTasks, countCompleted } from './tasks.js';

test('keine leer Aufgaben', () => {
    const tasks = [
        { text: 'Kaufen Milc', completed: false },
        { text: '', completed: false }  // пуста
    ];
    expect(filterTasks(tasks)).toHaveLength(1);
});

test('Zahlen die Aufgaben', () => {
    const tasks = [
        { text: 'Aufgabe 1', completed: true },
        { text: 'Aufgabe 2', completed: true },
        { text: 'Aufgabe 3', completed: false }
    ];
    expect(countCompleted(tasks)).toBe(2);
});