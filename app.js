const input = document.querySelector('.textInput');
const textField = document.querySelector('.text');
const speed = document.querySelector('.speed');
const keyboard = document.querySelector('.keyboard');
const keys = document.querySelectorAll('.key');
let lettersCount = 0;
let correctCount = 0;
let correct = true;
let textMassiv;
let textLength;
let symbolCount;
let time = 0;
let endOfText = false;

input.addEventListener('keyup', (e) => render(e));

function randomText() {
  fetch('https://api.quotable.io/random')
    .then((res) => res.json())
    .then((result) => {
      textMassiv = result.content.split('');
      addText(0);
      nextKeyFocus();
      textLength = textMassiv.length;
    });
}
//Первые действия
randomText();

function checkCorrect(count, e) {
  let textPiece = textMassiv.slice(0, count).join('');
  if (input.value == textPiece) {
    correct = true;
    if (e.key.length <= 4 && correctCount < input.value.length) {
      correctCount++;
    } else if (correctCount > input.value.length) {
      nextKeyFocus(e);
      correctCount = input.value.length;
    }
  } else {
    correct = false;
  }
}

function addText(count) {
  textField.innerHTML = '';
  const correctText = document.createElement('span'); //Правильная часть текста
  const otherText = document.createElement('span'); //ОСтальной текст
  correctText.innerText = textMassiv.slice(0, count).join('');
  otherText.innerText = textMassiv.slice(count).join('');
  correctText.classList.add('correctLetters');
  otherText.classList.add('otherLetters');
  if (!correct) {
    correctText.innerText = textMassiv.slice(0, correctCount).join('');
    otherText.innerText = textMassiv.slice(correctCount).join('');
    otherText.style.color = 'red';
  } else {
    otherText.style.color = 'white';
  }
  textField.append(correctText);
  textField.append(otherText);
}

function checkCount(e) {
  lettersCount = input.value.length;
}

function reset() {
  correctCount = 0;
  input.value = '';
  randomText();
  endOfText = false;
  time = 0;
}

function clearFilter() {
  keys.forEach((elem) => {
    elem.style.filter = `brightness(${1})`;
  });
}

function nextKeyFocus(e) {
  clearFilter();
  let allKeys = keyboard.innerText.split('\n');
  allKeys = allKeys.map((item) => item.toLowerCase());
  if (correctCount === 0) {
    console.log('11');
    keys[
      allKeys.indexOf(textMassiv[0].toLowerCase())
    ].style.filter = `brightness(${1.5})`;
  } else {
    if (correct == false) {
      if (correctCount !== input.value.length) {
        clearFilter();
        keys[13].style.filter = `brightness(${1.5})`;
      }
    } else {
      let nextKey =
        keys[allKeys.indexOf(textMassiv[correctCount].toLowerCase())];
      if (correctCount === textMassiv.length - 1) {
        keys[50].style.filter = `brightness(${1.5})`;
      }
      if (textMassiv[correctCount] == ' ') {
        keys[54].style.filter = `brightness(${1.5})`;
      } else if (
        nextKey !== -1 &&
        correctCount + 1 !== textLength &&
        input.value.length !== 0
      ) {
        console.log(nextKey);
        nextKey.style.filter = `brightness(${1.5})`;
      } else {
        console.log('пока нет');
      }
    }
  }
}

function variablesLog() {
  console.log(
    'lettersCount = ',
    lettersCount,
    'correctCount = ',
    correctCount,
    'correct = ',
    correct,
    'textMassiv',
    textMassiv,
    'textLength = ',
    textLength,
    'symbolCount = ',
    symbolCount,
    'time = ',
    time,
    'endOfText = ',
    endOfText
  );
}

function render(e) {
  checkCount(e);
  checkCorrect(lettersCount, e);
  addText(lettersCount);
  console.log(
    'correctCount = ',
    correctCount,
    'input.value.length',
    input.value.length
  );
  if (input.value.length == textMassiv.length && textLength == correctCount) {
    endOfText = true;
    let printSpeed = parseInt(Math.round(textMassiv.length / (time / 60)));
    if (printSpeed <= 140) {
      speed.style.color = 'red';
      //console.log('Медленно');
    } else if (printSpeed < 200) {
      speed.style.color = 'yellow';
      //console.log('Средне');
    } else if (printSpeed < 300) {
      speed.style.color = 'green';
      //console.log('Быстро');
    } else {
      //console.log('Ультра адский принтер');
    }
    speed.innerText = `${printSpeed} сим/мин`;

    reset();
  }
  nextKeyFocus(e);
  //variablesLog();
}

setInterval(() => {
  if (input.value.length != 0 && !endOfText) {
    time += 1;
  }
}, 1000);

// function renderText(array, index) {
//   let correctPart = array.slice(0,index);
//   let uncorrectPart = array.slice(index);

//   textField.innerHTML = '';
//   array.forEach((element) => {
//     const p = document.createElement('span');
//     p.innerText = element;
//     if (index > 0) {
//       p.classList.add('blueLetter');
//     }
//     textField.append(p);
//     index--;
//   });
// }

// renderText(textMassiv, correctCount);

// function onKeyDown(e) {
//   if (
//     e.code == 'Backspace' &&
//     correctCount > 0 &&
//     key.value.length <= correctCount
//   ) {
//     correctCount--;
//   }
//   if (correctCount + 1 == key.value.length) {
//     textField.style.color = 'white';
//   } else if (e.key == text[correctCount]) {
//     textField.style.color = 'white';
//     correctCount++;
//   } else if (key.value != '') {
//     textField.style.color = 'red';
//   }
//   renderText(textMassiv, correctCount);
//   //console.log('correctCount =', correctCount);
// }
