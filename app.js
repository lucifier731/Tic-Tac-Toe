 //har ek button ko acces krna chahte hia 
 let boxes = document.querySelectorAll(".box"); 
 let resetBtn = document.querySelector("#reset-btn"); 
 let newGameBtn = document.querySelector("#new-btn");
 let msgContainer = document.querySelector(".msg-container"); 
 let msg = document.querySelector("#msg"); 

 //kisi turn hai X ya O ki?
 let turnO = true; //if turnO==true, toh hamare button ke upar O aaega 

 //storing count of number of boxes done
 let cnt = 0; 

 //storing winning patterns
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]; 

//button pr click krte hi kuch action hona chahiye, hence eventListeners add krenge hum
boxes.forEach((box)=>{
    box.addEventListener("click", () =>{
        // console.log("box was clicked"); 
        // box.innerText="Abcd"; 
        if(turnO){
            box.innerText="O"; 
            box.style.color = "green"; 
            turnO= false; 
        }else{
            box.innerText="X";
            box.style.color="pink";  
            turnO= true;
        }
        box.disabled = true; //to disable change of value of boxes upon multiple clicks

        //everytime a button is clicked and X or O is marked on it
        //we will check whether we can get a winner or not
        //by comparing winPatterns and positions of X or O
        checkWinner(); 
    }); 
}); 


const disabledBoxes = () =>{
    for(let box of boxes){
        box.disabled = true; 
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false; 
        box.innerText=""; 
    }
    cnt = 0; 
}


const checkWinner = () =>{

    let flag = 0; 
    for(let pattern of winPatterns){
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]); 
         
        let pos1Val = boxes[pattern[0]].innerText; 
        let pos2Val = boxes[pattern[1]].innerText; 
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val === pos2Val && pos2Val===pos3Val){
                // console.log("winner is",pos1Val); 
                flag = 1; 
                showWinner(pos1Val); 
            }
        }
        
    }

    cnt = cnt+1; 
    if(cnt==9 && flag == 0){
        msg.innerText = "Match is drawn"; 
        msgContainer.classList.remove("hide"); 
    } 
    // console.log(cnt); 
}


//now we can print our winner, html me kuch code add krenge
const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`; 
    msgContainer.classList.remove("hide"); 
    disabledBoxes(); 
}


const resetGame = () =>{
    turnO = true; 
    //saare boxes empty ho jaaenge 
    enableBoxes(); 
    msgContainer.classList.add("hide"); 
}

newGameBtn.addEventListener("click",resetGame); 
resetBtn.addEventListener("click",resetGame); 


