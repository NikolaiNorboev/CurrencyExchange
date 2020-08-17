const express = require('express');
const parseString = require('xml2js').parseString;//для перевода XML в JSON
const iconv = require('iconv-lite');//Чтобы расшивровать в UTF8 из win1251
const http = require('http');//чтобы обойти CORS на CBR

const router = express.Router();

//обновление текущего курса по запросу
router.get('/today', async (req, resp) => {
  try {
    http.get("http://www.cbr.ru/scripts/XML_daily.asp?", await function (res) {
      //только этот параметр правильно вернул символы на руском
      res.pipe(iconv.decodeStream('cp1251')).collect(function (err, decodedBody) {
        //перевод XML в JSON, затем обработка полученного результата
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
router.post('/history', async (req, resp) => {
  const { id, startDate, endDate } = req.body;
  try {
    http.get(`http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=${startDate}&date_req2=${endDate}&VAL_NM_RQ=${id}`, await function (res) {
      res.pipe(iconv.decodeStream('cp1251')).collect(function (err, decodedBody) {
        parseString(decodedBody, function (err, result) {
          const valute = [];
          const date = [];
          const info = {// Для заполнения легенды и титула
            startDate: result.ValCurs.$.DateRange1,
            endDate: result.ValCurs.$.DateRange2,
            id: result.ValCurs.$.ID,
          };
          result.ValCurs.Record.map(member => {
            date.push(member.$.Date);//для заполненияя оси Y
            valute.push(parseFloat(member.Value[0].replace(/[,]+/g, '.')))//для заполнения оси X
          });
          resp.status(200).send({ info, date, valute });
        })
      });
    });
  } catch (e) {
    console.log(e);
    resp.send({ message: e })
  }
})

module.exports = router;
