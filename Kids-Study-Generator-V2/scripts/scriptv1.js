// ----------------------------
// 1. Definition der Bausteine
// ----------------------------
// Jeder Baustein hat einen Namen und ein oder zwei Icons.
const bausteine = [
  { name:"Wald & Tiere", icon:"🌲🐾" },
  { name:"Bauernhof", icon:"🌍" },
  { name:"Wüste", icon:"🌱" },
  { name:"Stadt", icon:"♻️" },
  { name:"Krankenhaus", icon:"🔧" },
  { name:"Feuerwehr & Polizei", icon:"🔧" },
  { name:"Rakete", icon:"🧩" },
  { name:"Rennsport", icon:"🎮" },
  { name:"Auto", icon:"🧩" },
  { name:"Flugzeug", icon:"🧩" },
  { name:"Ninja", icon:"💪" },
  { name:"Fussball", icon:"⚽💪" }
];

// ----------------------------
// 2. Definition der Spezialisierungen
// ----------------------------
// Jede Spezialisierung hat:
// - name: Name der Spezialisierung
// - cores: Liste von Bausteinen, die für diese Spezialisierung relevant sind
// - beschreibung: Textbeschreibung, was die Kinder dort lernen
// - stundenplan: Beispielstundenplan, zeigt den Ablauf
const spezialisierungen = [
  { name:"Natur", cores:["Wald & Tiere", "Bauernhof", "Wüste"], beschreibung:"Bau dir dein Bild von der Natur", stundenplan:["Farm","Tiere halten","Natur entdecken"] },
  { name:"City", cores:["Stadt", "Krankenhaus", "Feuerwehr & Polizei"], beschreibung:"Erstelle eine Stadt mit allem was dazu gehört", stundenplan:["Haus","Hochhaus","Sehenswertes"] },
  { name:"Action", cores:["Ninja", "Rennsport", "Fussball"], beschreibung:"Sport als Abenteuer, entwickel deine eigenen Sportarea", stundenplan:["Fit","Outdoor-Aktivitäten","Spiel"] },
  { name:"Technik", cores:["Auto", "Flugzeug", "Rakete"], beschreibung:"Tüfteln, bauen, technisch überlegen", stundenplan:["Robotik","Programmieren","Bauprojekte"] }
];

// ----------------------------
// 3. Variable für ausgewählte Bausteine
// ----------------------------
// Array, das alle vom Nutzer ausgewählten Bausteine speichert
let selectedBausteine = [];

// ----------------------------
// 4. Funktion: Schritt wechseln
// ----------------------------
// step = 1,2,3
function nextStep(step){
    // Alle Steps ausgeblenden
  document.querySelectorAll("#step1,#step2,#step3,#result").forEach(div => div.classList.add("hidden"));
    // Den gewünschten Step anzeigen
  document.getElementById("step"+step).classList.remove("hidden");
  // Wenn  Bausteinwahl kommt, die Bausteine rendern
  if(step===2) renderBausteine();
}

// ----------------------------
// 5. Funktion: Bausteine anzeigen
// ----------------------------
function renderBausteine(){
  const container = document.getElementById("bausteine");
  container.innerHTML = ""; // Alte Inhalte löschen

   // Für jeden Baustein eine Karte erstellen
  bausteine.forEach(b=>{
    const div = document.createElement("div");
    div.className="card";
    // Icon + Name in der Karte
    div.innerHTML=`<span style="font-size:24px">${b.icon}</span><span>${b.name}</span>`;

    // Klick-Event: Auswahl/Abwahl
    div.onclick=()=>{
      if(selectedBausteine.includes(b.name)){ // Wenn schon gewählt: abwählen
        selectedBausteine = selectedBausteine.filter(x=>x!==b.name);
        div.classList.remove("selected");
      } else if(selectedBausteine.length<2){ // Maximal 2 Bausteine wählbar
        selectedBausteine.push(b.name); 
        div.classList.add("selected");
      }
    };
    container.appendChild(div);
  });
}

// ----------------------------
// 6. Funktion: Spezialisierungen anzeigen
// ----------------------------
function showSpezialisierungen(){
// Mindestens ein Baustein muss gewählt sein
  if(selectedBausteine.length===0){ alert("Bitte wähle mindestens einen Baustein!"); return;}
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");

  const container = document.getElementById("spezialisierungen");
  container.innerHTML = "";

  const possible = spezialisierungen.filter(spec =>
    spec.cores.some(c => selectedBausteine.includes(c))
  );

  // Jede mögliche Spezialisierung als klickbare Karte darstellen
  possible.forEach(spec=>{
    const div = document.createElement("div");
    div.className="card";
    div.style.background = "#ffe680"; // Farbe für Spezialisierungen
    div.innerHTML=`<strong>${spec.name}</strong>`;

    // Hover Animation
    div.onmouseover = ()=>div.style.transform="scale(1.05)";
    div.onmouseout = ()=>div.style.transform="scale(1)";

    // Klick: Stundenplan anzeigen
    div.onclick=()=>showResult(spec);
    container.appendChild(div);
  });
}

// ----------------------------
// 7. Funktion: Ergebnis/Stundenplan anzeigen
// ----------------------------
function showResult(spec){
  const result = document.getElementById("result");
  result.classList.remove("hidden");

  // Kleine Pop-Animation beim Anzeigen
  result.style.transform="scale(0.8)";
  setTimeout(()=>result.style.transform="scale(1)",50);

  // Inhalte einfügen
  result.innerHTML=`
    <span style="color:#e0eeee;">
    <h2>${spec.name}</h2>
    <p>${spec.beschreibung}</p>
    <h3>Stundenplan:</h3>
    <ul>${spec.stundenplan.map(f=>`<li>${f}</li>`).join("")}</ul></span>
    <br><button class="reset" onclick="resetAll()">Neu starten</button>
  `;
}


// ----------------------------
// 8. Funktion: Alles zurücksetzen
// ----------------------------
function resetAll(){
  selectedBausteine = []; // Auswahl leeren
// Alle Steps ausblenden
  document.querySelectorAll("#step1,#step2,#step3,#result").forEach(div=>div.classList.add("hidden"));
// Zurück zum ersten Schritt
  document.getElementById("step1").classList.remove("hidden");
}



