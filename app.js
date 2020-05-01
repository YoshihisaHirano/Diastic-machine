  const seedWord = document.getElementById('seed');
  const submit = document.getElementById('submit');
  const generateText = document.getElementById('generate');
  const addField = document.getElementById('add');
  const inputArr = [];

  //console.log(seedWord);

addField.addEventListener('click', () => {
  if(inputArr.length < 10) {
  const root = document.createElement('div');

  const field = document.createElement('input');
  field.maxlength = "8";
  field.type = "text";

  const populateArr = () => {
    inputArr.push(field.value);
  }

  const button = document.createElement('button');
  button.textContent = 'Submit';
  button.addEventListener('click', function() {
    populateArr();
    console.log(inputArr);
    button.disabled = true;
  })

  root.append(field, button);
  document.getElementById('fields').appendChild(root);
}
});

  submit.addEventListener('click', () => {
    inputArr.push(seedWord.value);
  });

  const edit = text.split(/\n/).join('');
  const textArr = edit.split(/[-.\s?(),!:;”“""]+/);
  //document.getElementById('sample').textContent = textArr;
  //console.log(textArr);

  function generate(seed, text) {
    let letterIndex = 0;
    let generatedPhraseArr = [];

    for(let i = 0; i < text.length; i++) {
      if(text[i][letterIndex] === seed[letterIndex]) {
        generatedPhraseArr.push(text[i]);
        letterIndex++;
      }
      if(letterIndex >= seed.length) break;
    }

  console.log(generatedPhraseArr);
  const rawresult = generatedPhraseArr.join(' ').toLowerCase();
  const firstLetter = rawresult[0].toUpperCase();
  const result = `${firstLetter}${rawresult.slice(1)}.\n`

  const phrase = document.createElement('span');
  phrase.textContent = result;

  document.getElementById('result').appendChild(phrase);
}

generateText.addEventListener('click', () => {
  for(let item of inputArr) {
    generate(item, textArr);
  };
})
