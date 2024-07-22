// Функция для проверки длины строки
// Принимает строку и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.

const isLengthCorrect = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};


isLengthCorrect('проверяемая строка', 20); // true
isLengthCorrect('проверяемая строка', 18); // true
isLengthCorrect('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом

const isPalindrom = (string) => {

  const newString = string.replaceAll(' ', '').toLowerCase();
  let palindrom = '';

  for (let i = newString.length - 1; i >= 0; i = i - 1) {
    palindrom += newString[i];
  }

  return palindrom === newString;

};

isPalindrom('топот'); // true
isPalindrom('Кекс'); // false
isPalindrom('Лёша на полке клопа нашёл '); // true

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:
// Предусмотрите случай, когда вместо строки приходит число.


const returnNumber = (string) => {

  const newString = string.toString();
  let finalString = '';

  for (let i = 0; i < newString.length; i++) {
    if (!Number.isNaN(parseInt(newString[i], 10))) {
      finalString += newString[i];
    }
  }

  return parseInt (finalString, 10);
};

returnNumber('2023 год'); // 2023
returnNumber('ECMAScript 2022'); // 2022
returnNumber('1 кефир, 0.5 батона'); // 105
returnNumber('агент 007'); // 7
returnNumber('а я томат'); // NaN
returnNumber(2023); // 2023
returnNumber(-1); // 1
returnNumber(1.5); // 15
