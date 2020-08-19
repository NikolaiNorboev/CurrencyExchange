const mongo = require('./mongo.js');
const Valutes = require("./model/history");
const parseString = require('xml2js').parseString;
const iconv = require('iconv-lite');
const http = require('http');

(async () => {
  //Засеять справочник
  let val;
  // http.get("http://www.cbr.ru/scripts/XML_daily.asp?", await function (res) { 
  //     res.pipe(iconv.decodeStream('cp1251')).collect(function (err, decodedBody) {
  //       parseString(decodedBody, function (err, result) {
  //         result.ValCurs.Valute.map(member => {
  //           val.push({
  //             idCBR: member.$.ID,
  //             nameRus: member.Name[0],
  //             charCode: member.CharCode[0],
  //             nominal: Number(member.Nominal[0]),
  //           })
  //         });          
  //       })
  //     });
  //   });
  let promise = new Promise((res, rej) => {
    http.get("http://www.cbr.ru/scripts/XML_daily.asp?", function (res) {
      val = res
    })
  })
  let result = await promise;
  // console.log(result);
  // await val.pipe(iconv.decodeStream('cp1251')).collect(function (err, decodedBody) {
  //   val = decodedBody;
  // })
  // await parseString(val, function (err, result) {
  //   val = result  
  // })
  console.log(val);
    
})()
