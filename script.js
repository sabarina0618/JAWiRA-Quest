
function speak(text){
  if('speechSynthesis' in window){
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang='ms-MY'; speechSynthesis.speak(u);
  }
}
const gameLetters=[
  {a:'ا', n:'Alif'}, {a:'ب', n:'Ba'}, {a:'ت', n:'Ta'}, {a:'ث', n:'Tha'},
  {a:'ج', n:'Jim'}, {a:'ح', n:'Ha'}, {a:'خ', n:'Kha'}, {a:'د', n:'Dal'},
  {a:'ذ', n:'Dzal'}, {a:'ر', n:'Ra'}, {a:'ز', n:'Zai'}, {a:'س', n:'Sin'}
];
let score=0, round=0;
function startGame(){
  score=0; round=0; nextQuestion();
}
function nextQuestion(){
  const q=document.getElementById('question');
  const choices=document.getElementById('choices');
  const result=document.getElementById('result');
  if(!q||!choices)return;
  if(round>=10){
    q.textContent='🎉';
    choices.innerHTML='';
    result.textContent=`Permainan tamat! Skor anda: ${score}/10`;
    return;
  }
  const correct=gameLetters[Math.floor(Math.random()*gameLetters.length)];
  const pool=[correct];
  while(pool.length<4){
    const x=gameLetters[Math.floor(Math.random()*gameLetters.length)];
    if(!pool.some(v=>v.n===x.n)) pool.push(x);
  }
  pool.sort(()=>Math.random()-.5);
  q.textContent=correct.a;
  choices.innerHTML=pool.map(x=>`<button class="choice" onclick="answer('${x.n.replace(/'/g,"\\'")}','${correct.n.replace(/'/g,"\\'")}')">${x.n}</button>`).join('');
  result.textContent=`Soalan ${round+1}/10`;
}
function answer(selected,correct){
  const result=document.getElementById('result');
  if(selected===correct){score++;result.textContent='✅ Betul!';}
  else result.textContent=`❌ Belum tepat. Jawapan: ${correct}`;
  round++;
  setTimeout(nextQuestion,700);
}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-speak]').forEach(el=>{
    el.addEventListener('click',()=>speak(el.dataset.speak));
  });
});
