const info=document.getElementById("info");
const cells=document.querySelectorAll(".cell");
const reset=document.getElementById("reset");
console.log(cells);
let currentPlayer,win,draw,winningPlayer;
const players=['O','X'];
initialize(); 
function initialize(){
    let choice=Math.floor(Math.random()*2)
    currentPlayer=players[choice];
    info.innerHTML="You may start the game. Turn of : "+currentPlayer;
    win=false;
    draw=false;
    winningPlayer=null;
    cells.forEach((cell)=>{
        cell.innerHTML="";
        cell.addEventListener("click",handleClick,{once:true});
    })
}

const winningPatterns=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]
function handleClick(){
    
    console.log(this)
    this.innerHTML=currentPlayer;
    checkWin();
    if(win ){
        info.innerHTML="Winner is : " +currentPlayer;
        cells.forEach((cell)=>{
            cell.removeEventListener("click",handleClick,{once:true});
        })
        // alert("The winner is " +currentPlayer);
        return;
    }
    if (draw){
        info.innerHTML="Draw";
        cells.forEach((cell)=>{
            cell.removeEventListener("click",handleClick,{once:true});
        })
        // alert("DRAW");
        return;
    }
    if (win||draw){
        cells.forEach((cell)=>{
            cell.removeEventListener("click",handleClick,{once:true});
        })
    }   
    currentPlayer=currentPlayer==="O"?"X":"O";
    info.innerHTML="Turn of : " +currentPlayer;
}
function checkWin(){
    let data=[];
    console.log(data);
    cells.forEach((cell)=>{
        data.push(cell.innerHTML);
    })
    winningPatterns.forEach((pattern)=>{
        let [a,b,c]=pattern;
        if (data[a]&&data[b]&&data[c]){
            if (data[a]===data[b] && data[b]===data[c]){
                win=true;
                winningPlayer=currentPlayer;
                return;
            }
        }
    })
    if (!data.includes("")){
        draw=true;
        return;
    }
}
reset.addEventListener("click",()=>{
    initialize();
})