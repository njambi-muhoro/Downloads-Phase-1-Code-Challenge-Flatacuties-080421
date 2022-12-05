function cuteAnimals() {
  fetch("http://localhost:7000/characters")
    .then((res) => {
      return res.json();
    })

    .then((listOfAnimals) => {
      let ourMainDiv = document.querySelector("#character-bar");
      // const divVotes = document.getElementsByClassName("animalsVote");

      for (let cuteName of listOfAnimals) {
        //create an element that takes in the name of each animal from our db.json file
        //  ourMainDiv.innerHTML += `<div class="characterBar">
        //  <p> <span id="animalNames"> ${cuteName.name} </span> </p>
        // <p> <img class="imgs" src="${cuteName.image}" alt="${cuteName.name}"> </p>
        //  </div>`

        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "characterBar");
        ourMainDiv.appendChild(newDiv);

        let characterName = document.createElement("p");
        let ourSpan = document.createElement("span");
        ourSpan.setAttribute("id", "animalNames");
        ourSpan.innerHTML = `${cuteName.name}`;
        let newPWithSpan = characterName.appendChild(ourSpan);
        console.log(ourSpan);
        newDiv.appendChild(newPWithSpan);

        let ourImage = document.createElement("img");
        ourImage.setAttribute("class", "imgs");
        ourImage.src = `${cuteName.image}`;
        ourImage.alt = `${cuteName.name}`;
        newDiv.appendChild(ourImage);
        console.log(ourImage);

        const ps = document.createElement("p");
        ps.setAttribute("id", "hidden");
        ps.innerHTML = parseInt(`${cuteName.votes}`);
        newDiv.appendChild(ps);
      }

      //Downloads/Phase-1-Code-Challenge-Flatacuties-080421/code-challenge

      // everytime we click on the name of the animal it should show and when we want to click on another name the intial name clears away
      let newSpanAndImage = "";
      const clickableDiv = document.getElementsByClassName("characterBar");

      for (const oneDiv of clickableDiv) {
        oneDiv.addEventListener("click", (e) => {
          newSpanAndImage = "";
          //calling the elements we want to assign to new elements

          const nameoFCharacter =
            oneDiv.querySelector("#animalNames").innerText;
          //assign value to them
          console.log(nameoFCharacter);

          const imageOfCharacter = oneDiv.querySelector(".imgs");
          const srcOfImageOfCharacter = imageOfCharacter.src;

          let spanVote = oneDiv.querySelector("#hidden").innerHTML;
          console.log(spanVote);
          // const spanVote = oneDiv.querySelector(".voteCount").innerText;

          newSpanAndImage = {
            nameoFCharacter,
            srcOfImageOfCharacter,
            spanVote,
          };

          buildNewElements();
        });
        function buildNewElements() {
          //calling the elements into which we want our already created elemts and their values to go to(values can either be strings or number or boolean etc)
          document.querySelector("#name").innerText =
            newSpanAndImage.nameoFCharacter;
          document.querySelector("#image").src =
            newSpanAndImage.srcOfImageOfCharacter;

          document.querySelector("#vote-count").innerText =
            newSpanAndImage.spanVote;
        }
      }

      const form = document.querySelector("form#votes-form");
      // we call our input element
      let input = document.querySelector("#votes");
      
      let characterVote = document.querySelector("span#vote-count");

      // we make our addEventListener
      form.addEventListener("submit", (e) => {
        e.preventDefault();
      let  totalVotes = parseInt(input.value) + parseInt(characterVote.innerText);
        characterVote.innerText = totalVotes;
      
        let spans = document.querySelector("#animalNames ") // we are calling the span we intitialized at the top when creating a new animal
        
        spans.forEach((ourSpan)=>{
          
          let currentNameOfAnimal = document.querySelector("#name").innerText; // the current elements in our HTML FILE hosting the name
          if(ourSpan.innerText === currentNameOfAnimal){
            let parentDiv = ourSpan.closest(".characterBar");
            parentDiv.getElementById("hidden").innerText = totalVotes;
            
          }
        })
        form.reset();
      });
      //select the reset button
      resetButton = document.getElementById("reset-btn");
      resetButton.addEventListener('click',()=>{
        let  totalVotes = parseInt(input.value) + parseInt(characterVote.innerText);
        characterVote.innerText = 0;

        let spans = document.querySelector("#animalNames") // we are calling the span we intitialized at the top when creating a new animal
        
        spans.forEach((ourSpan)=>{
          let currentNameOfAnimal = document.querySelector("#name").innerText; // the current elements in our HTML FILE hosting the name
          if(ourSpan.innerText === currentNameOfAnimal){
            let parentDiv = ourSpan.closest(".characterBar");
            parentDiv.getElementById("hidden").innerText =0;
          }
          form.reset()
      })
      
      
      


    });
  })
}

document.addEventListener("DOMContentLoaded", function () {
  cuteAnimals();
})

