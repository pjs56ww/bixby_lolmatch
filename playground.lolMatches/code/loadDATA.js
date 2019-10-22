module.exports.function = function loadDATA (modes) {

  const naverURL = 'https://sports.news.naver.com/esports/index.nhn';
  const youtubeURL = ''
  const afreecatvURL = 'http://play.afreecatv.com/aflol'
  const twitchtvURL = 'https://www.twitch.tv/lck_korea'

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
  var day = new String(date.getDate()+4);  // 변경 필요

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

  if(modes == 0){
    return {
      state : "라이브 중인 경기가 없습니다."
    };
  }
  else{
    aa = response[modes - 1]["TeamAKey"] + " VS " + response[modes - 1]["TeamBKey"] + " 경기가 진행 중입니다."
    
    

    return {
      state : aa,

      youtubeURL : youtubeURL,
      twitchtvURL : twitchtvURL,
      afreecatvURL : afreecatvURL,
      naverURL: naverURL,

    };
  }
}
