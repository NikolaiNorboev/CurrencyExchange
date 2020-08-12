const express = require('express');
const mongoose = require('mongoose');
const parseString = require('xml2js').parseString;//для перевода XML в JSON
const iconv = require('iconv-lite');//Чтобы расшивровать в UTF8 из win1251
const http = require('http');//чтобы обойти CORS на CBR

const app = express();

mongoose.connect(
  'mongodb://localhost:27017/currency',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//обновление текущего курса по запросу
app.get('/api/today', async (req, resp) => {
  try {
    http.get("http://www.cbr.ru/scripts/XML_daily.asp?", await function (res) {
      res.pipe(iconv.decodeStream('cp1251')).collect(function (err, decodedBody) {//только этот параметр правильно вернул символы на руском
        parseString(decodedBody, function (err, result) {
          const valute = []
          result.ValCurs.Valute.map(member => {
            valute.push({
              id: member.$.ID,
              name: member.Name[0],
              charCode: member.CharCode[0],
              nominal: Number(member.Nominal[0]),//все данные вернулись строками
              value: parseFloat(member.Value[0].replace(/[,]+/g, '.'))// как разделитель использовалась запятая, метод принимает только точку
            })
          });
          resp.status(200).send({ date: result.ValCurs.$.Date, valute });
        })
      });
    });
  } catch (e) {
    console.log(e);
    resp.send({ message: e })
  }
});

//получение динамики котировок валюты за период
app.post('/api/history', async (req, resp) => {
  const { id, start, end } = req.body;
  try {
    http.get(`http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=${start}&date_req2=${end}&VAL_NM_RQ=${id}`, await function (res) {
      res.pipe(iconv.decodeStream('cp1251')).collect(function (err, decodedBody) {
        parseString(decodedBody, function (err, result) {
          const valute = [];
          const date = {
            start: result.ValCurs.$.DateRange1,
            end: result.ValCurs.$.DateRange2,
            id: result.ValCurs.$.ID,
          };
          result.ValCurs.Record.map(member => {
            valute.push({
              date: member.$.Date,
              value: parseFloat(member.Value[0].replace(/[,]+/g, '.')),
            })
          });
          resp.status(200).send({ date, valute });
        })
      });
    });
  } catch (e) {
    console.log(e);
    resp.send({ message: e })
  }
})

app.listen(3001);
