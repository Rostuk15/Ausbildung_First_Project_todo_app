// tasks.test.js — тести
import { filterTasks, countCompleted } from './tasks.js';

test('не додає пусті задачі', () => {
    const tasks = [
        { text: 'Купити молоко', completed: false },
        { text: '', completed: false }  // пуста
    ];
    expect(filterTasks(tasks)).toHaveLength(1);
});

test('рахує виконані задачі', () => {
    const tasks = [
        { text: 'Задача 1', completed: true },
        { text: 'Задача 2', completed: true },
        { text: 'Задача 3', completed: false }
    ];
    expect(countCompleted(tasks)).toBe(2);
});