const e = require('express')
const { response } = require('express')
const request = require('request')


const Getkey = (city,callback)=>{
    if(city)
    {
        url = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=nocyeG7At8Z51xlNbNqcWb8gb6ADW5WS&q='+encodeURIComponent(city)+'&details=true'
        request({url,json:true},(error,response)=>{
            
            if(error)
            {
                console.log('error')
                callback ({error : 'Unable to connect to main server'},undefined)
            }
           
            if(response.body.Message){
                callback ({error:response.body.Message},undefined)
            }
            else{
                
                callback(undefined,{
                   
                    Name :response.body[0].LocalizedName,
                    Key : response.body[0].Key,
                     
                })
            }
        })
    }
    else
    {
        return {error : "provide city"}
    }

}

const Getcondition= (Key,callback)=>{
   if(Key){
    console.log(Key)
    url = 'http://dataservice.accuweather.com/currentconditions/v1/'+encodeURIComponent(Key)+'?apikey=nocyeG7At8Z51xlNbNqcWb8gb6ADW5WS'
    request({url,json:true},(error,response)=>{
        if(error)
        {
           callback ({error : 'Unable to connect to main server'},undefined)
        }
        
        if(response.body.Message)
        {
            callback({error: response.body.Message},undefined)
        }
        else
        {
            callback(undefined,
                {
                    forecast: response.body[0].WeatherText,
                    Temperature:response.body[0].Temperature,
                
                }
            )

        }
    })
}
else
{
callback({error: 'Key not avialable for location'},undefined)
}}
const forecast=(Name,callback)=>{
    Getkey(Name,(error,{Key}={})=>{
        if(error)
        {
            callback(error,undefined)
        }
        Getcondition(Key,(error,{forecast,Temperature}={})=>{
           if(error)
           {
            callback(error,undefined)
           }
            callback(undefined,{
                forecast: forecast,
                Temperature: Temperature
            })
        })
    })
}
module.exports={
    forecast:forecast,
}
    



