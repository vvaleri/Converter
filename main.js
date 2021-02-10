function convert() {
  getCourse('https://v6.exchangerate-api.com/v6/0429a4abcf14d5c1a77c9efb/latest/USD')
    .then(data => calculateValue(data))
    .catch(error => showError(error));

  async function getCourse(url) {
    const statusMessage = document.querySelector('.convert__status');
    statusMessage.classList.add('active');

    const res = await fetch(`${url}`);

    if (res.ok) {
      statusMessage.classList.remove('active');
    }

    return res.json();
  }

  function calculateValue(data) {
    const usd = '1';
    const eur = data.conversion_rates.EUR;
    const rub = data.conversion_rates.RUB;
    const today = data.time_last_update_utc;

    const currentNumber = document.querySelector('#number');
    const firstSelect = document.querySelector('#current1');
    const secondSelect = document.querySelector('#current2');
    const result = document.querySelector('.result__convert');

    const nowDate = document.querySelector('.sign');
    nowDate.innerText = `Last update: ${today}`;

    firstSelect.onchange = convertResult;
    secondSelect.onchange = convertResult;

    function convertResult() {
      const convertUsdRub = Math.floor((rub * currentNumber.value) * 100) / 100;
      const convertUsdEur = Math.floor((eur * currentNumber.value / usd) * 100) / 100;
      const convertRubUsd = Math.floor((currentNumber.value / rub) * 100) / 100;
      const convertRubEur = Math.floor((eur * currentNumber.value / rub) * 100) / 100;
      const convertEurRub = Math.floor((rub * currentNumber.value / eur) * 100) / 100;
      const convertEurUsd = Math.floor((currentNumber.value / eur) * 100) / 100;

      if (firstSelect.value === 'USD' && secondSelect.value === 'RUB') {
        result.innerText = convertUsdRub;
      } else if (firstSelect.value === 'USD' && secondSelect.value === 'EUR') {
        result.innerText = convertUsdEur;
      } else if (firstSelect.value === 'EUR' && secondSelect.value === 'RUB') {
        result.innerText = convertEurRub;
      } else if (firstSelect.value === 'EUR' && secondSelect.value === 'USD') {
        result.innerText = convertEurUsd;
      } else if (firstSelect.value === 'RUB' && secondSelect.value === 'USD') {
        result.innerText = convertRubUsd;
      } else if (firstSelect.value === 'RUB' && secondSelect.value === 'EUR') {
        result.innerText = convertRubEur;
      } else if (firstSelect.value === secondSelect.value) {
        result.innerText = currentNumber.value;
      }
    }
    convertResult();
  }

  function showError() {
    const some = document.querySelector('.result__inner');
    some.textContent = 'Something wrong. Please try again';
    some.style.color = 'red';
    some.style.fontSize = '14px';
  }
}
document.querySelector('#number').addEventListener('input', convert);
