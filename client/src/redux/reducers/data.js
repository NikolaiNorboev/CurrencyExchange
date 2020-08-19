import { TODAYCURRENCY } from '../actionsType';

const initialState = {
  "date": "19.08.2020",
  "valute": [
      {
          "id": "R01010",
          "name": "Австралийский доллар",
          "charCode": "AUD",
          "nominal": 1,
          "value": 53.0694
      },
      {
          "id": "R01020A",
          "name": "Азербайджанский манат",
          "charCode": "AZN",
          "nominal": 1,
          "value": 43.2208
      },
      {
          "id": "R01035",
          "name": "Фунт стерлингов Соединенного королевства",
          "charCode": "GBP",
          "nominal": 1,
          "value": 96.6073
      },
      {
          "id": "R01060",
          "name": "Армянских драмов",
          "charCode": "AMD",
          "nominal": 100,
          "value": 15.1406
      },
      {
          "id": "R01090B",
          "name": "Белорусский рубль",
          "charCode": "BYN",
          "nominal": 1,
          "value": 29.7863
      },
      {
          "id": "R01100",
          "name": "Болгарский лев",
          "charCode": "BGN",
          "nominal": 1,
          "value": 44.6287
      },
      {
          "id": "R01115",
          "name": "Бразильский реал",
          "charCode": "BRL",
          "nominal": 1,
          "value": 13.3283
      },
      {
          "id": "R01135",
          "name": "Венгерских форинтов",
          "charCode": "HUF",
          "nominal": 100,
          "value": 24.9379
      },
      {
          "id": "R01200",
          "name": "Гонконгских долларов",
          "charCode": "HKD",
          "nominal": 10,
          "value": 94.7474
      },
      {
          "id": "R01215",
          "name": "Датская крона",
          "charCode": "DKK",
          "nominal": 1,
          "value": 11.7287
      },
      {
          "id": "R01235",
          "name": "Доллар США",
          "charCode": "USD",
          "nominal": 1,
          "value": 73.4321
      },
      {
          "id": "R01239",
          "name": "Евро",
          "charCode": "EUR",
          "nominal": 1,
          "value": 87.3401
      },
      {
          "id": "R01270",
          "name": "Индийских рупий",
          "charCode": "INR",
          "nominal": 100,
          "value": 98.2172
      },
      {
          "id": "R01335",
          "name": "Казахстанских тенге",
          "charCode": "KZT",
          "nominal": 100,
          "value": 17.5411
      },
      {
          "id": "R01350",
          "name": "Канадский доллар",
          "charCode": "CAD",
          "nominal": 1,
          "value": 55.774
      },
      {
          "id": "R01370",
          "name": "Киргизских сомов",
          "charCode": "KGS",
          "nominal": 100,
          "value": 94.3303
      },
      {
          "id": "R01375",
          "name": "Китайский юань",
          "charCode": "CNY",
          "nominal": 1,
          "value": 10.6024
      },
      {
          "id": "R01500",
          "name": "Молдавских леев",
          "charCode": "MDL",
          "nominal": 10,
          "value": 44.1697
      },
      {
          "id": "R01535",
          "name": "Норвежских крон",
          "charCode": "NOK",
          "nominal": 10,
          "value": 83.0934
      },
      {
          "id": "R01565",
          "name": "Польский злотый",
          "charCode": "PLN",
          "nominal": 1,
          "value": 19.8572
      },
      {
          "id": "R01585F",
          "name": "Румынский лей",
          "charCode": "RON",
          "nominal": 1,
          "value": 18.0565
      },
      {
          "id": "R01589",
          "name": "СДР (специальные права заимствования)",
          "charCode": "XDR",
          "nominal": 1,
          "value": 103.6707
      },
      {
          "id": "R01625",
          "name": "Сингапурский доллар",
          "charCode": "SGD",
          "nominal": 1,
          "value": 53.7688
      },
      {
          "id": "R01670",
          "name": "Таджикских сомони",
          "charCode": "TJS",
          "nominal": 10,
          "value": 71.2242
      },
      {
          "id": "R01700J",
          "name": "Турецких лир",
          "charCode": "TRY",
          "nominal": 10,
          "value": 99.3964
      },
      {
          "id": "R01710A",
          "name": "Новый туркменский манат",
          "charCode": "TMT",
          "nominal": 1,
          "value": 21.0106
      },
      {
          "id": "R01717",
          "name": "Узбекских сумов",
          "charCode": "UZS",
          "nominal": 10000,
          "value": 71.5503
      },
      {
          "id": "R01720",
          "name": "Украинских гривен",
          "charCode": "UAH",
          "nominal": 10,
          "value": 26.9715
      },
      {
          "id": "R01760",
          "name": "Чешских крон",
          "charCode": "CZK",
          "nominal": 10,
          "value": 33.3904
      },
      {
          "id": "R01770",
          "name": "Шведских крон",
          "charCode": "SEK",
          "nominal": 10,
          "value": 84.685
      },
      {
          "id": "R01775",
          "name": "Швейцарский франк",
          "charCode": "CHF",
          "nominal": 1,
          "value": 81.0419
      },
      {
          "id": "R01810",
          "name": "Южноафриканских рэндов",
          "charCode": "ZAR",
          "nominal": 10,
          "value": 42.0935
      },
      {
          "id": "R01815",
          "name": "Вон Республики Корея",
          "charCode": "KRW",
          "nominal": 1000,
          "value": 61.9586
      },
      {
          "id": "R01820",
          "name": "Японских иен",
          "charCode": "JPY",
          "nominal": 100,
          "value": 69.5215
      }
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TODAYCURRENCY:
      return action.obj;
    default:
      return state;
  }
};
