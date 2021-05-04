async function getData(){
  const response =  await fetch('https://flagcdn.com/en/codes.json')
  const data = await response.json()
  for (i in data)
    sessionStorage.setItem(i,data[i])

}
function storeData(){
  for(i in sessionStorage){
    if(String(i).length == 2)
      codes_names.push({'code':i, 'name':sessionStorage.getItem(i)})
  }
}


// you can find author of this function here [https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#:~:text=The%20de%2Dfacto%20unbiased%20shuffle,Yates%20(aka%20Knuth)%20Shuffle.&text=function%20shuffle(array)%20%7B%20var,while%20(0%20!%3D%3D]
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function change(){
  num = Math.floor(Math.random() * 252);
  var option_names = [Math.floor(Math.random() * 252),Math.floor(Math.random() * 252),num];
  shuffle(option_names);
  image.style.backgroundImage='url(images/' + codes_names[num]['code'] + '.svg)';
  var inc = 0;
  options.forEach(function(option){
    option.style.backgroundColor = 'white';
    option.style.color = 'black';
    option.firstElementChild.innerHTML = '';
    option.firstChild.textContent =  String.fromCharCode(65+inc) +'. ' + codes_names[option_names[inc++]]['name'];
  })
  
}
function check(evt){
  const option = evt.currentTarget;
  if(option.firstChild.textContent.substring(3) == codes_names[num]['name']){
    option.firstElementChild.innerHTML = '<i class = "fas fa-check-circle"></i>';
    option.style.backgroundColor = '#34a853';
    option.style.color = 'white';
  }
  else{
    option.firstElementChild.innerHTML = '<i class = "fas fa-times-circle"></i>';
    option.style.backgroundColor = '#e94235';
    option.style.color = 'white';
  }
  setTimeout(change,500);
}
codes_names = []
const image = document.querySelector('.image');
const options = document.querySelectorAll('.options')
const wrong1 = document.querySelector('.option1');
const wrong2 = document.querySelector('.option2');
const wrong3 = document.querySelector('.option3');
var num;
getData();
storeData();
change();
options.forEach(function(option){
  option.addEventListener('click',check,false)
});


