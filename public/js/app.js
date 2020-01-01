console.log('client side js loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')




weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            m1.textContent=data.error
            m2.textContent = ""
        }else{

            m1.textContent=data.location
            m2.textContent=data.forecast
           

        }
        
    })
})

})
