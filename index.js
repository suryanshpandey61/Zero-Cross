const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//ik funtion bnaye jisse game start se initialze ho
function initGame(){
      currentPlayer="O";
      // yha par start me ham pure shells ko empty bnayeyge 
      gameGrid=["","","","","","","","",""];

      //start me new game wali btn invisible hai 
    

      //UI par bhi karna padega boxes ko empty

      boxes.forEach((box,index)=>{
          box.innerHTML="";
          boxes[index].style.pointerEvents="all";
          
          
          //one more thing is missing  color ko remove krna 
          //initialize css with original property
            box.classList=`box box${index+1}`;
      })
      
      //start me hamne O ki chance hai to vo phle  se set  hoga
      gameInfo.innerText=`Current Player - ${currentPlayer}`;
      newGameBtn.classList.remove("active");
};
initGame();


//index ka use hamne isiliye kia hai taki pta chal sake ki konsebox par click hua hai
boxes.forEach((box,index)  => {
    box.addEventListener("click",()=>{
        handleClick(index);
    })
     
});


 function handleClick(index){
   if(gameGrid[index]===""){
    boxes[index].innerText=currentPlayer;
    gameGrid[index]=currentPlayer;
    boxes[index].style.pointerEvents="none";
    //chance change karo X hai o karo
    swapTurn();

    //check kro ki koi jeeta to nhi hai

    checkGameOver();


   }
}
function swapTurn(){
    if(currentPlayer=="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
};
function checkGameOver(){
    let answer="";
  
    winningPositions.forEach((position)=>{

        //is if  condition s yeh hoga ki aapki boxes khali to nahi hai aur sari value exactly same  hai 
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="" )
        && (gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
           
            // check krna hai ki kon jeeta hai 
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            //ab ik log jeet chuke hai toh dubara s pointer ko none krdo 
            boxes.forEach((box) =>{
                box.style.pointerEvents="none";
            })

            //phir jeetne ke baaad sbka bg color green kr do aur sbki class list me green color add kr do 


            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
        
    });
   
     
    //iska mtlb winner mill chuka hai to winner show krna hai game info wale me aur
    //new game wali button ko visible krna hai 
     
     if(answer!=""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
     }

     // ab check krenge ki kahi baraber(match tie to nhi hua ) to nhi hua hai 
        let fillCount=0;
        gameGrid.forEach((box)=>{
            if(box!=""){
                fillCount++;
            }
        });

        //ab chheck kre ki sare cells bhar chuke hai 
        if(fillCount===9){
            gameInfo.innerText="Match Tied !";
            newGameBtn.classList.add("active");
        }
};





newGameBtn.addEventListener("click",initGame);