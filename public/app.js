  const generateText = document.getElementById('generate');
  const addField = document.getElementById('add');
  const example = document.getElementById('hide');
  const exampleText = document.getElementById('example');
  const fields = document.getElementById('fields');
  const inputArr = [];
  let counter = 0;
  let toggled = false;

  //Shuffling the text array to create unique results each time
  function shuffleArr(arr) {
    let newPos, temp;

    for (let i = arr.length - 1; i > 0; i--) {
      newPos = Math.floor(Math.random() * (i + 1))
      temp = arr[i];
      arr[i] = arr[newPos];
      arr[newPos] = temp;
    }
    return arr;
  };

  //Generating the text from the seed;
  function generate(seed, text) {
    let letterIndex = 0;
    let generatedPhraseArr = [];

    for (let i = 0; i < text.length; i++) {
      text = shuffleArr(text);
      if (text[i][letterIndex] === seed[letterIndex]) {
        generatedPhraseArr.push(text[i]);
        letterIndex++;
      }
      if (letterIndex >= seed.length) break;
    }

    const rawresult = generatedPhraseArr.join(' ').toLowerCase();
    const firstLetter = rawresult[0].toUpperCase();
    const result = `${firstLetter}${rawresult.slice(1)}. `

    const phrase = document.createElement('span');
    phrase.textContent = result;

    document.getElementById('result').appendChild(phrase);
    //console.log(document.getElementById('result').textContent);
  }



  //Adding functionality through different buttons

  //A button to hide/show the text with the example
  example.addEventListener('click', () => {
    if (!toggled) {
      example.textContent = 'Show the example';
      exampleText.hidden = true;
    } else {
      example.textContent = 'Hide the example';
      exampleText.hidden = false;
    }
    toggled = !toggled;
  })

  //A button to add new fields of possible seeds
  addField.addEventListener('click', () => {
    addField.textContent = 'Add more';
    if (counter < 10) {
      const root = document.createElement('div');

      const field = document.createElement('input');
      field.maxLength = "10";
      field.type = "text";
      field.placeholder = "add a seed";

      //A button to submit the seed
      const button = document.createElement('button');
      button.textContent = 'Submit';
      button.addEventListener('click', function() {
        inputArr.push(field.value);
        //console.log(inputArr);
        if (field.value) {
          button.disabled = true;
          generateText.hidden = false;
        }
      })

      root.append(field, button);
      fields.appendChild(root);
      counter++;
    }
    if (counter >= 10) addField.hidden = true;

    if (counter == 1) {
      example.textContent = 'Show the example';
      exampleText.hidden = true;
      toggled = !toggled;
    }
  });

  //A button to generate the result
  generateText.addEventListener('click', async() => {

    //Getting the text served;
    const resp = await fetch('./text.txt');
    const text = await resp.text();
    const textArr = text.split(/[-.\s\n?(),!:;”“""]+/);
    //console.log(textArr);

    for (let item of inputArr) {
      generate(item, textArr);
    };

    result.hidden = false;
    addField.hidden = true;
    generateText.hidden = true;
    document.body.removeChild(fields);

    //A button to save the result to the server
    const save = document.createElement('button');
    save.innerText = 'Save your creation';
    save.id = "save";
    document.body.appendChild(save);

    const data = {
      text: document.getElementById('result').textContent,
    }

    save.addEventListener('click', async () => {
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      }

      const resp = await fetch('/api', options);
      const json = await resp.json();
      //console.log(json);

      save.disabled = true;
      save.textContent = 'Saved!';
    });

  })
