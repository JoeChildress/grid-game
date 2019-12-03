import "./styles.css";

//number list
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

//initiate game
gridGame(nums, document.getElementById("app"));

function gridGame(ar, el) {
  let firstNum; //first selected square
  let score = 0;

  //randomize the number order
  shuffle(ar);

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  //add grid to page element
  el.innerHTML = generateGrid(nums);

  function generateGrid(nums) {
    let squares = "";
    nums.forEach(n => {
      squares += `<div class="square hide"><span>${n}</span></div>`;
    });
    return "<div class='container'>" + squares + "</div>";
  }

  //add click hanlder to squares
  document.querySelectorAll(".square").forEach(sq => {
    sq.addEventListener("click", handleClick);
  });
}
function handleClick(e) {
  const clickedBox = e.currentTarget;

  //check to see if already selected
  if (!clickedBox.classList.contains("hide")) {
    console.log("already selected, try another");
    return;
  }

  //first square selected
  if (!firstNum) {
    //remove hide class to show number and add as first number selected
    clickedBox.classList.toggle("hide");
    firstNum = clickedBox;

    //if second square selected and not previously selected
  } else if (firstNum && !checkClicked(clickedBox)) {
    //reveal 2nd box
    clickedBox.classList.toggle("hide");

    //if matching numbers
    if (clickedBox.textContent === firstNum.textContent) {
      //add classes to designate as matched
      clickedBox.classList.add("match");
      firstNum.classList.add("match");

      //increment score
      if (score < 8) {
        score++;
        clearfirstNum();
      }

      //check if winner
      if (score === 8) {
        document.querySelector("#success").textContent = "YOU WIN!!!";
      }

      //not matching numbers
    } else {
      //hide unmatched elements with a slight delay
      setTimeout(function() {
        clickedBox.classList.toggle("hide");
        firstNum.classList.toggle("hide");
        firstNum.classList.toggle("in-play");
        clearfirstNum();
      }, 1000);
    }
  }
}

function checkClicked(el) {
  if (!el.classList.contains("hide")) {
    return true;
  }
}

function clearfirstNum() {
  firstNum = undefined;
}

/*
//1-8 twice
//4 x 4 (16)
//random order

//var for 1st number clicked 
  - add class to show or remove hiding class

//- 2nd clicked compare
  //-if match class to both = success
  //or remove class that is hiding

  //if not match then remove add class to hide


var overall count = success 8
  if that number = 8 GG

  start with array of each number 
  jumble the array out of order
  loop through and generate each square

  css for the grid

*/
