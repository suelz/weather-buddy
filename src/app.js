const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//static dir to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res)=>{
    res.render('index', {
    title: 'Weather Buddy',
    name: 'Conor'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'no address provided'
        })
    }

    geocode(req.query.address, (error, {lat, long, location} ={} )=>{
        if(error){
            return res.send({error})
        }

        forecast(lat, long, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
    
            })
        })

    })

})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })

    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        error: 'page not found',
        name: 'Conor',
    })
})

app.listen(3000, () =>{
    console.log('server is up on  port 3000')
})