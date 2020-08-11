
function conv() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url2 = "https://www.cbr-xml-daily.ru/daily_json.js";
    const url = proxyurl + url2;

    fetch(url)   
    .then(data => data.json())
    .then(function(data){

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
      
      firstSelect.onchange = conResult;
      secondSelect.onchange = conResult;
       
      
        function conResult() {
      
          let convertInUsd = Math.floor((usd * currentNumber.value)*100) / 100,
              convertInEur = Math.floor((eur * currentNumber.value)*100) / 100,
              convertRubUsd = Math.floor((rub * currentNumber.value / usd)*100) / 100,
              convertRubEur = Math.floor((rub * currentNumber.value / eur)*100) / 100;

          
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
                result.innerTex = convertRubEur;
            }
        }
             conResult()
    })
    .catch(function(error) {
        let some = document.querySelector('.result__inner')
        some.textContent = 'Что-то пошло не так. Пожалуйста, повторите попытку';
        some.style.color = 'red';
        some.style.fontSize = '16px';
        console.log(error.message)
    } )       
}

  document.querySelector('#number').addEventListener('input', conv);





