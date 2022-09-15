const express = require('express')
const path  = require('path')
const hbs = require('hbs')
const app = express()
const request = require('request')
const e = require('express')
const forca= require('./forecast')

pathpublicdir = path.join(__dirname,'../public')

pathtoviews = path.join(__dirname, '../templates/views')
pathtopartials= path.join(__dirname, '../templates/partials')
console.log(pathtoviews)
app.set('view engine','hbs')    
app.set('views', pathtoviews)
hbs.registerPartials(pathtopartials)


app.use(express.static(pathpublicdir))


app.get('/',(req,res)=>{
    res.render('index',{
        title : 'This is place to search weather    '
    })
  
})
app.get ('/about',(req,res)=>{
    res.render('about')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})


app.get('/weather',(req,res)=>{
  
    
    
    if(req.query  ==={})
    {
        return res.send({
            error: 'No query given'
        })
    }
   
    if(req.query.city){
        forca.forecast(req.query.city,(error,{forecast,Temperature}={})=>{
            if (error){
            return res.send(error)
            }else{
                return res.send({
                    forecast:forecast,
                    Temperature:Temperature
                })
            }
           
        })
    }
    else{
        return res.send({
            error : 'Please provide a city query'
        })
    }
    
  
})
app.get('/about/*',(req,res)=>{
    res.send('not a about page ')
})
app.get('*',(req,res)=>{
    res.send('Page not found')

})

app.listen(3000,()=>{
    console.log('server started ')
})