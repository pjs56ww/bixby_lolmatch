module.exports.function = function judgeLIVE (team_key, competition_key) {
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
  var day = new String(date.getDate());  //변경필요
  // 한자리수일 경우 0을 채워준다. 

  var live_mode = 0
  var teamA = ' '
  var teamB = ' '

  var team_code = 0
  var competition_code = 0


  if(month.length == 1){ 
    month = "0" + month; 
  } 

  if(day.length == 1){ 
    day = "0" + day; 
  } 

  DATE = String(year) + "-" + month + "-" + day;
  var url = BASE_URL + DATE + API_KEY;
  response = http.getUrl(url, {format:"json", cacheTime: 0})
  timeNow = Number(date.getHours()) + 9 //변경필요
  console.log(timeNow)
  if (response != []){
    for(var i = 0; i < response.length; i++){
      aa = Number(response[i]["DateTime"].slice(11, 13))
      if (response[i]["SeasonType"]==1){
        if(aa + 9 <= timeNow && aa + 10 > timeNow){
          live_mode = 1
          teamA = response[i]["TeamAKey"]
          teamB = response[i]["TeamBKey"]
        }
      }
      else {
        if(aa + 9 <= timeNow && aa + 14 > timeNow){
          live_mode = 1
          teamA = response[i]["TeamAKey"]
          teamB = response[i]["TeamBKey"]
        }
      }
    }
  }
  else{
    live_mode = 0
  }
  console.log(teamdb)

  // keyword에 따른 모드
  // Default 값은 가장 가까운 대회 정보
  if(competition_key != '' ) {
 
    competition_code =  competitiondb.competitionCode[competition_key]
    
  }
  else if(team_key != '' ) {
    console.log(4)
    team_code = teamdb.teamCode[team_key]
    
  }
  else{
    console.log(5)
  }

  modes = {
    livemode: live_mode,
    liveteamA: teamA,
    liveteamB: teamB,
    teamcode: team_code,
    competitioncode: competition_code
  };


  return modes;
}



// 올해 LCK 결과
// 모든 일정
// 지난 경기 => 대회 판단
// 라이브 중이면 띄워주고 아니면 일정 보여주기
// 팀별 일정 보여주기