const superagent = require('superagent');
const xml2js = require('xml2js');
const iconv = require('iconv-lite');

let url1 = 'http://www.cbr.ru/scripts/XML_daily.asp?';
let url2 = 'http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=startDate&date_req2=endDate&VAL_NM_RQ=id'

const parser = (flag, id, startDate, endDate) => {
  if (flag === 1) {
    return superagent.post(url2.replace(/id/, id).replace(/startDate/, startDate).replace(/endDate/, endDate))
      .then(res => {
        const decodedBody = iconv
          .encode(iconv
            .decode(new Buffer(res.body, 'binary')
              , 'win1251')
            , 'utf8')
          .toString();
        return decodedBody;
      })
      .then(decodedBody => xml2js.parseStringPromise(decodedBody))
      .then(result => {
        const data = []
        const info = {
          startDate: result.ValCurs.$.DateRange1,
          endDate: result.ValCurs.$.DateRange2,
          id: result.ValCurs.$.ID,
        };
        result.ValCurs.Record.map(member => {
          data.push({
            date: member.$.Date,
            value: parseFloat(member.Value[0].replace(/[,]+/g, '.'))
          })
        });
        return { info, data };
      })
      .catch(console.error);
  } else if (flag === 0) {
    let url = url1
    if (id) {
      url = url + `date_req=${id}`;   
    }
  return superagent.post(url)
    .then(res => {
      const decodedBody = iconv.encode(iconv.decode(new Buffer(res.body, 'binary'), 'win1251'), 'utf8').toString();
      return decodedBody;
    })
    .then(decodedBody => xml2js.parseStringPromise(decodedBody))
    .then(result => {
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
      return { date: result.ValCurs.$.Date, valute };
    })
    .catch(console.error);
  }
}

const change = (arg1, arg2) => {
  if (arg1 !== '') {
    url1 = arg1;
    console.log('url1: ', url1);
  }
  if (arg12 !== '') {
    url2 = arg2;
    console.log('url2: ', url2);
  }
}

const info = () => {
  return { url1: url1, url2: url2 }
}


module.exports = { parser, info, change };
