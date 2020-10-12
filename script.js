
  function convert() {
  
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url2 = "https://www.cbr-xml-daily.ru/daily_json.js";
    const url = proxyurl + url2;
  
    getCourse(url)
        .then(data => calculate(data))
        .catch(error => showError(error))       
  
  
      async function getCourse(url) {
        let statusMessage = document.querySelector('.convert__status');
        statusMessage.classList.add('active')
       
      const res = await fetch(`${url}`);
  
      if (res.ok) {
          statusMessage.classList.remove('active')
        }

      return res.json()
  }
  
  
    function calculate(data) {
  
         let usd = data.Valute.USD.Value,
            eur = data.Valute.EUR.Value,
            rub = '1',
            today = data.Date;
              
        let currentNumber = document.querySelector('#number'),
            firstSelect = document.querySelector('#current1'),
            secondSelect = document.querySelector('#current2'),
            result = document.querySelector('.result__convert');
    
  
        let nowDate =  document.querySelector('.sign');
            nowDate.innerText = 'Данные на ' + today;
        
        firstSelect.onchange = convertResult;
        secondSelect.onchange = convertResult;
  
      function convertResult() {
        
            let convertInUsd = Math.floor((usd * currentNumber.value)*100) / 100,
                convertInEur = Math.floor((eur * currentNumber.value)*100) / 100,
                convertRubUsd = Math.floor((rub * currentNumber.value / usd)*100) / 100,
                convertRubEur = Math.floor((rub * currentNumber.value / eur)*100) / 100,
                convertEurUsd = Math.floor((eur * currentNumber.value / usd)*100) / 100;
  
            
              if (firstSelect.value == 'USD' && secondSelect.value == 'RUB') {
                  result.innerText = convertInUsd;
              } else 
                  if (firstSelect.value == 'EUR' && secondSelect.value == 'RUB') {
                result.innerText = convertInEur;
              } else 
                  if (firstSelect.value === secondSelect.value) {
                result.innerText = currentNumber.value;
              } else 
                  if (firstSelect.value == 'RUB' && secondSelect.value == 'USD') {
                  result.innerText = convertRubUsd;
              } else
                  if (firstSelect.value == 'RUB' && secondSelect.value == 'EUR') {
                  result.innerText = convertRubEur;
            }  else
                  if (firstSelect.value == 'EUR' && secondSelect.value == 'USD') {
                  result.innerText = convertEurUsd;
        }
     
        convertResult()
    }

    function showError() {
        let some = document.querySelector('.result__inner')
          some.textContent = 'Что-то пошло не так. Пожалуйста, повторите попытку';
          some.style.color = 'red';
          some.style.fontSize = '16px';
          
    }
}
   document.querySelector('#number').addEventListener('input', convert);
