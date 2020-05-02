getData();

async function getData() {
  const resp = await fetch('/api');
  const data = await resp.json();
  console.log(data);

  for(let item of data) {
    const root = document.createElement('div');
    root.className = 'result';

    const text = document.createElement('div');
    text.textContent = item.text;

    const date = document.createElement('span');
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;

    root.append(date, text);
    document.body.appendChild(root);
  }
}
