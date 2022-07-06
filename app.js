const input = document.querySelector('.textInput');
const textField = document.querySelector('.text');
let lettersCount = 0;
let correctCount = 0;
let correct = true;
let textMassiv;
let textLength;

input.addEventListener('keyup', (e) => render(e));

function randomText() {
  fetch('https://api.quotable.io/random')
    .then((res) => res.json())
    .then((result) => {
      textMassiv = result.content.split('');
      addText(0);
      textLength = textMassiv.length;
    });
}
randomText();

function checkCorrect(count, e) {
  let textPiece = textMassiv.slice(0, count).join('');
  if (input.value == textPiece) {
    correct = true;
    if (e.key !== 'Backspace') {
      correctCount++;
    } else if (input.value.length < correctCount) {
      correctCount = input.value.length;
    }
    console.log('Все верно');
  } else {
    correct = false;
    console.log('Ошибка');
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

function render(e) {
  checkCount(e);
  checkCorrect(lettersCount, e);
  addText(lettersCount);
  console.log('correctCount = ', correctCount);
  if (input.value.length == textMassiv.length && textLength == correctCount) {
    alert('Ура ты написал это!Факинг щщщит. Кодовое слово blackAss');
  }
}

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
