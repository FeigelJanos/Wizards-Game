/*CASHING THE DOM*/

/*Non constant global variables*/
let charChoice = "n";  														//No character chosen
let upgradeG = false; 														//Good character not upgraded
let upgradeE = false; 														//Evil character not upgraded
let turnCounter = 1; 														//Current turn

let goodHP = 10;  															//starting HP, MP and XP values
let goodMP = 20;
let goodXP = 0;
let evilHP = 20;
let evilMP = 10;
let evilXP = 0;

/*Matching Javascript constants to HTML elements by ID*/
const matchCounter_span = document.getElementById("match-counter"); 		//Writes the current match number
const restart_button = document.getElementById("restart"); 					//Restart button

const goodHP_span = document.getElementById("health-good"); 				//Character attributes
const goodMana_span = document.getElementById("mana-good");
const goodXP_span = document.getElementById("xp-good");
const evilHP_span = document.getElementById("health-evil");
const evilMana_span = document.getElementById("mana-evil");
const evilXP_span = document.getElementById("xp-evil");

const goodLabel_span = document.getElementById("good-label"); 				//Characters
const evilLabel_span = document.getElementById("evil-label");

const goodImage_span = document.getElementById("wizard-tim");         //Character portraits
const evilImage_span = document.getElementById("wizard-bob");

const firstAttack_span = document.getElementById("attack1"); 				//Attack buttons
const secondAttack_span = document.getElementById("attack2");
const thirdAttack_span = document.getElementById("attack3");
const fourthAttack_span = document.getElementById("attack4");

const actionMessage_div = document.querySelector(".action-message > p"); 	//Action message
const tips_span = document.getElementById("tips"); 							//Info prompt

const firstGoodStar_span= document.getElementById("g1"); 					//Victory stars
const secondGoodStar_span= document.getElementById("g2");
const thirdGoodStar_span= document.getElementById("g3");
const firstEvilStar_span=document.getElementById("e1");
const secondEvilStar_span=document.getElementById("e2");
const thirdEvilStar_span=document.getElementById("e3");




/*GAME RESET*/

/*Resets everything to the starting level if you push reset. It removes every possible added classes and event listeners*/
function restart() { 	
  upgradeG = false;																	//Reset the global variables to their starting value.
  upgradeE = false;
  turnCounter = 1;
  charChoice = "n";
  goodHP = 10;
  goodMP = 20;
  goodXP = 0;
  evilHP = 20;
  evilMP = 10;
  evilXP = 0;
  
  actionMessage_div.innerHTML = "Choose your Wizard!";								//Rewrite the starting action message
  
  firstAttack_span.innerHTML = "First Attack";										//Rename the attack buttons
  secondAttack_span.innerHTML = "Second Attack";
  thirdAttack_span.innerHTML = "Third Attack";

  firstAttack_span.classList.remove("attack-e");									//Remove the evil look from the first three attack buttons
  secondAttack_span.classList.remove("attack-e");
  thirdAttack_span.classList.remove("attack-e");

  firstAttack_span.classList.remove("attack-g");									//Remove the good look from the first three attack buttons
  secondAttack_span.classList.remove("attack-g");
  thirdAttack_span.classList.remove("attack-g");

  firstAttack_span.classList.remove("attack-e-u");									//Remove the upgraded evil look from the first three attack buttons
  secondAttack_span.classList.remove("attack-e-u");
  thirdAttack_span.classList.remove("attack-e-u");

  firstAttack_span.classList.remove("attack-g-u");									//Remove the upgraded good look from the first three attack buttons
  secondAttack_span.classList.remove("attack-g-u");
  thirdAttack_span.classList.remove("attack-g-u");

  fourthAttack_span.classList.remove("attack-g-u");									//Make the fourth attack button disappear
  fourthAttack_span.classList.remove("attack-e-u");
  fourthAttack_span.classList.remove("attack");

  firstAttack_span.classList.add("attack");											//Make the first three attack buttons look inactive
  secondAttack_span.classList.add("attack");
  thirdAttack_span.classList.add("attack");

  goodLabel_span.classList.add("character");										//Make the wizard labels reactive to mouse hover
  evilLabel_span.classList.add("character");

  goodLabel_span.classList.remove("chosen");										//Remove the look that indicates that you chose that wizard label
  evilLabel_span.classList.remove("chosen");

  evilImage_span.classList.remove("chosen-picture");                    //Remove the chosen look from the pictures
  goodImage_span.classList.remove("chosen-picture");
  
  evilImage_span.src="https://i.postimg.cc/gc3mfDDC/Red-Wizard-Bob3.jpg";
  goodImage_span.src="https://i.postimg.cc/tTjq4qhz/Blue-Wizard-Tim3.jpg";
  
  evilLabel_span.classList.remove("evil-caster-u");									//Remove upgraded look from wizard labels and give them the starting look
  goodLabel_span.classList.remove("good-caster-u");
  evilLabel_span.classList.add("evil-caster");
  goodLabel_span.classList.add("good-caster");

  firstAttack_span.removeEventListener("click", attack, false);						//Make the attack buttons non reactive to clicks
  secondAttack_span.removeEventListener("click", attack, false);
  thirdAttack_span.removeEventListener("click", attack, false);
  fourthAttack_span.removeEventListener("click", attack, false);
  
  fourthAttack_span.removeEventListener("mouseout", writeBlank, false);				//Remove the info trigger from the fourth attack
  fourthAttack_span.removeEventListener("mouseenter", writeInfo, false);
 
  goodLabel_span.addEventListener("click", charCG);									//Make the wizards choosable again
  evilLabel_span.addEventListener("click", charCE);
  
  goodHP_span.innerHTML = "10/10";													//Reset the attributes to their base value
  goodMana_span.innerHTML = "20/20";
  evilHP_span.innerHTML = "20/20";
  evilMana_span.innerHTML = "10/10";
  goodXP_span.innerHTML = "0/10";
  evilXP_span.innerHTML = "0/10";
  
  matchCounter_span.innerHTML = "Match 1";											//Reset the match counter to the first match
  
  fourthAttack_span.innerHTML = "";													//Remove the fourth attack name
  
  evilLabel_span.innerHTML = "Bob the Red Wizard";									//Rename the wizards to their not upgraded name
  goodLabel_span.innerHTML = "Tim the Blue Wizard";
  
  firstGoodStar_span.classList.remove("active-star");								//Remove all of the victory stars from the page
  secondGoodStar_span.classList.remove("active-star");
  thirdGoodStar_span.classList.remove("active-star");
  firstEvilStar_span.classList.remove("active-star");
  secondEvilStar_span.classList.remove("active-star");
  thirdEvilStar_span.classList.remove("active-star");
}

/*END OF TURN FUNCTIONS*/

/*Checking if character is upgaded or not. If upgraded, gives skill boos of 5 and a 4. attack. */
function checkUpgrade() {
  if (goodXP >= 10) {																//If good wizard has ten or more XP
    upgradeG = true;																//upgradeG variable becomes true
    if (charChoice == "g") {														//If character choice was good wizard
      fourthAttack_span.innerHTML = "Phoenix Flame";								//Add the fourth good attack with listeners to the attack buttons
      fourthAttack_span.addEventListener("click", attack);
      fourthAttack_span.addEventListener("mouseout", writeBlank);
      fourthAttack_span.addEventListener("mouseenter", writeInfo);
      fourthAttack_span.classList.add("attack-g-u");
	  
	  firstAttack_span.classList.remove("attack");									//Remove inactive looks from attack buttons
	  secondAttack_span.classList.remove("attack");
	  thirdAttack_span.classList.remove("attack");
	  fourthAttack_span.classList.remove("attack");

      firstAttack_span.classList.remove("attack-g");								//Remove simple attack looks from attack buttons
      secondAttack_span.classList.remove("attack-g");
      thirdAttack_span.classList.remove("attack-g");

      firstAttack_span.classList.add("attack-g-u");									//Add upgraded attack looks from attack buttons
      secondAttack_span.classList.add("attack-g-u");
      thirdAttack_span.classList.add("attack-g-u");
    }
      goodHP = 15;																	//Chosen or not good wizard's attributes become upgraded
      goodMP = 20;
      goodHP_span.innerHTML = "15/15";												//Write them out to the page
      goodMana_span.innerHTML = "20/20";
      goodLabel_span.innerHTML = "Tim the Teal Wizard";								//Rename the good wizard
      goodLabel_span.classList.remove("good-caster");								//Remove the non upgraded wizard label look
      goodLabel_span.classList.add("good-caster-u");								//Add the upgraded wizard label look
      goodImage_span.src="https://i.postimg.cc/5y9f8sKY/Blue-Wizard-Tim4.jpg";
  }
  if (evilXP >= 10) {																//If evil wizard has ten or more XP
    upgradeE = true;                                //upgradeE variable becomes true
   
    if (charChoice == "e") {														//If chosen wizard is evil
      fourthAttack_span.innerHTML = "Immolate";										//Add the fourth evil attack with listeners to the attack buttons
      fourthAttack_span.addEventListener("click", attack);
      fourthAttack_span.addEventListener("mouseout", writeBlank);
      fourthAttack_span.addEventListener("mouseenter", writeInfo);
      fourthAttack_span.classList.add("attack-e-u");
	  
	  firstAttack_span.classList.remove("attack");									//Remove inactive look from attack buttons
	  secondAttack_span.classList.remove("attack");
	  thirdAttack_span.classList.remove("attack");
	  fourthAttack_span.classList.remove("attack");

      firstAttack_span.classList.remove("attack-e");								//Remove not upgraded look from attack buttons
      secondAttack_span.classList.remove("attack-e");
      thirdAttack_span.classList.remove("attack-e");

      firstAttack_span.classList.add("attack-e-u");									//Add upgraded look to attack buttons
      secondAttack_span.classList.add("attack-e-u");
      thirdAttack_span.classList.add("attack-e-u"); 
    }
      evilHP = 20;																	//Chosen or not, upgraded wizard gains upgraded attributes
      evilMP = 15;
      evilHP_span.innerHTML = "20/20";												//Those are written out onto the page
      evilMana_span.innerHTML = "15/15";
      evilLabel_span.innerHTML = "Bob the Purple Wizard";							//The wizard's label gains a different name
      evilLabel_span.classList.remove("evil-caster");								//Remove unupgraded label style
      evilLabel_span.classList.add("evil-caster-u");								//Add upgraded label style to the evil wizard' label
      evilImage_span.src="https://i.postimg.cc/Bbh4p2Rh/Red-Wizard-Bob4.jpg";
  }  
}

/*Resets the wizard attributes to the beginning values*/
function turnReset() {
  checkUpgrade();															//Starts the check upgrade function
  matchCounter_span.innerHTML = "Match " + turnCounter;						//Writes out the current turn number
  firstAttack_span.addEventListener("click", attack);						//First attack button reacts to mouse click by starting the attack function 
  secondAttack_span.addEventListener("click", attack);						//Adds attack event to the second attack button
  thirdAttack_span.addEventListener("click", attack);						//Adds attack event to the third attack button
  
  if (upgradeG == false) {													//If good wizard is not upgraded
    goodHP = 10;															//Good HP becomes 10
    goodMP = 20;															//Good MP becomes 20

    goodHP_span.innerHTML = "10/10";										//Write out starting good HP
    goodMana_span.innerHTML = "20/20";										//Write out starting good mana
  if (charChoice=='g'){														//If the player chose the evil wizard, make the attack buttons look active
	  firstAttack_span.classList.remove("attack");
	  secondAttack_span.classList.remove("attack");
	  thirdAttack_span.classList.remove("attack");

      firstAttack_span.classList.add("attack-g");
      secondAttack_span.classList.add("attack-g");
      thirdAttack_span.classList.add("attack-g");
}	
  }

	
 if(upgradeE == false){														//If evil wizard is not upgraded
	evilHP = 20;															//Evil HP becomes 20
    evilMP = 10;															//Evil MP becomes 10
	
	evilHP_span.innerHTML = "20/20";										//Write out starting evil HP to the page
    evilMana_span.innerHTML = "10/10";										//Write out starting evil mana
	
	if (charChoice=='e'){													//If the player chose the evil wizard, make the attack buttons look active
	  firstAttack_span.classList.remove("attack");
	  secondAttack_span.classList.remove("attack");
	  thirdAttack_span.classList.remove("attack");

      firstAttack_span.classList.add("attack-e");
      secondAttack_span.classList.add("attack-e");
      thirdAttack_span.classList.add("attack-e");
}	
 }

}
 
  
/*ADJUSTING THE ATTRIBUTES ON THE SITE AFTER ATTACKS, 
AND CHECKING FOR END OF TURN, OR END OF GAME*/

/*Adds a victory star under the good wizard's name*/
function addGStar(){
   
  if(firstGoodStar_span.classList.contains("active-star")==false){						//If the first victory star for the good Wizard is not active
        firstGoodStar_span.classList.add("active-star");								//Add the class that activates the first victory star
        firstGoodStar_span.addEventListener("mouseenter", writeInfo);					//Adds the info listener to the first star
		firstGoodStar_span.addEventListener("mouseout", writeBlank);					//Adds the blank listener if you leave the star
       }
   
  else if (secondGoodStar_span.classList.contains("active-star")==false){				//Else if second victory star for the good Wizard is not active
		secondGoodStar_span.classList.add("active-star");								//Add the class that activates the second victory star
		secondGoodStar_span.addEventListener("mouseenter", writeInfo);					//Adds the info listener to the second star
		secondGoodStar_span.addEventListener("mouseout", writeBlank);					//Adds the blank listener if you leave the star
 }
   
  else if(thirdGoodStar_span.classList.contains("active-star")==false){					//Else if the third victory star for the good Wizard is not active
        thirdGoodStar_span.classList.add("active-star"); 								//Add the class that activates the third victory star
		thirdGoodStar_span.addEventListener("mouseenter", writeInfo);					//Adds the info listener to the third star
		thirdGoodStar_span.addEventListener("mouseout", writeBlank);					//Adds the blank listener if you leave the star
            }  
  }
  
/*Adds a victory star under the evil wizard's name*/  
function addEStar(){
  
    if(firstEvilStar_span.classList.contains("active-star")==false){  					//If the first victory star for the evil Wizard is not active
		firstEvilStar_span.classList.add("active-star");								//Add the class that activates the first victory star
        firstEvilStar_span.addEventListener("mouseenter", writeInfo);					//Adds the info listener to the first star
		firstEvilStar_span.addEventListener("mouseout", writeBlank);					//Adds the blank listener if you leave the star
   }
   
    else if(secondEvilStar_span.classList.contains("active-star")==false){				//Else if second victory star for the evil Wizard is not active
		secondEvilStar_span.classList.add("active-star");								//Add the class that activates the second victory star
		secondEvilStar_span.addEventListener("mouseenter", writeInfo);					//Adds the info listener to the second star
		secondEvilStar_span.addEventListener("mouseout", writeBlank);					//Adds the blank listener if you leave the star
   }
         
	else if(thirdEvilStar_span.classList.contains("active-star")==false){				//Else if the third victory star for the evil Wizard is not active
		thirdEvilStar_span.classList.add("active-star");								//Add the class that activates the third victory star
		thirdEvilStar_span.addEventListener("mouseenter", writeInfo);					//Adds the info listener to the third star
		thirdEvilStar_span.addEventListener("mouseout", writeBlank);					//Adds the blank listener if you leave the star
   }    
      
  }

/*Updates the status bars after each attack*/
function updateBars() {
  goodMana_span.innerHTML = goodMP + "/20";									//Writes out the current Mana for the good wizard on the page
  goodXP_span.innerHTML = goodXP + "/10";									//Writes out the current good XP
  evilXP_span.innerHTML = evilXP + "/10";									//Writes out the current evil XP
  evilHP_span.innerHTML = evilHP + "/20";									//Writes out the current evil HP
 

   if (upgradeG == true) {   
      goodHP_span.innerHTML = goodHP + "/15";								//If good wizard is upgraded, write out the upgraded HP value
   }
   else {
	    goodHP_span.innerHTML = goodHP + "/10";								//If not, write out this value
   }
   
    if (upgradeE == true) {
      evilMana_span.innerHTML = evilMP + "/15";								//If evil wizard is upgraded write out the upgraded mana value
  }
  else{															
	   evilMana_span.innerHTML = evilMP + "/10";							//If not, write out this base value
  }

}
/*Cheks the player and computer caracter health, if any one reaches 0, it terminates the turn, or ends the game.*/
function checkHealth() {
 
  updateBars();															//Starting the updateBars function
 
    if (goodHP < 1 || evilHP < 1) {										//If good HP or evil HP is under 1
 
      if (	charChoice == "g" && goodHP < 1 && evilHP > 0) {			//If the chosen character's HP is less than 1 and the other character's HP is more than 0
        actionMessage_div.insertAdjacentHTML( "beforeend", " You lost this match.");		//Write out, "you lost this match"
		addEStar();																			//Add a victory star to the computer player
      } 
	  else if( charChoice == "e" && evilHP < 1 && goodHP > 0){			//If the chosen character's HP is less than 1 and the other character's HP is more than 0
		actionMessage_div.insertAdjacentHTML( "beforeend", " You lost this match.");		//Write out, "you lost this match"
		addGStar();		 																	//Add a victory star to the computer player
	  }
	  else if (charChoice == "e" && goodHP < 1 && evilHP > 0) {			//If the chosen character's HP is more than 0 and the computer is 0
        actionMessage_div.insertAdjacentHTML("beforeend", " You won this match.");			//Write out "you won this match"
		addEStar();																			//Add a victory star to the player character
      } 
	  else if (charChoice == "g" && evilHP < 1 && goodHP > 0){			//If the chosen character's HP is more than 0 and the computer is 0
		actionMessage_div.insertAdjacentHTML("beforeend", " You won this match."); 			//Write out "you won this match"
		addGStar();																			//Add a victory star to the player character
	  }
	  else if (goodHP < 1 && evilHP < 1) {								//If both HP is at 0
        actionMessage_div.insertAdjacentHTML("beforeend", " This match is a draw.");		//Write out "its a draw"
		addEStar();																			//Add victory stars to both players
		addGStar();	
      }
      
      if (turnCounter < 3) {											//If the turn counter is less than 3
     turnCounter++;														//Increases the turn counter by 1
	 turnReset();														// and starts the turn reset function
    }
		else if (turnCounter >= 3)  {									//If the turn counter is equal or bigger than 3
      firstAttack_span.removeEventListener("click", attack, false);		//Remove the reactivity of the first attack button
      secondAttack_span.removeEventListener("click", attack, false);	//and the second attack button
      thirdAttack_span.removeEventListener("click", attack, false);		//and the third attack button
      fourthAttack_span.removeEventListener("click", attack, false);	//and the fourth attack button.
      actionMessage_div.innerHTML = "Game Over";  						//Finally write out on the page "Game Over"
	  
	  firstAttack_span.classList.remove("attack-e");					//Remove the active look of attack buttons
	  secondAttack_span.classList.remove("attack-e");
	  thirdAttack_span.classList.remove("attack-e");

	  firstAttack_span.classList.remove("attack-g");
	  secondAttack_span.classList.remove("attack-g");
	  thirdAttack_span.classList.remove("attack-g");

	  firstAttack_span.classList.remove("attack-e-u");
	  secondAttack_span.classList.remove("attack-e-u");
	  thirdAttack_span.classList.remove("attack-e-u");

	  firstAttack_span.classList.remove("attack-g-u");
	  secondAttack_span.classList.remove("attack-g-u");
	  thirdAttack_span.classList.remove("attack-g-u");

	  fourthAttack_span.classList.remove("attack-g-u");
	  fourthAttack_span.classList.remove("attack-e-u");

	  firstAttack_span.classList.add("attack");							//Give inactive look to attack buttons
	  secondAttack_span.classList.add("attack");
	  thirdAttack_span.classList.add("attack");
	  
	  if(charChoice=='e' && upgradeE== true){							//If the character had gained fourth attack before game end
	  fourthAttack_span.classList.add("attack");						//Give the fourth attack an inactive look
	  }
	  else if (charChoice=='g' && upgradeG== true){
	  fourthAttack_span.classList.add("attack"); 
	  }
  }
  }
}

/*PLAYER NEXT ATTACK LIMITATIONS*/

/* Removes the listeners from the buttons that can no longer be used. And adds listeners */

function checkMana() {
  if (charChoice == "e") {			//If the chosen player character is evil wizard
    switch (evilMP) {				//if evilMP is...
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:																//...between 0 and 5 
        thirdAttack_span.removeEventListener("click", attack, false);		//Third attack button no longer reacts to mouse click event
		thirdAttack_span.classList.remove("attack-e");						//Making the third attack button look inactive
		thirdAttack_span.classList.remove("attack-e-u");
		thirdAttack_span.classList.add("attack");
        
		
		if (goodMP < 1) {													//If the good MP is less than 1
          secondAttack_span.removeEventListener("click", attack, false);	//Remove second attack listener
		  secondAttack_span.classList.remove("attack-e");					//Making the second attack  button look inactive
		  secondAttack_span.classList.remove("attack-e-u");
		  secondAttack_span.classList.add("attack");
        } else if(upgradeE==true){											//If opponent mana is more than 0 and player character upgraded
		  secondAttack_span.classList.remove("attack");						//Make second attack button look upgraded and active
		  secondAttack_span.classList.add("attack-e-u");
		}
		else {																//If player is not upgraded and opponent have more than 0 mana
		  secondAttack_span.classList.remove("attack");						//Make second attack button look active but not upgraded
		  secondAttack_span.classList.add("attack-e");
		}
		
        fourthAttack_span.removeEventListener("click", attack, false);		//Remove fourth attack listener			
		fourthAttack_span.classList.remove("attack-e-u");					//Making the fourth attack button look inactive
		if(upgradeE==true){
		fourthAttack_span.classList.add("attack");
        }
        break;																//End switch.
      case 6:
      case 7:
      case 8:
      case 9:																//...between 6 and 9
        fourthAttack_span.removeEventListener("click", attack, false);		//Remove fourth attack listener		
		if(upgradeE==true){													//Making the fourth attack button look inactive
		fourthAttack_span.classList.remove("attack-e-u");	
		fourthAttack_span.classList.add("attack");
        }
		
        thirdAttack_span.addEventListener("click", attack);					//Add third attack listener
		thirdAttack_span.classList.remove("attack");						//Remove the class that makes the third attack button look inactive
		if(upgradeE==true){													//If character is upgraded															
		thirdAttack_span.classList.add("attack-e-u");						//Make the third attack button look upgraded active
		}
		else {
		thirdAttack_span.classList.add("attack-e");							//If that is false make the third attack button look non upgraded active
		}
		
        if (goodMP < 1) {													//If the good MP is less than 1
          secondAttack_span.removeEventListener("click", attack, false);	//Remove second attack listener
		  secondAttack_span.classList.remove("attack-e");					//Making the second attack  button look inactive
		  secondAttack_span.classList.remove("attack-e-u");
		  secondAttack_span.classList.add("attack");
        } else if(upgradeE==true){											//If opponent has more than 0 mana and upgraded
		  secondAttack_span.classList.remove("attack");						//second attack looks active and upgraded
		  secondAttack_span.classList.add("attack-e-u");
		}
		else {																//Else second attack should look active and not upgraded
		  secondAttack_span.classList.remove("attack");
		  secondAttack_span.classList.add("attack-e");
		}
        break;																//End switch.
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:																//...between 10 and 15
		if(upgradeE==true){													//If character is upgraded		
		fourthAttack_span.addEventListener("click", attack);				//Add fourth attack listener		
		fourthAttack_span.classList.add("attack-e-u");						//Make the fourth attack button look upgraded active
		}
		
        
		thirdAttack_span.addEventListener("click", attack);					//Add third attack listener
		thirdAttack_span.classList.remove("attack");						//Remove the class that makes the third attack button look inactive
		if(upgradeE==true){													//If character is upgraded															
		thirdAttack_span.classList.add("attack-e-u");						//Make the third attack button look upgraded active
		}
		else {
		thirdAttack_span.classList.add("attack-e");							//If that is false make the third attack button look non upgraded active
		}
		
        if (goodMP < 1) {													//If the good MP is less than 1
          secondAttack_span.removeEventListener("click", attack, false);	//Remove second attack listener
		  secondAttack_span.classList.remove("attack-e");					//Making the second attack  button look inactive
		  secondAttack_span.classList.remove("attack-e-u");
		  secondAttack_span.classList.add("attack");
        } else if(upgradeE==true){
		  secondAttack_span.classList.remove("attack");
		  secondAttack_span.classList.add("attack-e-u");
		}
		else {
		  secondAttack_span.classList.remove("attack");
		  secondAttack_span.classList.add("attack-e");
		}
        break;																//End switch.
    }
  } else {							//If the chosen character is not evil wizard (that means good wizard)
    switch (goodMP) {				//If goodMP is...
      case 0:
      case 1:
      case 2:																//...between 0 and 2
        fourthAttack_span.removeEventListener("click", attack, false); 		//Remove fourth attack listener
        if(upgradeG==true){													//If player char. is upgraded 
		fourthAttack_span.classList.remove("attack-g-u");					//make the fourth attack button look inactive.
		fourthAttack_span.classList.add("attack");
		}
		secondAttack_span.removeEventListener("click", attack, false);		//Remove second attack listener
        secondAttack_span.classList.remove("attack-g");						//Making the second attack button look inactive
		secondAttack_span.classList.remove("attack-g-u");
		secondAttack_span.classList.add("attack");
		
		thirdAttack_span.removeEventListener("click", attack, false);		//Remove third attack listener
        thirdAttack_span.classList.remove("attack-g");						//Making the third attack button look inactive
		thirdAttack_span.classList.remove("attack-g-u");
		thirdAttack_span.classList.add("attack");
		break;																//End switch.
	  
	  case 3:																//... is 3
        secondAttack_span.addEventListener("click", attack);				//Add second attack listener
		secondAttack_span.classList.remove("attack");						//Make the second attack button look active
		if(upgradeG==true){
		secondAttack_span.classList.add("attack-g-u");
		}
		else{
		secondAttack_span.classList.add("attack-g");
		}
		
        thirdAttack_span.removeEventListener("click", attack, false);		//Remove third attack listener	
        thirdAttack_span.classList.remove("attack-g");						//Making the third attack button look inactive
		thirdAttack_span.classList.remove("attack-g-u");
		thirdAttack_span.classList.add("attack");
		
		fourthAttack_span.removeEventListener("click", attack, false); 		//Remove fourth attack listener
        if(upgradeG==true){													//If player char. is upgraded 
		fourthAttack_span.classList.remove("attack-g-u");					//make the fourth attack button look inactive.
		fourthAttack_span.classList.add("attack");
		}
        break;																//End switch.
      case 4:																
      case 5:
      case 6:
      case 7:																//...between 4 and 7
        secondAttack_span.addEventListener("click", attack);				//Add second attack listener
		secondAttack_span.classList.remove("attack");						//Make the second attack button look active
		if(upgradeG==true){
		secondAttack_span.classList.add("attack-g-u");
		}
		else{
		secondAttack_span.classList.add("attack-g");
		}
		
        thirdAttack_span.addEventListener("click", attack);					//Add third attack listener
        thirdAttack_span.classList.remove("attack");						//Make the third attack button look active
		if(upgradeG==true){
		thirdAttack_span.classList.add("attack-g-u");
		}
		else{
		thirdAttack_span.classList.add("attack-g");
		}
		
		fourthAttack_span.removeEventListener("click", attack, false);		//Remove event listener	
        if(upgradeG==true){													//If player char. is upgraded 
		fourthAttack_span.classList.remove("attack-g-u");					//make the fourth attack button look inactive.
		fourthAttack_span.classList.add("attack");
		}
		break;																//End switch.
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:																//...between 8 and 20
        secondAttack_span.addEventListener("click", attack);				//Add second attack listener
        secondAttack_span.classList.remove("attack");						//Make the second attack button look active
		if(upgradeG==true){
		secondAttack_span.classList.add("attack-g-u");
		}
		else{
		secondAttack_span.classList.add("attack-g");
		}
		
		thirdAttack_span.addEventListener("click", attack);					//Add third attack listener
        thirdAttack_span.classList.remove("attack");						//Make the third attack button look active
		if(upgradeG==true){
		thirdAttack_span.classList.add("attack-g-u");
		}
		else{
		thirdAttack_span.classList.add("attack-g");
		}
		
		fourthAttack_span.addEventListener("click", attack);				//Add fourth attack listener
        if(upgradeG==true){
		fourthAttack_span.classList.remove("attack");	
		fourthAttack_span.classList.add("attack-g-u");
		}
		break;																//End switch.
    }
  }
}

/*LIMITING THE CHARACTER ATTRIBUTES*/

/*Checks the bars limits, and if below zero makes them equal to zero and if above maximum makes them equal to maximum.*/
function limit() {
  if (goodMP < 0) {			//If the good character's mana is below 0 it becomes 0.
    goodMP = 0;
  }
  if (evilMP < 0) {			//If the evil character's mana is below 0 it becomes 0.
    evilMP = 0;
  }
  if (goodXP > 10) {		//If the good character's XP is above 10 it becomes 10.
    goodXP = 10;
  }
  if (evilXP > 10) {		//If the evil character's XP is above 10 it becomes 10.
    evilXP = 10;
  }
  if (goodHP < 0){			//If the good character's HP is below 0 it becomes 0.
  goodHP = 0;
  }
  if (evilHP < 0){			//If the evil character's HP is below 0 it becomes 0.
  evilHP= 0;
  }
  
  if (upgradeG == false) {		//If the good character is not upgraded
    if (goodHP > 10) {			// If it has more than 10 HP
      goodHP = 10;				// It has 10 HP instead.
    }
  }
  else if (upgradeG == true) {		//If the good character is upgraded
      if (goodHP > 15) {			//If it has more than 15HP
        goodHP = 15;				//It has 15 HP instead.
      }
    }
	
  if (upgradeE == false){			//If the evil character is not upgraded
    if (evilMP > 10) {				// If it has more than 10 MP
      evilMP = 10;					// It has 10 MP instead.
    }
  } 
 else if (upgradeE == true) {		//If the evil character is upgraded
      if (evilMP > 15) {			//If it has more than 15 MP
        evilMP = 15;				//It has 15 MP instead.
      }
    } 
  
}

/*COMPUTER ATTACK CALCULATION*/

/*Calculates what attacks are available based on the computer character's Mana, for getCompChoice function. */
function timesCalc() {
  let x = 1; 								//Creates a variable x with initial value 1.
  if (charChoice == "g") {					//If the player chose good wizard (computer is evil wizard).
    if (evilMP < 6) {						//If evil mana is max 5 only the first and second attack is available
      x = 2;
    } else if (								//If the above is false, the character is named purple wizard AND has more than 9 mana all 4 attacks are choosable
      evilMP > 9 &&
      evilLabel_span.innerText == "Bob the Purple Wizard"
    ) {
      x = 4;
    } else {								//If none of the above is true the computer has the first 3 attacks available.
      x = 3;
    }
  }
  if (charChoice == "e") {					//If the player chose the evil wizard (computer is good wizard).
    if (goodMP < 3) {						// If the good mana is less than 3
      x = 1;								// Only the first attack is available.
    } else if (goodMP == 3) {				//If the good mana is equal to 3
      x = 2;								//The first and second attacks are available
    } else if (								// if none of the above is true. Wizard is named teal and good mana is above 8
      goodMP > 8 &&
      goodLabel_span.innerText == "Tim the Teal Wizard"
    ) {
      x = 4;								//All 4 attacks are available.
    } else {								// If none of the above is true. The first 3 attacks are available.
      x = 3;
    }
  }
  return x;									//Returns the value of variable x to the getCompChoice function.
}

/*Chooses the computer character, then creates a random computer attack*/
function getCompChoice() {
  let times = timesCalc();  										//Calculates the times variable's value by the timesCalc function
  let buttonArray = ["attack1", "attack2", "attack3", "attack4"]; 	//Creates an array with the possible attack button names
  let compChar = "g"; 												//creates a computer character variable with the initial value of 'g' (good wizard).
  if (charChoice == "g") { 											//if the player chose the 'g' wizard it changes the computer choice to 'e' (evil).
    compChar = "e";
  }

  let i = Math.floor(Math.random() * times); 		//i variable equals a random whole number between 0 and the value of the times variable -1.
  let compButton = buttonArray[i];					// The compButton variable equals the randomly chosen element from the array of attack buttons

  if (compChar == "e") {							//If the computer is the evil wizard
    if (goodMP < 1 && compButton == "attack2") {	//and the good wizard has no mana left AND the chosen attack was the "attack2" (Mana Drain)
      compButton = "attack1";						//Let the chosen attack become the "attack1" instead. Because mana drain is not useful in this case
    }
  }

  computeEffects(compChar, compButton);				//computes the chosen attack's effects depending on the computer's chosen character and attack. 
  actionsWriteOut("x", compButton);					//Writes out what the computer character has done this turn.
}


/*PLAYER ATTACK FUNCTIONS
these are called for computer attack as well but not from the attack function directly */

/*Writes out what attack you and the computer used into the turn summary.*/
function actionsWriteOut(firstPart, secondPart) {		//firstPart is filled if its the Player attacking, secondPart if the computer.
  let attackName = "ERROR. No attack name found."; 		//Default attack name, in case there is a problem with naming the attack

  function evilAttackNamer(attack) {  					//Naming the attacks if the evil character was chosen. The input is the attack chosen.
    switch (attack) {	 								//Gives back the attack names of the evil wizard from the name of the chosen button
      case "attack1":
        attackName = "Whip";
        break;
      case "attack2":
        attackName = "Mana Drain";
        break;
      case "attack3":
        attackName = "Burn";
        break;
      case "attack4":
        attackName = "Immolate";
        break;
    }
  }

  function goodAttackNamer(attack) { 				//Naming the attacks if the good character was chosen. The input is the attack button chosen.
    switch (attack) {								//Gives back the attack names of the good wizard from the name of the chosen button
      case "attack1":
        attackName = "Slash";
        break;
      case "attack2":
        attackName = "Smite";
        break;
      case "attack3":
        attackName = "Heal Self";
        break;
      case "attack4":
        attackName = "Phoenix Flame";
        break;
    }
  }

  if (firstPart === "x") { 														//if the attack is generated by the computer
    if (charChoice == "g") {  														//if the player chose good wizard
      evilAttackNamer(secondPart); 														//Start the evilAttackNamer function with the generated button
      actionMessage_div.insertAdjacentText( "beforeend", " and wizard Bob attacked with " + attackName +".");  //Write out the result as text on the page
    } else if (charChoice == "e") {  												//if the player chose evil wizard
      goodAttackNamer(secondPart); 														//Start the goodAttackNamer function with the generated button
      actionMessage_div.insertAdjacentText( "beforeend"," and wizard Tim attacked with " + attackName +".");	//Write out the result as text on the page
    }
  } 
  if (secondPart === "x") { 												//If the attack was generated by the player
    if (charChoice == "g") { 														//if the player chose good wizard
      goodAttackNamer(firstPart);														//Start the goodAttackNamer function with the clicked button
      actionMessage_div.innerHTML ="You attacked with " + attackName +".";
    } else if (charChoice == "e") {													//if the player chose evil wizard
      evilAttackNamer(firstPart);														//Start the evilAttackNamer function with the clicked button
      actionMessage_div.innerHTML ="You attacked with " + attackName+"." ;	//Write out the result as text on the page
    }
  }
}

/*Computes the effects of the chosen attacks, and adjusts the HP and Mana accordingly.*/
function computeEffects(character, button) { 
  switch (character + button) { //concatenates the two input variables into a single string. This gives a unique string to each possible attack
    case "eattack1":
      goodHP -= 2;
      break;
    case "eattack2":
      switch (goodMP) { //Checking the opponents MP to calculate the effect
        case 1:
          goodMP -= 1;
          evilMP += 1;
          break;
        case 2:
          goodMP -= 2;
          evilMP += 1;
          break;
        case 3:
          goodMP -= 3;
          evilMP += 2;
          break;
        default:
          goodMP -= 4;
          evilMP += 2;
          break;
      }
      evilXP++;
      break;
    case "eattack3":
      evilMP -= 6;
      goodHP -= 4;
      evilXP += 2;
      break;
    case "eattack4":
      goodHP -= 6;
      evilMP -= 10;
      break;
    case "gattack1":
      evilHP -= 2;
      break;
    case "gattack2":
      goodMP -= 3;
      evilHP -= 5;
      goodXP++;
      break;
    case "gattack3":
      goodMP -= 4;
      goodHP += 6;
      goodXP += 2;
      break;
    case "gattack4":
      evilHP -= 8;
      goodMP -= 9;
      break;
  }
}

/*ATTACK FUNCTION 
The main hub of this game.*/

/*Calculates what your chosen attack will do, and invites a function for the computer attack and a health and mana checking function*/
function attack() { 							//Function starts when the player clicks a valid attack button
  let chosenButton = this.getAttribute("id"); 	//Chosen button becomes equal to the chosen elements ID
  computeEffects(charChoice, chosenButton); 	//Starts function with the players chosen character and and the clicked button that calculates attack effects
  actionsWriteOut(chosenButton, "x"); 			//Writes out on the page what attack you chose.
  getCompChoice();								//calculates the computer's attack, and writes it out.
  limit();										//Limits the character attributes to their maximum and minimum possible values.
  checkMana();									//Removes or adds attack listeners from/to buttons depending on the player's mana.
  checkHealth();								//Checks player and computer health if some are at 0 starts a new turn
}

/*READYING THE CHARACTER*/

/*Renames the attacks according to the chosen character starts the attack function*/
function rename(choice) {									//starts after you chosen your character
  goodLabel_span.classList.remove("character"); 			//Character label no longer reacts to mouse with CSS
  evilLabel_span.classList.remove("character"); 			//Character label no longer reacts to mouse with CSS

  if (choice === "g") {										//if you chose good character
    goodLabel_span.classList.add("chosen");					//Good label looks different
    goodImage_span.classList.add("chosen-picture");         //Evil picture looks different
    
    firstAttack_span.innerHTML = "Slash";					//Renames the attack buttons
    secondAttack_span.innerHTML = "Smite";
    thirdAttack_span.innerHTML = "Heal Self";

    firstAttack_span.classList.remove("attack");			//removes the class that makes the buttons look inert
    secondAttack_span.classList.remove("attack");
    thirdAttack_span.classList.remove("attack");

    firstAttack_span.classList.add("attack-g");				//gives the attack the look that is specific to the Blue wizard
    secondAttack_span.classList.add("attack-g");
    thirdAttack_span.classList.add("attack-g");
  }
  if (choice === "e") {										//if you chose the evil character
    evilLabel_span.classList.add("chosen"); 				//Evil label looks different
    evilImage_span.classList.add("chosen-picture");         //Evil picture looks different
    
    firstAttack_span.innerHTML = "Whip";					//Renames the attack buttons
    secondAttack_span.innerHTML = "Mana Drain";
    thirdAttack_span.innerHTML = "Burn";

    firstAttack_span.classList.remove("attack");	 		//removes the class that makes the buttons look inert
    secondAttack_span.classList.remove("attack");
    thirdAttack_span.classList.remove("attack");

    firstAttack_span.classList.add("attack-e");				//gives the attack the look that is specific to the Red wizard
    secondAttack_span.classList.add("attack-e");
    thirdAttack_span.classList.add("attack-e");
  }
  actionMessage_div.innerHTML = "Choose your Attack!"; 		//The action message changes

  firstAttack_span.addEventListener("click", attack); 		//The attack buttons become active. The 'attack' here is not the HTML class but a function
  secondAttack_span.addEventListener("click", attack);
  thirdAttack_span.addEventListener("click", attack);
}
/*Adds effects to the respective wizard pictures if you move in or out of their labels*/
function imgGGrow(){
  goodImage_span.classList.add("image-hover");
  goodImage_span.classList.remove("image-left");
}
function imgEGrow(){
  evilImage_span.classList.add("image-hover");
  evilImage_span.classList.remove("image-left");
}
function imgGShrink(){
 goodImage_span.classList.add("image-left");
}
function imgEShrink(){
 evilImage_span.classList.add("image-left");
}
/*In these two functions you initiate the attack renaming rename function,  and remove the option to choose wizard.*/

function charCE() {													//You chose the evil character
  charChoice = "e";													//this let will show for functions later your chosen character
  goodLabel_span.removeEventListener("click", charCG, false);		//you can no longer choose the good character
  evilLabel_span.removeEventListener("click", charCE, false); 		//you can no longer choose the evil character
  
  rename(charChoice); 												//starts the rename function with your chosen character
}
function charCG() { 												//You chose the good character
  charChoice = "g"; 												//this let will show for functions later your chosen character
  goodLabel_span.removeEventListener("click", charCG, false); 		//you can no longer choose the good character
  evilLabel_span.removeEventListener("click", charCE, false); 		//you can no longer choose the evil character
  rename(charChoice); 												//starts the rename function with your chosen character
}

/*INFO PROMPT SECTION*/

/*Writes out the placeholder text when the mouse is not on an element with info.*/
function writeBlank() {
  tips_span.innerHTML = "For more info move your mouse onto an element."; //The default info prompt.
}

/*Writes out the info of the chosen element*/
function writeInfo() {		
  let chosenElement = this.getAttribute("id"); //this variable will be the same as the element's id in HTML
  switch (chosenElement) { //this will test the current variable to all id names that have their own prompts, if it matches writes it out
    case "restart":
      tips_span.innerHTML = "Clicking this button restarts the game.";
      break;
    case "match-counter":
      tips_span.innerHTML = "Number of already played matches.";
      break;
    case "health-good":
      tips_span.innerHTML = "Shows wizard Tim's remaining health";
      break;
    case "health-evil":
      tips_span.innerHTML = "Shows wizard Bob's remaining health";
      break;
    case "mana-good":
      tips_span.innerHTML = "Shows wizard Tim's remaining mana";
      break;
    case "mana-evil":
      tips_span.innerHTML = "Shows wizard Bob's remaining mana";
      break;
    case "xp-good":
      tips_span.innerHTML =
        "Shows wizard Tim's XP. If it reaches 10 Tim becomes stronger.";
      break;
    case "xp-evil":
      tips_span.innerHTML =
        "Shows wizard Bob's XP. If it reaches 10 Bob becomes stronger.";
      break;
    case "good-label":
      tips_span.innerHTML = "Tim's speciality is holy magic.";
      break;
    case "evil-label":
      tips_span.innerHTML = "Bob's specialty is fire magic.";
      break;
    case "wizard-tim":
      tips_span.innerHTML = "Tim's speciality is holy magic.";
      break;
    case "wizard-bob":
      tips_span.innerHTML = "Bob's specialty is fire magic.";
      break;
    case "attack1":
      switch (charChoice) { //the second switch is for deciding what character you chose earlier
        case "n":
          tips_span.innerHTML =
            "This will be your chosen wizard's first attack.";
          break;
        case "g":
          tips_span.innerHTML =
            "A vicious slash. It costs no mana, but it gives no XP either.";
          break;
        case "e":
          tips_span.innerHTML =
            "Bob attacks with a flaming whip. It costs no mana, but it gives no XP either.";
          break;
      }
      break;
    case "attack2":
      switch (charChoice) {
        case "n":
          tips_span.innerHTML =
            "This will be your chosen wizard's second attack.";
          break;
        case "g":
          tips_span.innerHTML =
            "Tim smites his opponent with holy magic. It costs 3 mana and inflicts a moderate damage.";
          break;
        case "e":
          tips_span.innerHTML =
            "Bob drains some of Tim's magic and with it recharges himself.";
          break;
      }
      break;
    case "attack3":
      switch (charChoice) {
        case "n":
          tips_span.innerHTML =
            "This will be your chosen wizard's third attack.";
          break;
        case "g":
          tips_span.innerHTML =
            "Tim heals himself. It costs a high amount of mana.";
          break;
        case "e":
          tips_span.innerHTML =
            "This attack sets your opponent on fire. It costs a lot of mana, but also causes high damage.";
          break;
      }
      break;
    case "attack4":
      switch (charChoice) {
        case "n":
          tips_span.innerHTML =
            "This will be your chosen wizard's fourth attack.";
          break;
        case "g":
          tips_span.innerHTML =
            "The teal wizard douses the battlefield with holy flames.";
          break;
        case "e":
          tips_span.innerHTML =
            "The purple wizard sets the whole battlefield on fire.";
          break;
      }
      break;
       case "g1":
          tips_span.innerHTML =
            "Tim won or achieved a draw in a match.";
          break;
          case "g2":
          tips_span.innerHTML =
            "Tim won or achieved a draw in two matches.";
          break;
          case "g3":
          tips_span.innerHTML =
            "Tim won or achieved a draw in three matches.";
          break;
          case "e1":
          tips_span.innerHTML =
            "Bob won or achieved a draw in a match.";
          break;
          case "e2":
          tips_span.innerHTML =
            "Bob won or achieved a draw in two matches.";
          break;
          case "e3":
          tips_span.innerHTML =
            "Bob won or achieved a draw in three matches.";
          break;
  }
}

/*Adds the info listeners to the DOM elements the listeners are writing out info if mouse enters the element. 
Or writing out the blank info if the mouse leaves the element*/

function addInfo() {
  goodLabel_span.addEventListener("mouseenter", writeInfo);			//info to player labels
  evilLabel_span.addEventListener("mouseenter", writeInfo);
  goodImage_span.addEventListener("mouseenter", writeInfo);
  evilImage_span.addEventListener("mouseenter", writeInfo);
  
  firstAttack_span.addEventListener("mouseenter", writeInfo);		//info to attack buttons
  secondAttack_span.addEventListener("mouseenter", writeInfo);
  thirdAttack_span.addEventListener("mouseenter", writeInfo);

  matchCounter_span.addEventListener("mouseenter", writeInfo);		//info to other elements
  restart_button.addEventListener("mouseenter", writeInfo);
  goodHP_span.addEventListener("mouseenter", writeInfo);
  evilHP_span.addEventListener("mouseenter", writeInfo);
  goodMana_span.addEventListener("mouseenter", writeInfo);
  evilMana_span.addEventListener("mouseenter", writeInfo);
  goodXP_span.addEventListener("mouseenter", writeInfo);
  evilXP_span.addEventListener("mouseenter", writeInfo);
  actionMessage_div.addEventListener("mouseenter", writeInfo);

  goodLabel_span.addEventListener("mouseout", writeBlank);			//info when leaving player labels
  evilLabel_span.addEventListener("mouseout", writeBlank);
  goodImage_span.addEventListener("mouseout", writeBlank);
  evilImage_span.addEventListener("mouseout", writeBlank);
  
  firstAttack_span.addEventListener("mouseout", writeBlank);		//info when leaving attack buttons
  secondAttack_span.addEventListener("mouseout", writeBlank);
  thirdAttack_span.addEventListener("mouseout", writeBlank);

  matchCounter_span.addEventListener("mouseout", writeBlank);		//info when leaving other elements
  restart_button.addEventListener("mouseout", writeBlank);
  goodHP_span.addEventListener("mouseout", writeBlank);
  evilHP_span.addEventListener("mouseout", writeBlank);
  goodMana_span.addEventListener("mouseout", writeBlank);
  evilMana_span.addEventListener("mouseout", writeBlank);
  goodXP_span.addEventListener("mouseout", writeBlank);
  evilXP_span.addEventListener("mouseout", writeBlank);
  actionMessage_div.addEventListener("mouseout", writeBlank);
}

/*MAIN*/

/* Program starts here. You can choose your wizard, that starts the carC* function then you can not choose a wizard anymore*/

function main() {
  restart_button.addEventListener("click", restart);		//adds an event if the player clicks the restart button

  goodLabel_span.addEventListener("click", charCG);			//adds an event if the player clicked the blue (good) wizard

  evilLabel_span.addEventListener("click", charCE);			//adds an event if the player clicked the red (evil) wizard
  
  goodLabel_span.addEventListener("mouseenter", imgGGrow);			//adds an event if the player clicked the blue (good) wizard

  evilLabel_span.addEventListener("mouseenter", imgEGrow);			//adds an event if the player clicked the red (evil) wizard
  
  goodLabel_span.addEventListener("mouseout", imgGShrink);			//adds an event if the player clicked the blue (good) wizard

  evilLabel_span.addEventListener("mouseout", imgEShrink);			//adds an event if the player clicked the red (evil) wizard
  
  addInfo(); 												//Starts the info prompts
}

/*GAME STARTS HERE*/
main(); //Starts the game
