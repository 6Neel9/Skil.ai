const express = require('express');
const app = express();
const csv = require('csvtojson')

app.use(express.json());

const csvFilePath = 'csvtext.csv'

var allData;



app.get('/', (req, res) => {

    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            // var most = 0;
            // const malePop = jsonObj.filter(item=>item['gender']=="Male")
            // for(let i = 0;i<malePop.length;i++){
            //     if(Number(malePop['Population'])>most){
            //         most = Number(malePop['Population'])
            //         console.log(most)
            //     }
            // }
            res.send(jsonObj)
        })


})


app.get('/:city', (req, res) => {
    const city = req.params.city;
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            const arr = jsonObj.filter(item => item['City'] === city)
            if (arr) {
                res.send(arr)

            } else {
                res.send('city not found')
            }
        }).catch(err => {
            res.send({ message: err })
        })
})

app.listen(8080, () => {
    console.log('server started')
})