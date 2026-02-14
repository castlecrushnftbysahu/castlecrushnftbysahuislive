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

/* ===== FULL 60+ CARDS ===== */
const defaultItems = [
{name:"Ape Pirate",price:79,img:"ape_pirate.png"},
{name:"Archer's Tribe",price:79,img:"archers_tribe.png"},
{name:"Arrows",price:49,img:"arrows.png"},
{name:"Fortify",price:49,img:"fortify.png"},
{name:"Warrior",price:69,img:"warrior.png"},
{name:"Fan Dancer",price:69,img:"fan_dancer.png"},
{name:"Giant Growth",price:69,img:"giant_growth.png"},
{name:"Golem",price:79,img:"golem.png"},
{name:"Skeletons Swarm",price:59,img:"skeletons_swarm.png"},
{name:"Skeletons",price:39,img:"skeletons.png"},
{name:"Nature Heal",price:39,img:"nature_heal.png"},
{name:"Poison",price:39,img:"poison.png"},
{name:"Bomb",price:39,img:"bomb.png"},
{name:"Skeletons Legion",price:79,img:"skeletons_legion.png"},
{name:"Triplets",price:89,img:"triplets.png"},
{name:"Executioner",price:149,img:"executioner.png"},
{name:"Blizzard",price:89,img:"blizzard.png"},
{name:"Cannon Shot",price:69,img:"cannon_shot.png"},
{name:"Catapult",price:99,img:"catapult.png"},
{name:"Dryad",price:129,img:"dryad.png"},
{name:"Meteor",price:89,img:"meteor.png"},
{name:"Inferno",price:89,img:"inferno.png"},
{name:"Gust of Wind",price:79,img:"gust_of_wind.png"},
{name:"Ice Golem",price:129,img:"ice_golem.png"},
{name:"Rage",price:79,img:"rage.png"},
{name:"Magician",price:89,img:"magician.png"},
{name:"Mud Elemental",price:139,img:"mud_elemental.png"},
{name:"Orc Warrior",price:99,img:"orc_warrior.png"},
{name:"Orcs Horde",price:169,img:"orcs_horde.png"},
{name:"Stone Statue",price:99,img:"stone_statue.png"},
{name:"Spiked Statue",price:169,img:"spiked_statue.png"},
{name:"Siege Ballista",price:89,img:"siege_ballista.png"},
{name:"Lightning",price:109,img:"lightning.png"},
{name:"Hollow Knight",price:349,img:"hollow_knight.png"},
{name:"Shaman",price:349,img:"shaman.png"},
{name:"Archer Queen",price:299,img:"archer_queen.png"},
{name:"Angel",price:189,img:"angel.png"},
{name:"Demon",price:149,img:"demon.png"},
{name:"Fire Elemental",price:249,img:"fire_elemental.png"},
{name:"Genie Lamp",price:139,img:"genie_lamp.png"},
{name:"Mage",price:2500,img:"mage.png"},
{name:"Mana Ritual",price:189,img:"mana_ritual.png"},
{name:"Black Knight",price:199,img:"black_knight.png"},
{name:"Metamorph",price:199,img:"metamorph.png"},
{name:"Skull King",price:199,img:"skull_king.png"},
{name:"Spectre",price:349,img:"spectre.png"},
{name:"Reaper",price:149,img:"reaper.png"},
{name:"Resurrection",price:149,img:"resurrection.png"},
{name:"Shock",price:149,img:"shock.png"},
{name:"Standard Bearer",price:119,img:"standard_bearer.png"},
{name:"Unchained Demon",price:129,img:"unchained_demon.png"},
{name:"Wraith",price:119,img:"wraith.png"},
{name:"Dragon",price:3500,img:"dragon.png"},
{name:"Storm Elemental",price:1549,img:"storm_elemental.png"},
{name:"Skull Queen",price:1549,img:"skull_queen.png"},
{name:"Phoenix",price:2799,img:"phoenix.png"},
{name:"Black Witch",price:2549,img:"black_witch.png"},
{name:"Necromancer",price:1549,img:"necromancer.png"}
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
