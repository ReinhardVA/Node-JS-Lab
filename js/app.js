const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const p3 = document.querySelector('#p3')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Test...')
    fetch('http://localhost:3000/weather?address=' + weatherInput.value).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                p1.textContent = data.error
            }
            else{
                p1.textContent = data.location
                p2.textContent = 'Hava ' + data.sicaklik + ' derecedir. Hissedilen sicaklik ' + data.hissedilen + ' derecedir'
                p3.textContent = data.error
                // if(data.yagis===0) gibi yağış oranlarını yaz 100 son data <= 100  => fırtına
                console.log(data.location)
                console.log(data.sicaklik)
            }
        })
    })
})
