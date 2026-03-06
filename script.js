let roundsP1 = 5
let roundsP2 = 5

let p1Moves=[]
let p2Moves=[]

let p1Wins=0
let p2Wins=0
let draws=0

const icons = {
R: "✊",
P: "✋",
S: "✌️"
}

const screens=document.querySelectorAll(".screen")

function showScreen(id){
screens.forEach(s=>s.classList.remove("active"))
document.getElementById(id).classList.add("active")
}

const p1value=document.getElementById("p1value")
const p2value=document.getElementById("p2value")

function updateDisplay(){
p1value.innerText=roundsP1
p2value.innerText=roundsP2
}

updateDisplay()

document.getElementById("p1plus").onclick=()=>{
if(roundsP1<20) roundsP1++
updateDisplay()
}

document.getElementById("p1minus").onclick=()=>{
if(roundsP1>1) roundsP1--
updateDisplay()
}

document.getElementById("p2plus").onclick=()=>{
if(roundsP2<20) roundsP2++
updateDisplay()
}

document.getElementById("p2minus").onclick=()=>{
if(roundsP2>1) roundsP2--
updateDisplay()
}

document.getElementById("startBtn").onclick=()=>{
createSlots("p1Moves",roundsP1)
showScreen("screen-p1")
}

function createSlots(container,n){

let div=document.getElementById(container)
div.innerHTML=""

for(let i=0;i<n;i++){
let s=document.createElement("div")
s.className="move-slot"
div.appendChild(s)
}

}

let currentMoveIndex=0

document.querySelectorAll("#screen-p1 .rps-buttons button")
.forEach(btn=>{
btn.onclick=()=>{
if(currentMoveIndex>=roundsP1)return

let move=btn.dataset.move
p1Moves[currentMoveIndex]=move

document.getElementById("p1Moves").children[currentMoveIndex].innerText=icon[move]

currentMoveIndex++
}
})

document.getElementById("confirmP1").onclick=()=>{
currentMoveIndex=0
createSlots("p2Moves",roundsP2)
showScreen("screen-pass")
}

document.getElementById("readyBtn").onclick=()=>{
showScreen("screen-p2")
}

document.querySelectorAll("#screen-p2 .rps-buttons button")
.forEach(btn=>{
btn.onclick=()=>{
if(currentMoveIndex>=roundsP2)return

let move=btn.dataset.move
p2Moves[currentMoveIndex]=move

document.getElementById("p2Moves").children[currentMoveIndex].innerText=icon[move]

currentMoveIndex++
}
})

document.getElementById("confirmP2").onclick=()=>{
showScreen("screen-result")
startResultAnimation()
}

function startResultAnimation(){

let rows=Math.max(roundsP1,roundsP2)

let tbody=document.querySelector("#resultTable tbody")
tbody.innerHTML=""

for(let i=1;i<=rows;i++){

let tr=document.createElement("tr")

let c1=document.createElement("td")
let c2=document.createElement("td")
let c3=document.createElement("td")

c1.innerText=i
c2.classList.add("grey")
c3.classList.add("grey")

tr.appendChild(c1)
tr.appendChild(c2)
tr.appendChild(c3)

tbody.appendChild(tr)

}

setTimeout(showP1,1000)
setTimeout(showP2,2600)
setTimeout(compareRounds,4800)
setTimeout(showFinal,9200)

}

function showP1(){

let rows=document.querySelectorAll("#resultTable tbody tr")

rows.forEach((row,i)=>{
if(i<roundsP1){
setTimeout(()=>{
row.children[1].innerText=icon[p1Moves[i]]
},i*175)
}
})

}

function showP2(){

let rows=document.querySelectorAll("#resultTable tbody tr")

rows.forEach((row,i)=>{
if(i<roundsP2){
setTimeout(()=>{
row.children[2].innerText=icon[p2Moves[i]]
},i*175)
}
})

}

function compareRounds(){

let rows=document.querySelectorAll("#resultTable tbody tr")

rows.forEach((row,i)=>{

setTimeout(()=>{

let m1=p1Moves[i]
let m2=p2Moves[i]

if(!m1 && m2){
row.children[2].classList.remove("grey")
p2Wins++
return
}

if(!m2 && m1){
row.children[1].classList.remove("grey")
p1Wins++
return
}

if(m1===m2){
row.children[1].classList.remove("grey")
row.children[2].classList.remove("grey")
draws++
return
}

if(
(m1==="R" && m2==="S")||
(m1==="P" && m2==="R")||
(m1==="S" && m2==="P")
){
row.children[1].classList.remove("grey")
p1Wins++
}else{
row.children[2].classList.remove("grey")
p2Wins++
}

},i*400)

})

}

function showFinal(){

let text=
`Player 1: ${p1Wins}<br>
Player 2: ${p2Wins}<br>
Draw: ${draws}<br><br>`

if(p1Wins>p2Wins) text+="PLAYER 1 WINS"
else if(p2Wins>p1Wins) text+="PLAYER 2 WINS"
else text+="DRAW"

document.getElementById("finalResult").innerHTML=text

}

document.getElementById("replayBtn").onclick=()=>{

p1Moves=[]
p2Moves=[]
p1Wins=0
p2Wins=0
draws=0
currentMoveIndex=0

createSlots("p1Moves",roundsP1)

showScreen("screen-p1")

}

document.getElementById("resetBtn").onclick=()=>location.reload()
