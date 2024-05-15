```javascript
const arr = [10, 12, 15, 21];

for (var i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
  }, 3000)
} 
```
---
 Написать что выводит данный код. Предложите 2 варианта модификации кода, чтобы ответ был следующим: Bad: 10, Bad: 12, Good: 15, Good: 21

---

 settimeout, как асинхронная функция, выполнится после завершения цикла, то есть i будет уже равен 4. Соотв через 3 сек выведется в консоль Bad: undefined 4 раза.

1. Сделать обычный цикл без settimeout
```javascript

for (var i = 0; i < arr.length; i++) {
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
}
```

2. Добавить функцию коллбэка getValue для settimeout, в которой значение i сохраняется с помощью замыкания и потом значения выводится после 3сек
```javascript

function getValue(i) {
  return function () {
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
  };
}

for (var i = 0; i < arr.length; i++) {
  setTimeout(getValue(i), 3000);
}
```
