const url = './data.json';
const graficoDibujar = document.getElementById('grafico');

const grafico = async () => {
  const response = await fetch(url);
  const data = await response.json();

  const amounts = data.map(obj => obj.amount);
  const maxAmount = Math.max(...amounts);

  data.forEach(({ day, amount }) => {
    const barraHeight = `${(amount * 2)}px`;

    let barraClass = '';
    if (amount === maxAmount) {
      barraClass = 'cyan-barra';
    }

    const liElement = graficoDibujar.appendChild(document.createElement('li'));

    liElement.innerHTML = `
      <div class="amount">
        <span>$${amount}</span>
      </div>
      <div class="barra ${barraClass}" style="height: ${barraHeight};"></div>
      <span>${day}</span>
    `;

    const barraElement = liElement.querySelector('.barra');

    barraElement.addEventListener('mouseover', () => {
      const amountElement = liElement.querySelector('.amount');
      amountElement.style.display = 'block';
    });

    barraElement.addEventListener('mouseout', () => {
      const amountElement = liElement.querySelector('.amount');
      amountElement.style.display = 'none';
    });
  });
};

grafico();
