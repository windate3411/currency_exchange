let button = document.querySelector('button')
let display = document.querySelector('.panel-body')
let start_select = document.getElementById('inputGroupSelect01')
let end_select = document.getElementById('inputGroupSelect03')
let start = document.getElementById('start')
const regrex = /^[0-9]*[1-9][0-9]*$/

function exchange(e) {
  axios
    .get('https://api.exchangeratesapi.io/latest')
    .then(response => {
      //房待處理
      if (!regrex.test(start.value)) {
        alert("請輸入金額")
        display.style.display = 'none';
      } else {
        //由於取得的API資料是歐元兌其他外幣，當其他外幣間互相轉換時，先將該外幣換成歐元，也因此會出現一些誤差
        display.innerText = parseFloat(response.data.rates[end_select.value]) * parseFloat(start.value) / parseFloat(response.data.rates[start_select.value])
      }
    })
    .catch(error => console.log(error))
}
button.addEventListener('click', exchange)
