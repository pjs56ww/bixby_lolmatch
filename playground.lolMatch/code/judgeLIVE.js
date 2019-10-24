module.exports.function = function JudgeLive (timekey) {
  const config = require('config');
  const fail = require('fail');
  const http = require('http');
  const console = require('console');
  const BASE_URL = 'https://api.sportsdata.io/v3/lol/scores/json/GamesByDate/';

  const API_KEY = '?key=1ede798d572d41bc853c6b69ddeb1425';

  var teamdb = require('./data/TeamCode.js')
  var competitiondb = require('./data/CompetitionCode.js')

  // 라이브 판정
  var DATE = ''
  var date = new Date(); 
  var year = date.getFullYear(); 
  var month = new String(date.getMonth()+1); 
  var day = new String(date.getDate() + 3);  //변경필요 => 기본값 var day = new String(date.getDate());
  // 한자리수일 경우 0을 채워준다. 

  var live_mode = 0 // output
  var teamA = ' '
  var teamB = ' '
  var match_flag = 0
  var match = []

  var teamAKey = []  // match 내 key 값들
  var teamBKey = []
  var teamAScore = []
  var teamBScore = []
  var datetime = []

  if(month.length == 1){ 
    month = "0" + month; 
  } 

  if(day.length == 1){ 
    day = "0" + day; 
  } 

  const naverURL = 'https://sports.news.naver.com/esports/index.nhn';
  const youtubeURL = ' '
  const afreecatvURL = 'http://play.afreecatv.com/aflol'
  const twitchtvURL = 'https://www.twitch.tv/lck_korea'

  
  liveURL = {
    twitchtvURL : twitchtvURL,
    afreecatvURL : afreecatvURL,
    naverURL: naverURL,
  }
  
  // LCK Spring 1~ 4
  // MSI 4~ 5
  // LCK Summer 6~ 9
  // Rift Rivals 7
  // World Championship 9~ 11

  var competitioninfo = 0


  DATE = String(year) + "-" + month + "-" + day;
  var url = BASE_URL + DATE + API_KEY;
  response = http.getUrl(url, {format:"json", cacheTime: 0})
  timeNow = Number(date.getHours()) + 9 + 6 //변경필요 기본값 => timeNow = Number(date.getHours()) + 9
  console.log(timeNow)

  if (response.length != 0){
    match_flag = 1
    for(var i = 0; i < response.length; i++){
      aa = Number(response[i]["DateTime"].slice(11, 13))


      if (response[i]["SeasonType"]==1){
        if(aa + 9 <= timeNow && aa + 10 > timeNow){

          // if (response[i]["TeamAId"] in teamdb.teamCode && response[i]["TeamBId"] in teamdb.teamCode){
          //   if (Number(response[i]["DateTime"].slice(5, 7)) <= 4){
          //     competitioninfo = 1 // LCK Spring
          //   }
          //   else if (Number(response[i]["DateTime"].slice(5, 7)) > 5 && Number(response[i]["DateTime"].slice(5, 7)) <= 9){
          //     competitioninfo = 2 // LCK Summer
          //   }
          // }
          // else if (response[i]["TeamAId"] in teamdb.teamCode && !(response[i]["TeamBId"] in teamdb.teamCode)) {
          //   if (Number(response[i]["DateTime"].slice(5, 7)) >= 4 && Number(response[i]["DateTime"].slice(5, 7)) <= 5){
          //     competitioninfo = 3  // MSI
          //   }
          //   else if (Number(response[i]["DateTime"].slice(5, 7)) == 5){
          //     competitioninfo = 4 // Rift Rivals
          //   }
          //   else if (Number(response[i]["DateTime"].slice(5, 7)) >= 9 && Number(response[i]["DateTime"].slice(5, 7)) <= 11){
          //     competitioninfo = 5 // World Champions
          //   }
          // }

          live_mode = 1
          teamA = response[i]["TeamAKey"]
          teamB = response[i]["TeamBKey"]
          teamAKey.push(response[i]["TeamAKey"])
          teamBKey.push(response[i]["TeamBKey"])
          teamAScore.push(" ")
          teamBScore.push(" ")

          

          if ((aa + 9) >= 24){
            aa = aa - 24
            datetime.push(String(aa + 9)+':00')
          }
          else{
            datetime.push(String(aa + 9)+':00')
          }
        }
        else if (timeNow >= aa + 10){
          teamAKey.push(response[i]["TeamAKey"])
          teamBKey.push(response[i]["TeamBKey"])
          teamAScore.push(String(response[i]["TeamAScore"]))
          teamBScore.push(String(response[i]["TeamBScore"]))
          if ((aa + 9) >= 24){
            aa = aa - 24
            datetime.push(String(aa + 9)+':00')
          }
          else{
            datetime.push(String(aa + 9)+':00')
          }
        }
        else {
          teamAKey.push(response[i]["TeamAKey"])
          teamBKey.push(response[i]["TeamBKey"])
          teamAScore.push(' ')
          teamBScore.push(' ')
          if ((aa + 9) >= 24){
            aa = aa - 24
            datetime.push(String(aa + 9)+':00')
          }
          else{
            datetime.push(String(aa + 9)+':00')
          }
          
        }

      }
      else {
        if(aa + 9 <= timeNow && aa + 14 > timeNow){
          live_mode = 1
          teamA = response[i]["TeamAKey"]
          teamB = response[i]["TeamBKey"]
          teamAKey.push(response[i]["TeamAKey"])
          teamBKey.push(response[i]["TeamBKey"])
          teamAScore.push(" ")
          teamBScore.push(" ")
          if ((aa + 9) >= 24){
            aa = aa - 24
            datetime.push(String(aa + 9)+':00')
          }
          else{
            datetime.push(String(aa + 9)+':00')
          }
        }
        else if (timeNow >= aa + 14){
          teamAKey.push(response[i]["TeamAKey"])
          teamBKey.push(response[i]["TeamBKey"])
          teamAScore.push(String(response[i]["TeamAScore"]))
          teamBScore.push(String(response[i]["TeamBScore"]))
          if ((aa + 9) >= 24){
            aa = aa - 24
            datetime.push(String(aa + 9)+':00')
          }
          else{
            datetime.push(String(aa + 9)+':00')
          }
        }
        else {
          teamAKey.push(response[i]["TeamAKey"])
          teamBKey.push(response[i]["TeamBKey"])
          teamAScore.push(' ')
          teamBScore.push(' ')
          if ((aa + 9) >= 24){
            aa = aa - 24
            datetime.push(String(aa + 9)+':00')
          }
          else{
            datetime.push(String(aa + 9)+':00')
          }
        }
      }
      
    }
  }
  else{
    live_mode = 0
    match_flag = 0
  }
  if (response.length == 1 && live_mode == 1){
    match_flag = 0
  }
  
  for (i in teamAKey) {
    var temp = {
      teamAkey: teamAKey[i],
      teamBkey: teamBKey[i],
      teamAscore :  teamAScore[i],
      teamBscore : teamBScore[i],
      datetime : datetime[i]
    }

    match.push(temp)
  }


  modes = {
    livemode: live_mode,
    matchflag: match_flag,
    liveteamA: teamA,
    liveteamB: teamB,
    liveURL: liveURL,
    match: match
  };

  // 라이브 중이 아니면 
  // {
  //   livemode: 0,
  //   liveteamA : " ",
  //   liveteamB : " ",
  //   liveURL : liveURL
  // }

  // 라이브 중이면
  // {
  //   livemode: 1,
  //   liveteamA : "GRF",
  //   liveteamB : "IG",
  //   liveURL : liveURL
  // }

  
  return modes;
}



// 올해 LCK 결과
// 모든 일정
// 지난 경기 => 대회 판단
// 라이브 중이면 띄워주고 아니면 일정 보여주기
// 팀별 일정 보여주기