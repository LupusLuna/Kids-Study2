// ----------------------------
// 1. Definition der Bausteine
// ----------------------------
const bausteine = [
  { name:"Wald & Tiere", icon:"🌲🐾", image:"../images/Wald&Tiere_01.jpg" },
  { name:"Bauernhof", icon:"🌍", image:"../images/Bauernhof_01.jpg" },
  { name:"Wüste", icon:"🌱", image:"../images/Wüste_02.jpg" },
  { name:"Stadt", icon:"♻️", image:"../images/Stadt_02.jpg" },
  { name:"Krankenhaus", icon:"🔧", image:"../images/Krankenhaus_01.jpg" },
  { name:"Feuerwehr & Polizei", icon:"🚒👮", image:"../images/Feuerwehr&Polizei_03.jpg" },
  { name:"Rakete", icon:"🚀", image:"../images/Rakete_01.jpg" },
  { name:"Rennsport", icon:"🏁", image:"../images/Rennsport_02.jpg" },
  { name:"Auto", icon:"🚗", image:"../images/Auto_01.jpg" },
  { name:"Flugzeug", icon:"✈️", image:"../images/Flugzeug_01.jpg" },
  { name:"Ninja", icon:"🥷", image:"../images/Ninja_01.jpg" },
  { name:"Fussball", icon:"⚽", image:"../images/Fußball_02.jpg" }
];

// ----------------------------
// 2. Definition der Spezialisierungen
// ----------------------------
const spezialisierungen = [
  { name:"Natur", image:"../images/Natur1.jpg", cores:["Wald & Tiere", "Bauernhof", "Wüste"], beschreibung:"Bau dir dein Bild von der Natur", stundenplan:["Farm","Tiere halten","Natur entdecken"] },
  { name:"City", image:"../images/City1.jpg", cores:["Stadt", "Krankenhaus", "Feuerwehr & Polizei"], beschreibung:"Erstelle eine Stadt mit allem was dazu gehört", stundenplan:["Haus","Hochhaus","Sehenswertes"] },
  { name:"Action", image:"../images/Action1.jpg", cores:["Ninja", "Rennsport", "Fussball"], beschreibung:"Sport als Abenteuer, entwickel deine eigenen Sportarea", stundenplan:["Fit","Outdoor-Aktivitäten","Spiel"] },
  { name:"Technik", image:"../images/Technik1.jpg", cores:["Auto", "Flugzeug", "Rakete"], beschreibung:"Tüfteln, bauen, technisch überlegen", stundenplan:["Robotik","Programmieren","Bauprojekte"] }
];

// ----------------------------
// 3. Auswahl-Variablen
// ----------------------------
let selectedDegree = null;
let selectedSpezialisierungen = [];
let selectedBausteine = [];

// ----------------------------
// 4. Step wechseln
// ----------------------------
function showStep(n){
  document.querySelectorAll("#step1,#step2,#step3,#step4,#result").forEach(div => div.classList.add("hidden"));
  const el = document.getElementById("step"+n);
  if(el) el.classList.remove("hidden");
}

// ----------------------------
// Step 1
// ----------------------------
function startSpecializationStep(degreeName){
  selectedDegree = degreeName || "Master der Bausteine";
  selectedSpezialisierungen = [];
  selectedBausteine = [];
  renderSpezialisierungen();
  showStep(2);
}

// ----------------------------
// Step 2: Spezialisierungen rendern
// ----------------------------
function renderSpezialisierungen() {
  const container = document.getElementById("spezialisierungen");
  container.innerHTML = "";

  spezialisierungen.forEach(spec => {
    const div = document.createElement("div");
    div.className = "spezialisierung-card";
    div.innerHTML = `
      <img src="${spec.image}" alt="${spec.name}">
      <p>${spec.name}</p>
    `;

    if (selectedSpezialisierungen.includes(spec.name)) div.classList.add("selected");

    div.onclick = () => {
      if (selectedSpezialisierungen.includes(spec.name)) {
        selectedSpezialisierungen = selectedSpezialisierungen.filter(s => s !== spec.name);
        div.classList.remove("selected");
        return;
      }
      if (selectedSpezialisierungen.length >= 2) {
        alert("Maximal 2 Spezialisierungen erlaubt.");
        return;
      }
      selectedSpezialisierungen.push(spec.name);
      div.classList.add("selected");
    };

    container.appendChild(div);
  });

  // Alte Button-Bar entfernen, falls vorhanden
  const oldBtnBar = document.querySelector("#step2 .button-bar");
  if (oldBtnBar) oldBtnBar.remove();

  // Neue Button-Bar
  const btnBar = document.createElement("div");
  btnBar.className = "button-bar";
  const btn = document.createElement("button");
  btn.textContent = "Weiter zu Bausteinen";
  btn.className = "primary";
  btn.onclick = () => toBausteineStep();
  btnBar.appendChild(btn);

  container.parentElement.appendChild(btnBar);
}

// ----------------------------
// Step 3: Bausteine rendern
// ----------------------------
function toBausteineStep(){
  if(selectedSpezialisierungen.length === 0){
    alert("Bitte wähle mindestens eine Spezialisierung.");
    return;
  }
  renderBausteineForSelectedSpecs();
  showStep(3);
}

function renderBausteineForSelectedSpecs(){
  const container = document.getElementById("bausteine");
  container.innerHTML = "";

  const allowedNames = new Set();
  spezialisierungen.forEach(spec => {
    if(selectedSpezialisierungen.includes(spec.name)){
      spec.cores.forEach(c => allowedNames.add(c));
    }
  });

  const filtered = bausteine.filter(b => allowedNames.has(b.name));

  filtered.forEach(b => {
    const div = document.createElement("div");
    div.className = "baustein-card";
    div.innerHTML = `
      <img src="${b.image}" alt="${b.name}">
      <p>${b.name}</p>
    `;

    if(selectedBausteine.includes(b.name)) div.classList.add("selected");

    div.onclick = () => {
      if(selectedBausteine.includes(b.name)){
        selectedBausteine = selectedBausteine.filter(x => x !== b.name);
        div.classList.remove("selected");
      } else {
        if(selectedBausteine.length >= 3){
          alert("Maximal 3 Bausteine erlaubt.");
          return;
        }
        selectedBausteine.push(b.name);
        div.classList.add("selected");
      }
    };

    container.appendChild(div);
  });

  // alte Button-Bar entfernen, falls vorhanden
  const oldBtnBar = document.querySelector("#step3 .button-bar");
  if(oldBtnBar) oldBtnBar.remove();

  // neue Button-Bar unter den Bildern
  let btnBar = document.createElement("div");
  btnBar.className = "button-bar";
  let btn = document.createElement("button");
  btn.textContent = "Zusammenfassung anzeigen";
  btn.className = "primary";
  btn.onclick = () => showSummary();
  btnBar.appendChild(btn);

  container.parentElement.appendChild(btnBar);
}


// ----------------------------
// Step 4: Zusammenfassung
// ----------------------------
function showSummary(){
  if(selectedBausteine.length === 0){
    alert("Bitte wähle mindestens einen Baustein.");
    return;
  }
  const summary = document.getElementById("summary");
  summary.innerHTML = `
  <span style="color:#e0eeee;">
    <div class="summary-box">
      <h3>Deine Auswahl</h3>
      <p><strong>Abschluss:</strong> ${selectedDegree}</p>
      <p><strong>Spezialisierungen:</strong> ${selectedSpezialisierungen.join(", ")}</p>
      <p><strong>Bausteine:</strong> ${selectedBausteine.join(", ")}</p>
    </div>
  </span>
  `;
  showStep(4);
}

  function showResult(){
  const result = document.getElementById("result");

  // === Module aufbauen ===
  const module = [];
  module.push({ name: "Grundlagen der Bausteine", start: true });

  selectedBausteine.forEach(bname => {
    module.push({ name: bname });
  });

  // === Farbpalette für individuelle Module ===
  const colors = [
    "#ff8a65", // orange
    "#4db6ac", // türkis
    "#ba68c8", // lila
    "#81c784", // grün
    "#f06292", // pink
    "#ffd54f"  // gelb
  ];

  // === Bildkarten der gewählten Bausteine ===
  const cardsHTML = selectedBausteine.map(name => {
    const item = bausteine.find(b => b.name === name);
    if (!item) return "";
    return `
      <div class="result-card">
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
      </div>
    `;
  }).join("");

  // === Modulplan mit Farben, max 3 pro Zeile ===
const modulHTML = `
  <div class="modulplan-wrapper">
    <div class="modulplan">
      <h3>Modulplan</h3>
      <div class="modul start" data-number="Modul 1">Grundlagen der Bausteine</div>
      <div class="modul-liste">
        ${module.slice(1).map((m, i) => `
          <div class="modul"
               data-number="Modul ${i + 2}"
               data-color="${(i % 6) + 1}">
            ${m.name}
          </div>
        `).join("")}
      </div>
    </div>
  </div>
`;

  // === Alles zusammenbauen ===
  result.innerHTML = `
    <h2>${selectedDegree}</h2>
    <h3>Spezialisierungen</h3>
    <p>Deine Spezialisierung: ${selectedSpezialisierungen.join( " und  ")}</p>
    <h3>Die gewählten Module sind:</h3>
    <div class="result-grid">
      ${cardsHTML}
    </div>
    ${modulHTML}
    <button class="reset" onclick="resetAll()">Neu starten</button>
  `;

  // Schrittwechsel
  document.querySelectorAll("#step1,#step2,#step3,#step4").forEach(div => div.classList.add("hidden"));
  result.classList.remove("hidden");
}


// ----------------------------
// Reset
// ----------------------------
function resetAll(){
  selectedDegree = null;
  selectedSpezialisierungen = [];
  selectedBausteine = [];

  // Steps zurücksetzen
  showStep(1);

  // Container leeren
  document.getElementById("spezialisierungen").innerHTML = "";
  document.getElementById("bausteine").innerHTML = "";
  document.getElementById("summary").innerHTML = "";
  document.getElementById("result").innerHTML = "";

  // Button-Bars entfernen
  const bars = document.querySelectorAll(".button-bar");
  bars.forEach(bar => bar.remove());
}
