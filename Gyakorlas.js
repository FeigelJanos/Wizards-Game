let joGyozott = 0;
let varazslok = { gandalfTheGrey: { hp: 10, hpMax: 10, mp: 17, mpMax: 17, xp:0, exist: "true"
},
gandalfTheWhite: {hp: 0, hpMax: 20,  mp: 0, mpMax: 34, xp:0, exist: "false"
},
balrogOfMoria: {hp: 17, hpMax: 17, mp: 10, mpMax: 10, xp:0, exist: "true"
},
greatBalrogOfMoria: {hp: 0, hpMax: 34, mp: 0, mpMax: 20, xp:0, exist: "false"
}
};

let varazslatok = { slash:           { damage: 1,   mpCost: 0,  effect:"",        caster:"g"}, 
                    smite:           { damage: 4,   mpCost: 3,  effect:"",        caster:"g" }, 
                    heal:            { damage: 0,   mpCost:3 ,  effect:"heal4",   caster:"g" },
                    flameOfAnor:      { damage: 20,  mpCost: 15, effect:"blind1",  caster:"gg" }, 
                    flameWhip:       { damage: 1,   mpCost: 0,  effect:"",        caster:"b" }, 
                    burningBlade:    { damage: 3,   mpCost: 2,  effect:"",        caster:"b" },
                    manaDrain:       { damage: 0,   mpCost: 3,  effect:"drain2",  caster:"b" }, 
                    shadowOfMorgoth: { damage: 17,  mpCost: 11, effect:"blind1",  caster:"bb" }
};
for (i=0; i < 10; i++){
  
 let attacker = Math.floor(Math.random() * 10);
  if (attacker <= 2)
  {
    if(varazslok.gandalfTheGrey.exist == "true") {
    }
    else {
    }
  }
  else {
     if(varazslok.balrogOfMoria.exist == "true") {
    }
    else {
    }
  }
}


document.write("Hello World");
