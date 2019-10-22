module.exports.function = function judgeLIVE (keyword) {
  const config = require('config');
  const fail = require('fail');
  const http = require('http');
  const console = require('console');
  const BASE_URL = 'https://api.sportsdata.io/v3/lol/scores/json/GamesByDate/';

  const API_KEY = '?key=1ede798d572d41bc853c6b69ddeb1425';


  var DATE = ''
  var date = new Date(); 
  var year = date.getFullYear(); 
  var month = new String(date.getMonth()+1); 
  var day = new String(date.getDate()); 

  // 한자리수일 경우 0을 채워준다. 
  if(month.length == 1){ 
    month = "0" + month; 
  } 
  if(day.length == 1){ 
    day = "0" + day; 
  } 

  DATE = String(year) + "-" + month + "-" + day;
  var url = BASE_URL + DATE + API_KEY;

  response = http.getUrl(url, {format:"json", cacheTime: 0})

  timeNow = Number(date.getHours()) + 9 + 13
  console.log(timeNow)
  if (response != []){
    if (keyword == "라이브"){

      for(var i = 0; i < response.length; i++){
        aa = Number(response[i]["DateTime"].slice(11, 13))
        if(aa + 9 == timeNow){
          mode = i + 2
          return mode
        }
      }
      mode = 1
      return mode
    }
    
    else{
      mode = 1
      return mode
    }
  }

  else{
    mode = 0
    return mode
  }

}
