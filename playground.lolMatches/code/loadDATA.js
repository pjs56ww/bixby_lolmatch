module.exports.function = function loadDATA (modes) {
  

  const naverURL = 'https://sports.news.naver.com/esports/index.nhn';
  const youtubeURL = ' '
  const afreecatvURL = 'http://play.afreecatv.com/aflol'
  const twitchtvURL = 'https://www.twitch.tv/lck_korea'

  
  aa = modes["liveteamA"] + " vs " + modes["liveteamB"]
  liveURL = {
    youtubeURL : youtubeURL,
    twitchtvURL : twitchtvURL,
    afreecatvURL : afreecatvURL,
    naverURL: naverURL,
  }
  
  state = {
    match: aa, 
    liveURL: liveURL
  }
  if (modes["livemode"] == 1){
    return {
      state : state, 
    };
  }
  else{
    return
  }
    
}
