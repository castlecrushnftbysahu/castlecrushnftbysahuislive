import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKIiFXwP7jBDgTriu4RWLwD3hSFCtsZbA",
  authDomain: "castlecrush-198e0.firebaseapp.com",
  databaseURL: "https://castlecrush-198e0-default-rtdb.firebaseio.com/",
  projectId: "castlecrush-198e0",
  storageBucket: "castlecrush-198e0.firebasestorage.app",
  messagingSenderId: "947034080950",
  appId: "1:947034080950:web:c4f41d9d91b40a14ae8817"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let items = [];
let wa = "917349908001";
let selectedItem = "";

const defaultItems = [
{name:"Ape Pirate",price:103,img:"ape_pirate.png"},
{name:"Archer's Tribe",price:103,img:"archers_tribe.png"},
{name:"Arrows",price:64,img:"arrows.png"},
{name:"Fortify",price:64,img:"fortify.png"},
{name:"Warrior",price:90,img:"warrior.png"},
{name:"Fan Dancer",price:90,img:"fan_dancer.png"},
{name:"Giant Growth",price:129,img:"giant_growth.png"},
{name:"Golem",price:103,img:"golem.png"},
{name:"Skeletons Swarm",price:77,img:"skeletons_swarm.png"},
{name:"Skeletons",price:51,img:"skeletons.png"},
{name:"Nature Heal",price:51,img:"nature_heal.png"},
{name:"Poison",price:51,img:"poison.png"},
{name:"Bomb",price:51,img:"bomb.png"},
{name:"Skeletons Legion",price:103,img:"skeletons_legion.png"},
{name:"Triplets",price:116,img:"triplets.png"},
{name:"Executioner",price:194,img:"executioner.png"},
{name:"Blizzard",price:116,img:"blizzard.png"},
{name:"Cannon Shot",price:129,img:"cannon_shot.png"},
{name:"Catapult",price:181,img:"catapult.png"},
{name:"Dryad",price:194,img:"dryad.png"},
{name:"Meteor",price:129,img:"meteor.png"},
{name:"Inferno",price:129,img:"inferno.png"},
{name:"Gust of Wind",price:116,img:"gust_of_wind.png"},
{name:"Ice Golem",price:194,img:"ice_golem.png"},
{name:"Rage",price:116,img:"rage.png"},
{name:"Magician",price:129,img:"magician.png"},
{name:"Mud Elemental",price:220,img:"mud_elemental.png"},
{name:"Orc Warrior",price:129,img:"orc_warrior.png"},
{name:"Orcs Horde",price:259,img:"orcs_horde.png"},
{name:"Stone Statue",price:129,img:"stone_statue.png"},
{name:"Spiked Statue",price:220,img:"spiked_statue.png"},
{name:"Siege Ballista",price:129,img:"siege_ballista.png"},
{name:"Lightning",price:194,img:"lightning.png"},
{name:"Hollow Knight",price:454,img:"hollow_knight.png"},
{name:"Shaman",price:454,img:"shaman.png"},
{name:"Archer Queen",price:454,img:"archer_queen.png"},
{name:"Angel",price:259,img:"angel.png"},
{name:"Demon",price:220,img:"demon.png"},
{name:"Fire Elemental",price:350,img:"fire_elemental.png"},
{name:"Genie Lamp",price:194,img:"genie_lamp.png"},
{name:"Mage",price:3379,img:"mage.png"},
{name:"Mana Ritual",price:259,img:"mana_ritual.png"},
{name:"Black Knight",price:259,img:"black_knight.png"},
{name:"Metamorph",price:259,img:"metamorph.png"},
{name:"Skull King",price:259,img:"skull_king.png"},
{name:"Spectre",price:454,img:"spectre.png"},
{name:"Reaper",price:194,img:"reaper.png"},
{name:"Resurrection",price:194,img:"resurrection.png"},
{name:"Shock",price:194,img:"shock.png"},
{name:"Standard Bearer",price:207,img:"standard_bearer.png"},
{name:"Unchained Demon",price:5200,img:"unchained_demon.png"},
{name:"Wraith",price:233,img:"wraith.png"},
{name:"Dragon",price:5200,img:"dragon.png"},
{name:"Storm Elemental",price:3314,img:"storm_elemental.png"},
{name:"Skull Queen",price:3379,img:"skull_queen.png"},
{name:"Phoenix",price:3639,img:"phoenix.png"},
{name:"Black Witch",price:3314,img:"black_witch.png"},
{name:"Necromancer",price:3314,img:"necromancer.png"}
];

/* ===== REALTIME LOAD ===== */
function loadData(){
onValue(ref(db), (snapshot) => {
if(snapshot.exists()){
items = snapshot.val().items || defaultItems;
wa = snapshot.val().wa || wa;
}else{
items = defaultItems;
set(ref(db),{items:defaultItems,wa:wa});
}
renderUser();
renderAdmin();
});
}

/* ===== USER PAGE ===== */
function renderUser(){
const box=document.getElementById("items");
if(!box) return;
box.innerHTML="";
items.forEach(i=>{
box.innerHTML+=`
<div class="card">
<img src="images/${i.img}">
<h4>${i.name}</h4>
<p>₹${i.price}</p>
<button onclick="buy('${i.name}')">Buy</button>
</div>`;
});
}

window.buy=n=>{
selectedItem=n;
document.getElementById("qrModal").style.display="block";
};

window.closeQR=()=>{
document.getElementById("qrModal").style.display="none";
};

window.sendProof=()=>{
window.open(`https://wa.me/${wa}?text=Payment%20done%20for%20${selectedItem}`);
};

window.downloadQR=()=>{
const a=document.createElement("a");
a.href="images/qr.png";
a.download="qr.png";
a.click();
};

/* ===== ADMIN PAGE ===== */
function renderAdmin(){
const box=document.getElementById("adminItems");
if(!box) return;

document.getElementById("waInput").value=wa;
box.innerHTML="";

items.forEach((i,idx)=>{
box.innerHTML+=`
<div class="admin-item">
<input value="${i.name}" onchange="items[${idx}].name=this.value">
<input type="number" value="${i.price}" onchange="items[${idx}].price=parseInt(this.value)">
</div>
`;
});

box.innerHTML+=`
<div style="margin-top:15px;">
<button onclick="saveItems()">Save All</button>
</div>
`;
}

window.saveItems=()=>{
set(ref(db,"items"),items);
alert("All Changes Saved");
};

window.saveWA=()=>{
wa=document.getElementById("waInput").value;
set(ref(db,"wa"),wa);
alert("WhatsApp Saved");
};

window.addNewCard=()=>{
const name=document.getElementById("newName").value;
const price=parseInt(document.getElementById("newPrice").value);
const img=document.getElementById("newImg").value;

if(!name||!price||!img){
alert("All fields required");
return;
}

items.push({name:name,price:price,img:img});
set(ref(db,"items"),items);

document.getElementById("newName").value="";
document.getElementById("newPrice").value="";
document.getElementById("newImg").value="";

alert("New Card Added");
};

loadData();
