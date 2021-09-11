let arr = true;

function changeeverything()
{
    if(arr === false){
        document.querySelector("#mainblock").style.backgroundColor = "black";
        document.querySelector("#mainblock").style.color = "white";
        arr = true;
    }
    else
    {
        document.querySelector("#mainblock").style.backgroundColor = "white";
        document.querySelector("#mainblock").style.color = "black";
        arr = false;
    }
}

function removeSpaces(params){
      var text = params;
      text = text.trim();
      let str = "";
      for(var i=0 ; i< text.length ; i++){
        if(text[i] == ' '){
          str += '%20';
        }
        else{
          str += text[i];
        }
      }
      return text;
}

async function getcurrentdata(params) {
    var temp = removeSpaces(params);
    try {
        const response = await fetch(`https://imdb8.p.rapidapi.com/title/find?q=${temp}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "be0fec2925mshf5ef2d2e4099adfp1e8b6fjsn6ce27adc8b6f"}
    })
    const response_1 = await response.json();
      console.log(response_1);
      return response_1;
    }
    catch (err) {
      console.error(err);
    }
}

async function aryan(movienamed){
    let showdata = await getcurrentdata(movienamed);

    document.getElementById('moviename').value = "";

    for(var i = 0 ; i<4 ; i++)
    {
      if(showdata.results[i].title !==undefined)
      {
        document.getElementById(`titlename${i+1}`).innerHTML = `Title : ${showdata.results[i].title}`;
        document.getElementById(`runningtime${i+1}`).innerHTML = `Running Time : ${showdata.results[i].runningTimeInMinutes} minutes`;
        document.getElementById(`year${i+1}`).innerHTML = `Year : ${showdata.results[i].year}`;
        document.getElementById(`titletype${i+1}`).innerHTML = `Titletype : ${showdata.results[i].titleType}`;
        if(showdata.results[i].image !== undefined)
          document.getElementById(`url${i+1}`).setAttribute( "src" , showdata.results[i].image.url);
        else
          document.getElementById(`url${i+1}`).setAttribute( "src" , "default.jpg" );
      }
      else{
        document.getElementById(`titlename${i+1}`).innerHTML = "";
        document.getElementById(`runningtime${i+1}`).innerHTML = "";
        document.getElementById(`year${i+1}`).innerHTML = "";
        document.getElementById(`titletype${i+1}`).innerHTML = "";
        document.getElementById(`url${i+1}`).setAttribute( "src" , "noresults.jpg");
      }
    }
}

async function getdefaultdata(){

    let showdata = await getcurrentdata('Fast and furious');

    for(var i = 0 ; i<4 ; i++)
    {
      document.getElementById(`titlename${i+1}`).innerHTML = `Title : ${showdata.results[i].title}`;
      document.getElementById(`runningtime${i+1}`).innerHTML = `Running Time : ${showdata.results[i].runningTimeInMinutes} minutes`;
      document.getElementById(`year${i+1}`).innerHTML = `Year : ${showdata.results[i].year}`;
      document.getElementById(`titletype${i+1}`).innerHTML = `Titletype : ${showdata.results[i].titleType}`;
      document.getElementById(`url${i+1}`).setAttribute( "src" , showdata.results[i].image.url);
    }
}

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('button').onclick = changeeverything
})


// let temporary = document.getElementById('moviename').value;
//    console.log(temporary);

window.addEventListener("load", getdefaultdata)

document.querySelector('#searchingbutton').onclick = function(){
  let movienamed = document.getElementById('moviename').value;
  aryan(movienamed);
}

