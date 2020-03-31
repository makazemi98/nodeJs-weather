const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
/*
console.log('Dirname : ',__dirname)
console.log('Filename : ',__filename)
*/
const app = express();


// Define path express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

// setup handlebars engine and view location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath)


// setup static directory to server
app.use(express.static(publicDirPath))

hbs.registerHelper('date',()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});


// 1 
// app.get('/',(req,res)=>{
//     res.send({
//         name:'MohammadAli',
//         email:'ma_kazemi@yahoo.com'
//     })
// })

// 2

app.get('',(req,res)=>{
    res.render('index',{
        title:"Home page",
        name:'MAK',
        path:'/'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:'Mohammad ali kazemi',
        path:'/about'
    })
})
app.get('/help',(req,res,next)=>{
    // res.redirect('help1.html')
    res.render('help',{
        helpText:"This is some helpful text . ",
        name:'MAK',
        helpText:"This some Helpful text . ",
        path:'/help'

    })
})

// Help/mak
app.get('/help/*',(req,res)=>{
    // res.send('The Halp Page is not this url !!!');
    res.render('404',{
        title:'F O F',
        name:"MAK",
        msg:"Help article Not found .",
        path:'/help/*'
        
    });
})

app.get('/products',(req,res)=>{
    
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if( error ){
            return res.send({
                error
            })
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})


// 404
app.get('*',(req,res)=>{
    res.render('404',{
        title:'F O F',
        name:"MAK",
        msg:"page Not found !!!!",
    });
})


app.listen(3000,()=>{
    console.log(`Server is running in port 3000`.toString().toUpperCase())
})