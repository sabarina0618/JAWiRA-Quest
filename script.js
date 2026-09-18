
const WORDS = [
 {rumi:"BUKU", jawi:"بوکو", letters:["ب","و","ک","و"]},
 {rumi:"MATA", jawi:"ماتا", letters:["م","ا","ت","ا"]},
 {rumi:"BAJU", jawi:"باجو", letters:["ب","ا","ج","و"]},
 {rumi:"BOLA", jawi:"بولا", letters:["ب","و","ل","ا"]},
 {rumi:"DADU", jawi:"دادو", letters:["د","ا","د","و"]},
 {rumi:"SUSU", jawi:"سوسو", letters:["س","و","س","و"]},
 {rumi:"PITA", jawi:"ڤيتا", letters:["ڤ","ي","ت","ا"]},
 {rumi:"SIKU", jawi:"سيکو", letters:["س","ي","ک","و"]},
 {rumi:"MEJA", jawi:"ميجا", letters:["م","ي","ج","ا"]},
 {rumi:"KUDA", jawi:"کودا", letters:["ک","و","د","ا"]},
 {rumi:"SAPU", jawi:"ساڤو", letters:["س","ا","ڤ","و"]},
 {rumi:"CILI", jawi:"چيلي", letters:["چ","ي","ل","ي"]},
 {rumi:"ROTI", jawi:"روتي", letters:["ر","و","ت","ي"]},
 {rumi:"SAKU", jawi:"ساکو", letters:["س","ا","ک","و"]},
 {rumi:"BECA", jawi:"بيچا", letters:["ب","ي","چ","ا"]},
 {rumi:"GIGI", jawi:"ݢيݢي", letters:["ݢ","ي","ݢ","ي"]},
 {rumi:"IKAN", jawi:"ايکن", letters:["ا","ي","ک","ن"]},
 {rumi:"KAYU", jawi:"کايu".replace("u","و"), letters:["ک","ا","ي","و"]},
 {rumi:"IBU", jawi:"ايبو", letters:["ا","ي","ب","و"]},
 {rumi:"BAS", jawi:"بس", letters:["ب","س"]},
 {rumi:"TAS", jawi:"تس", letters:["ت","س"]},
 {rumi:"PADI", jawi:"ڤادي", letters:["ڤ","ا","د","ي"]},
 {rumi:"KERA", jawi:"کيرا", letters:["ک","ي","ر","ا"]},
 {rumi:"KOLA", jawi:"کولا", letters:["ک","و","ل","ا"]}
];
let score=0, index=0, current=null, selected=[];
const $=id=>document.getElementById(id);
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function show(id){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));$(id).classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}
function renderBank(){
 $("bank").innerHTML=WORDS.map((w,i)=>`<button class="word-card" onclick="chooseWord(${i})"><div class="jawi">${w.jawi}</div><b>${w.rumi}</b></button>`).join("");
}
function chooseWord(i){index=i;startRound()}
function startRound(){current=WORDS[index];selected=[];$("score").textContent=score;show("gameScreen");renderRound()}
function renderRound(){
 $("gameWord").textContent=current.rumi;
 $("answer").textContent="";
 $("feedback").textContent="";
 const area=$("letters");area.innerHTML="";
 shuffle(current.letters.concat(["ا"])).forEach((l,n)=>{
  const b=document.createElement("button");b.className="letter";b.textContent=l;
  b.onclick=()=>{if(b.disabled)return;selected.push(l);b.disabled=true;b.classList.add("selected");$("answer").textContent=selected.join("")};
  area.appendChild(b);
 });
}
function check(){
 if(selected.join("")===current.jawi){score+=10;$("score").textContent=score;$("feedback").textContent="🎉 BETUL! +10 MARKAH";$("feedback").style.color="#20814a";$("next").style.display="inline-block"}
 else {$("feedback").textContent="CUBA LAGI 😊 Baca dan susun dari kanan ke kiri.";$("feedback").style.color="#c14c4c"}
}
function nextWord(){index=(index+1)%WORDS.length;startRound()}
function speak(){
 if(!("speechSynthesis" in window))return;
 speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(current.rumi);u.lang="ms-MY";u.rate=.78;speechSynthesis.speak(u)
}
document.addEventListener("DOMContentLoaded",()=>{
 renderBank();
 $("start").onclick=()=>{score=0;index=0;startRound()};
 $("learn").onclick=()=>show("learnScreen");
 $("how").onclick=()=>show("infoScreen");
 $("home").onclick=()=>show("homeScreen");
 $("backHome").onclick=()=>show("homeScreen");
 $("check").onclick=check;
 $("next").onclick=nextWord;
 $("listen").onclick=speak;
 $("next").style.display="none";
});
