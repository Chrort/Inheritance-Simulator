const start = document.getElementById("btn");
const invalid = document.getElementById("invalid");
const count = document.getElementById("count");
const generations = document.getElementById("gen");
const affected = document.getElementById("affected");
const fertility = document.getElementById("fertility");
const rec = document.getElementById("rec");
const dom = document.getElementById("dom");
const main = document.getElementsByTagName("main");

start.onclick = function(){
    if(count.value == "" || generations.value == "" || affected.value == "" || fertility.value == "" || rec.checked != true && dom.checked != true){
        invalid.innerHTML = "Invalid input";
        setTimeout(() => {
            invalid.innerHTML = "";
        }, 1000);
    }else{
        simulate();
    }
}

function simulate(){
    let persons = [];

    for(var i = 0; i < count.value; i++){
        let c1, c2, aff;


        if(i < Math.round(count.value * (affected.value / 100))){
            if(rec.checked == true){
                c1 = "a";
                c2 = "a";
            }else if(dom.checked == true){
                let c0 = Aa();
                c1 = c0.c1;
                c2 = c0.c2;
            }
            aff = true;
        }else{
            if(rec.checked == true){
                let c0 = Aa();
                c1 = c0.c1;
                c2 = c0.c2;
            }else if(dom.checked == true){
                c1 = "a";
                c2 = "a";
            }
            aff = false;
        }
        persons.push({id: i + 1, affected: aff, c1: c1, c2: c2});
    }

    for(var j = 0; j < generations.value; j++){
        let gen1 = persons.slice(0, Math.floor(persons.length) / 2);
        let gen2 = persons.slice(Math.floor(persons.length) / 2, persons.length);
        let totalAffected = 0;

        persons = [];

        let label = document.createElement("tr");
        label.id = `label${j}`;
        document.getElementById("results").appendChild(label);

        for(var k = 0; k < gen1.length; k++){
            let p1 = gen1.splice(Math.floor(Math.random() * gen1.length), 1);
            let p2 = gen2.splice(Math.floor(Math.random() * gen2.length), 1);

            for(var l = 0; l < fertility.value * 2; l++){
                let inheritedc1, inheritedc2, newAffected, newC1, newC2;

                let randomC = Math.floor(Math.random() * 4);
                switch(randomC){
                    case 0:
                        inheritedc1 = p1[0].c1;
                        inheritedc2 = p2[0].c1;
                        break;
                    case 1:
                        inheritedc1 = p1[0].c1;
                        inheritedc2 = p2[0].c2;
                        break;
                    case 2:
                        inheritedc1 = p1[0].c2;
                        inheritedc2 = p2[0].c1;
                        break;
                    case 3:
                        inheritedc1 = p1[0].c2;
                        inheritedc2 = p2[0].c2;
                }

                if(rec.checked == true){
                    if(inheritedc1 == "a" && inheritedc2 == "a"){
                        newC1 = "a";
                        newC2 = "a";
                        newAffected = true;
                    }else if(inheritedc1 == "a" && inheritedc2 == "A" || inheritedc1 == "A" && inheritedc2 == "a"){
                        let c0 = AaaA();
                        newC1 = c0.c1;
                        newC2 = c0.c2;
                        let isAffected = affRec(c0.c1, c0.c2);
                        newAffected = isAffected;
                    }else if(inheritedc1 == "A" && inheritedc2 == "A"){
                        newC1 = "A";
                        newC2 = "A";
                        newAffected = false;
                    }
                }else if(dom.checked == true){
                    if(inheritedc1 == "a" && inheritedc2 == "a"){
                        newC1 = "a";
                        newC2 = "a";
                        newAffected = false;
                    }else if(inheritedc1 == "a" && inheritedc2 == "A" || inheritedc1 == "A" && inheritedc2 == "a"){
                        let c0 = AaaA();
                        newC1 = c0.c1;
                        newC2 = c0.c1;
                        let isAffected = affDom(c0.c1, c0.c1);
                        newAffected = isAffected;
                    }else if(inheritedc1 == "A" && inheritedc2 == "A"){
                        newC1 = "A";
                        newC2 = "A";
                        newAffected = true;
                    }
                }
                let newPerson = {id: `id${j}_${k}_${l}`, affected: newAffected, c1: newC1, c2: newC2};
                persons.push(newPerson);

                if(newAffected == true){
                    totalAffected += 1;
                }
            }
        }
        let genLabel = document.createElement("th");
        genLabel.innerHTML = j + 1;
        document.getElementById(`label${j}`).appendChild(genLabel);

        let popLabel = document.createElement("th");
        popLabel.innerHTML = persons.length;
        document.getElementById(`label${j}`).appendChild(popLabel);

        let affLabel = document.createElement("th");
        affLabel.innerHTML = totalAffected;
        document.getElementById(`label${j}`).appendChild(affLabel);

        let affPercentageLabel = document.createElement("th");
        affPercentageLabel.innerHTML = Math.round(((totalAffected / persons.length) * 100) * 100) / 100
        document.getElementById(`label${j}`).appendChild(affPercentageLabel);
    }
}

function Aa(){
    c1 = "A";
    c2 = (() => {
            let rnd2 = Math.floor(Math.random() * 2);
            switch(rnd2){
                case 0:
                    return "A";
                case 1:
                    return "a";
            }
        })();
    return {c1: c1, c2: c2}
}

function AaaA(){
    c1 = (() => {
        let rnd2 = Math.floor(Math.random() * 2);
    
        switch(rnd2){
            case 0:
                return "A";
            case 1:
                return "a";
        }
    })();
    c2 = (() => {
        let rnd2 = Math.floor(Math.random() * 2);
    
        switch(rnd2){
            case 0:
                return "A";
            case 1:
                return "a";
        }
    })();
return {c1: c1, c2: c2}
}

function affRec(c1, c2){
    if(c1 == "a" && c2 == "a"){
        return true;
    }else{
        return false;
    }
}

function affDom(c1, c2){
    if(c1 == "a" && c2 == "a"){
        return false;
    }else{
        return true;
    }
}
