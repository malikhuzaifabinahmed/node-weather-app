

const weatherform = document.querySelector('form')
const city= document.querySelector('#city')
const message1= document.querySelector('#message1')
const message2 = document.querySelector('#message2')
weatherform.addEventListener('submit',(e)=>{

    e.preventDefault()
    console.log(city.value)
if(city.value){

    message1.textContent= 'loading .....'
    message2.textContent= '.....................'
    fetch('http://localhost:3000/weather?city='+encodeURIComponent(city.value)).then((response)=>{
 response.json().then((data)=>{
    if(data.error)
    {
        message1.textContent= data.error
    
    }
    else
    {
        message1.textContent= data.forecast
        message2.textContent= data.Temperature.Metric.Value +  data.Temperature.Metric.Unit
    }

 })   

})
}
})