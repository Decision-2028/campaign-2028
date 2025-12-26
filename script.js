/* --- CONFIGURATION --- */
const PARTIES = {
    D: { name: "Democratic", color: "#00AEF3", img: "images/harrison.jpg", desc: "Liberal platform." },
    R: { name: "Republican", color: "#E81B23", img: "images/whatley.jpg", desc: "Conservative platform." },
    I: { name: "Independent", color: "#F2C75C", img: "images/scenario.jpg", desc: "Centrist coalition." },
    G: { name: "Green", color: "#198754", img: "images/scenario.jpg", desc: "Eco-Socialist." },
    L: { name: "Libertarian", color: "#fd7e14", img: "images/scenario.jpg", desc: "Individual liberty." }
};

const ISSUES = [
    { id: 'econ', name: 'Economy' }, { id: 'jobs', name: 'Jobs' },
    { id: 'tax', name: 'Tax Policy' }, { id: 'health', name: 'Healthcare' },
    { id: 'immig', name: 'Immigration' }, { id: 'clim', name: 'Climate' },
    { id: 'gun', name: 'Gun Control' }, { id: 'abort', name: 'Abortion' },
    { id: 'foreign', name: 'Foreign Pol.' }, { id: 'crime', name: 'Crime' }
];

const INTEREST_GROUPS = [
    { id: 'aa', name: 'African American' }, { id: 'his', name: 'Hispanic/Latino' },
    { id: 'union', name: 'Union Workers' }, { id: 'evang', name: 'Evangelicals' },
    { id: 'youth', name: 'Youth (<30)' }, { id: 'senior', name: 'Seniors (65+)' },
    { id: 'rural', name: 'Rural Voters' }
];

const CANDIDATES = [
    { id: "harris", name: "Kamala Harris", party: "D", funds: 60, img: "images/harris.jpg", buff: "Incumbent Advantage", desc: "Current VP.", stamina: 8 },
    { id: "newsom", name: "Gavin Newsom", party: "D", funds: 75, img: "images/newsom.jpg", buff: "Fundraising Machine", desc: "CA Governor.", stamina: 9 },
    { id: "whitmer", name: "Gretchen Whitmer", party: "D", funds: 55, img: "images/whitmer.jpg", buff: "Rust Belt Appeal", desc: "MI Governor.", stamina: 8 },
    { id: "desantis", name: "Ron DeSantis", party: "R", funds: 65, img: "images/desantis.jpg", buff: "Culture Warrior", desc: "FL Governor.", stamina: 9 },
    { id: "vance", name: "JD Vance", party: "R", funds: 50, img: "images/vance.jpg", buff: "Populist Appeal", desc: "OH Senator.", stamina: 8 },
    { id: "ramaswamy", name: "Vivek Ramaswamy", party: "R", funds: 70, img: "images/ramaswamy.jpg", buff: "Outsider Energy", desc: "Tech Entrepreneur.", stamina: 10 },
    { id: "yang", name: "Andrew Yang", party: "I", funds: 40, img: "images/yang.jpg", buff: "Tech Innovator", desc: "Forward Party.", stamina: 8 },
    { id: "stein", name: "Jill Stein", party: "G", funds: 10, img: "images/scenario.jpg", buff: "Eco-Activist", desc: "Green Party.", stamina: 6 },
    { id: "oliver", name: "Chase Oliver", party: "L", funds: 12, img: "images/scenario.jpg", buff: "Liberty First", desc: "Libertarian.", stamina: 7 }
];

const VPS = [
    { id: "shapiro", name: "Josh Shapiro", party: "D", state: "PA", desc: "Popular swing state governor.", img: "images/shapiro.jpg" },
    { id: "kelly", name: "Mark Kelly", party: "D", state: "AZ", desc: "Astronaut & Senator.", img: "images/scenario.jpg" },
    { id: "rubio", name: "Marco Rubio", party: "R", state: "FL", desc: "Establishment bridge.", img: "images/scenario.jpg" },
    { id: "stefanik", name: "Elise Stefanik", party: "R", state: "NY", desc: "Strong aggressive campaigner.", img: "images/scenario.jpg" }
];

// STATE DATA with Blurbs & Flag logic will be handled dynamically
const INIT_STATES = {
    "AL": { name: "Alabama", ev: 9, blurb: "Deep red state with strong evangelical base." },
    "AK": { name: "Alaska", ev: 3, blurb: "Libertarian streak, often leans Republican." },
    "AZ": { name: "Arizona", ev: 11, blurb: "Crucial swing state with growing Latino vote." },
    "AR": { name: "Arkansas", ev: 6, blurb: "Solid Republican stronghold." },
    "CA": { name: "California", ev: 54, blurb: "Democrat fortress and fundraising powerhouse." },
    "CO": { name: "Colorado", ev: 10, blurb: "Trending blue, highly educated populace." },
    "CT": { name: "Connecticut", ev: 7, blurb: "Reliable blue state in New England." },
    "DE": { name: "Delaware", ev: 3, blurb: "Small blue state, corporate hub." },
    "DC": { name: "D.C.", ev: 3, blurb: "Overwhelmingly Democratic urban center." },
    "FL": { name: "Florida", ev: 30, blurb: "Former swing state, now leaning red." },
    "GA": { name: "Georgia", ev: 16, blurb: "New battleground, high African American turnout key." },
    "HI": { name: "Hawaii", ev: 4, blurb: "Solid blue island chain." },
    "ID": { name: "Idaho", ev: 4, blurb: "Deep red, rural and conservative." },
    "IL": { name: "Illinois", ev: 19, blurb: "Blue anchor of the Midwest." },
    "IN": { name: "Indiana", ev: 11, blurb: "Conservative manufacturing hub." },
    "IA": { name: "Iowa", ev: 6, blurb: "Trending red agrarian state." },
    "KS": { name: "Kansas", ev: 6, blurb: "Republican, but suburbs drifting blue." },
    "KY": { name: "Kentucky", ev: 8, blurb: "Solid Republican, coal country." },
    "LA": { name: "Louisiana", ev: 8, blurb: "Conservative southern state." },
    "ME": { name: "Maine", ev: 4, blurb: "Independent streak, split electoral votes." },
    "MD": { name: "Maryland", ev: 10, blurb: "Reliably blue, diverse electorate." },
    "MA": { name: "Massachusetts", ev: 11, blurb: "Liberal bastion." },
    "MI": { name: "Michigan", ev: 15, blurb: "Key 'Blue Wall' swing state." },
    "MN": { name: "Minnesota", ev: 10, blurb: "Leans blue, but competitive rural areas." },
    "MS": { name: "Mississippi", ev: 6, blurb: "Socially conservative, polarized voting." },
    "MO": { name: "Missouri", ev: 10, blurb: "Bellwether turned solid red." },
    "MT": { name: "Montana", ev: 4, blurb: "Populist conservative with libertarian streak." },
    "NE": { name: "Nebraska", ev: 5, blurb: "Red state with a competitive congressional district." },
    "NV": { name: "Nevada", ev: 6, blurb: "Diverse swing state, service economy." },
    "NH": { name: "New Hampshire", ev: 4, blurb: "Swing state with libertarian tendencies." },
    "NJ": { name: "New Jersey", ev: 14, blurb: "Blue state with competitive suburbs." },
    "NM": { name: "New Mexico", ev: 5, blurb: "Leans blue, heavy Hispanic population." },
    "NY": { name: "New York", ev: 28, blurb: "Democratic stronghold." },
    "NC": { name: "North Carolina", ev: 16, blurb: "Perennial swing state, urban vs rural divide." },
    "ND": { name: "North Dakota", ev: 3, blurb: "Deep red energy state." },
    "OH": { name: "Ohio", ev: 17, blurb: "Trending red, manufacturing base." },
    "OK": { name: "Oklahoma", ev: 7, blurb: "One of the reddest states." },
    "OR": { name: "Oregon", ev: 8, blurb: "Progressive coast, conservative interior." },
    "PA": { name: "Pennsylvania", ev: 19, blurb: "The ultimate swing state." },
    "RI": { name: "Rhode Island", ev: 4, blurb: "Small, reliable blue state." },
    "SC": { name: "South Carolina", ev: 9, blurb: "Solid Republican South." },
    "SD": { name: "South Dakota", ev: 3, blurb: "Reliably Republican." },
    "TN": { name: "Tennessee", ev: 11, blurb: "Conservative stronghold." },
    "TX": { name: "Texas", ev: 40, blurb: "Huge prize, trending purple but still red." },
    "UT": { name: "Utah", ev: 6, blurb: "Conservative but distinct Mormon demographic." },
    "VT": { name: "Vermont", ev: 3, blurb: "Deep blue, home of Sanders." },
    "VA": { name: "Virginia", ev: 13, blurb: "Trending blue due to DC suburbs." },
    "WA": { name: "Washington", ev: 12, blurb: "Reliably Democratic." },
    "WV": { name: "West Virginia", ev: 4, blurb: "Deep red, coal country." },
    "WI": { name: "Wisconsin", ev: 10, blurb: "Toss-up state, highly polarized." },
    "WY": { name: "Wyoming", ev: 3, blurb: "The most Republican state." }
};

class County {
    constructor(id, name, stateEv) {
        this.id = id;
        this.name = name || id;
        // Procedural Gen for data (since we don't have a DB yet)
        this.type = Math.random() > 0.8 ? 'Urban' : (Math.random() > 0.5 ? 'Suburb' : 'Rural');
        
        let basePop = (stateEv * 50000); 
        this.population = this.type === 'Urban' ? basePop * 2 : basePop * 0.2;
        
        // Lean based on Type
        let dLean = this.type === 'Urban' ? 70 : (this.type === 'Suburb' ? 50 : 30);
        dLean += (Math.random()*20 - 10); // Variance
        
        this.pcts = { D: dLean, R: 100-dLean, G:0, L:0 };
        this.enthusiasm = { D: 1.0, R: 1.0 };
        
        // Demographics
        this.demographics = {};
        INTEREST_GROUPS.forEach(ig => this.demographics[ig.id] = Math.floor(Math.random()*20));
    }
}

/* --- APP ENGINE --- */
const app = {
    data: {
        currentDate: new Date("2028-07-04"), electionDay: new Date("2028-11-07"),
        selectedParty: null, candidate: null, vp: null, opponent: null, opponentVP: null,
        funds: 0, energy: 8, maxEnergy: 8, thirdPartiesEnabled: true,
        states: {}, selectedState: null, activeCountyState: null,
        mapMode: 'political'
    },

    init: function() {
        this.data.states = JSON.parse(JSON.stringify(INIT_STATES));
        // Init State Data
        for(let s in this.data.states) {
            let st = this.data.states[s];
            st.moe = (Math.random()*2 + 1.5).toFixed(1);
            st.pcts = { D: 48, R: 48, G: 2, L: 2 }; // Base placeholders until counties load
            st.priorities = {};
            ISSUES.forEach(i => st.priorities[i.id] = Math.floor(Math.random()*10)+1);
            st.demographics = {};
            INTEREST_GROUPS.forEach(ig => st.demographics[ig.id] = Math.floor(Math.random()*30)+5);
            st.counties = {}; // Will hold County objects once loaded
            st.flagUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_${st.name.replace(/ /g,"_")}.svg/1200px-Flag_of_${st.name.replace(/ /g,"_")}.svg.png`;
            // Note: DC flag url might need special case, simple replace mostly works for Wiki
        }
        this.renderParties();
        this.initIssues();
    },

    goToScreen: function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    /* --- SETUP FUNCTIONS (Same as before) --- */
    renderParties: function() {
        const c = document.getElementById('party-cards'); c.innerHTML = "";
        ['D','R','I'].forEach(k => {
            const p = PARTIES[k];
            c.innerHTML += `<div class="card card-party" onclick="app.selParty('${k}')" style="background-image:url('${p.img}'); border-top:5px solid ${p.color}"><div class="party-overlay"><h3>${p.name} Party</h3><div class="party-desc">${p.desc}</div></div></div>`;
        });
    },
    selParty: function(k) { this.data.selectedParty = k; this.renderCands(k); this.goToScreen('candidate-screen'); },
    renderCands: function(pk) {
        const c = document.getElementById('candidate-cards'); c.innerHTML = "";
        CANDIDATES.filter(x => x.party === pk).forEach(cand => {
            c.innerHTML += `<div class="card" onclick="app.selCand('${cand.id}')"><div class="portrait"><img src="${cand.img}"></div><div class="card-info"><h3>${cand.name}</h3><p>${cand.desc}</p></div></div>`;
        });
    },
    selCand: function(id) {
        this.data.candidate = CANDIDATES.find(x => x.id === id);
        this.data.maxEnergy = this.data.candidate.stamina; this.data.energy = this.data.maxEnergy;
        this.renderVPs(this.data.candidate.party); this.goToScreen('vp-screen');
    },
    renderVPs: function(pk) {
        const c = document.getElementById('vp-cards'); c.innerHTML = "";
        const vps = VPS.filter(x => x.party === pk);
        if(vps.length === 0) { c.innerHTML = `<div class="card" onclick="app.renderOpp()"><div class="card-info"><h3>SKIP VP</h3></div></div>`; return; }
        vps.forEach(v => {
            c.innerHTML += `<div class="card" onclick="app.selVP('${v.id}')"><div class="portrait"><img src="${v.img}"></div><div class="card-info"><h3>${v.name}</h3></div></div>`;
        });
    },
    selVP: function(id) { this.data.vp = VPS.find(x => x.id === id); this.renderOpp(); },
    renderOpp: function() {
        const maj = document.getElementById('opponent-cards-major');
        const min = document.getElementById('opponent-cards-minor');
        maj.innerHTML = ""; min.innerHTML = "";
        let rivalP = (this.data.selectedParty === 'D') ? 'R' : 'D';
        if(this.data.selectedParty === 'I') rivalP = 'D';
        CANDIDATES.filter(x => x.party === rivalP).forEach(opp => {
            maj.innerHTML += `<div class="card" onclick="app.selOpp('${opp.id}')"><div class="portrait"><img src="${opp.img}"></div><div class="card-info"><h3>${opp.name}</h3></div></div>`;
        });
        CANDIDATES.filter(x => ['G','L'].includes(x.party)).forEach(opp => {
            min.innerHTML += `<div class="card" style="transform:scale(0.9); border-top:3px solid ${PARTIES[opp.party].color}"><div class="card-info"><h3>${opp.name}</h3></div></div>`;
        });
        this.goToScreen('opponent-screen');
    },
    selOpp: function(id) { this.data.opponent = CANDIDATES.find(x => x.id === id); this.renderOppVP(); },
    renderOppVP: function() {
        const maj = document.getElementById('opponent-cards-major'); maj.innerHTML = "";
        document.getElementById('opp-section-title').innerText = "OPPONENT VP";
        const vps = VPS.filter(x => x.party === this.data.opponent.party);
        if(vps.length === 0) { this.startGame(); return; }
        vps.forEach(v => {
            maj.innerHTML += `<div class="card" onclick="app.selOppVP('${v.id}')"><div class="portrait"><img src="${v.img}"></div><div class="card-info"><h3>${v.name}</h3></div></div>`;
        });
    },
    selOppVP: function(id) { this.data.opponentVP = VPS.find(x => x.id === id); this.startGame(); },
    toggleThirdParties: function() { this.data.thirdPartiesEnabled = document.getElementById('third-party-toggle').checked; },

    /* --- GAME START --- */
    startGame: function() {
        this.data.funds = this.data.candidate.funds;
        this.goToScreen('game-screen');
        const img = document.getElementById('hud-img');
        if(this.data.candidate.img) { img.src = this.data.candidate.img; img.style.display = "block"; }
        img.className = `hud-border-${this.data.selectedParty}`;
        document.getElementById('hud-cand-name').innerText = this.data.candidate.name.toUpperCase();
        document.getElementById('hud-party-name').innerText = PARTIES[this.data.selectedParty].name.toUpperCase();
        
        this.initMap();
        this.updateHUD();
    },

    /* --- COUNTY MAP SYSTEM --- */
    enterStateView: function() {
        const s = this.data.states[this.data.selectedState];
        if(!s) return;
        this.data.activeCountyState = s;
        
        // 1. Populate Modal Header
        document.getElementById('cv-title').innerText = s.name.toUpperCase();
        document.getElementById('cv-desc').innerText = s.blurb;
        document.getElementById('cv-flag').src = s.flagUrl;
        
        // 2. Load SVG
        const container = document.getElementById('county-map-container');
        container.innerHTML = `<p style="color:#aaa;">Loading Map for ${s.name}...</p>`;
        document.getElementById('county-modal').classList.remove('hidden');
        
        // FETCH EXTERNAL SVG
        // In a real environment, this fetches "counties/CA.svg".
        // For this demo, I will simulate it by injecting a generic SVG if fetch fails or just using fetch structure.
        fetch(`counties/${this.data.selectedState}.svg`)
            .then(response => {
                if(!response.ok) throw new Error("Map not found");
                return response.text();
            })
            .then(svgData => {
                container.innerHTML = svgData;
                this.parseCountySVG(container.querySelector('svg'), s);
            })
            .catch(err => {
                console.warn(err);
                // Fallback for demo: Create a placeholder SVG grid
                this.generateFallbackMap(container, s);
            });
    },

    closeCountyView: function() {
        document.getElementById('county-modal').classList.add('hidden');
        this.data.activeCountyState = null;
        // Refresh National Map in case county changes affected state total
        this.colorMap();
    },

    // When a real SVG is loaded
    parseCountySVG: function(svgEl, stateObj) {
        if(!svgEl) return;
        svgEl.style.width = "100%"; svgEl.style.height = "100%";
        
        let paths = svgEl.querySelectorAll('path');
        paths.forEach(p => {
            let id = p.id || p.getAttribute('name') || "C_" + Math.random().toString(36).substr(2,5);
            // Ensure Data Object Exists
            if(!stateObj.counties[id]) {
                stateObj.counties[id] = new County(id, p.getAttribute('title') || id, stateObj.ev);
            }
            
            // Interaction
            p.onclick = () => this.clickCounty(id);
            p.onmousemove = (e) => this.showCountyTooltip(e, id);
            p.onmouseleave = () => document.getElementById('county-tooltip').classList.add('hidden');
            
            // Color
            this.colorCountyPath(p, stateObj.counties[id]);
        });
    },

    // Fallback if user hasn't uploaded "counties/CA.svg" yet
    generateFallbackMap: function(container, stateObj) {
        container.innerHTML = "";
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 400 300");
        svg.style.width="80%"; svg.style.height="80%";
        
        // Generate hex grid as placeholder counties
        let cols = 5; let rows = 4;
        let w = 80; let h = 75;
        let count = 0;
        
        for(let r=0; r<rows; r++) {
            for(let c=0; c<cols; c++) {
                let id = `c_${count++}`;
                if(!stateObj.counties[id]) stateObj.counties[id] = new County(id, `County ${count}`, stateObj.ev);
                
                let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("x", c*w + 10); rect.setAttribute("y", r*h + 10);
                rect.setAttribute("width", w-5); rect.setAttribute("height", h-5);
                rect.setAttribute("id", id);
                
                rect.onclick = () => this.clickCounty(id);
                rect.onmousemove = (e) => this.showCountyTooltip(e, id);
                rect.onmouseleave = () => document.getElementById('county-tooltip').classList.add('hidden');
                
                this.colorCountyPath(rect, stateObj.counties[id]);
                svg.appendChild(rect);
            }
        }
        container.appendChild(svg);
    },

    colorCountyPath: function(path, cData) {
        let fill = "#333";
        if(this.data.mapMode === 'political') {
            fill = this.getMarginColor({ pct: cData.pcts.D, margin: cData.pcts.D - cData.pcts.R });
        } else {
            // Demographic Heatmap
            let pop = cData.population; 
            // Simple visual based on mode
            fill = "#444";
        }
        path.style.fill = fill;
        path.style.stroke = "#111";
        path.style.strokeWidth = "1px";
        path.style.cursor = "pointer";
    },

    clickCounty: function(cid) {
        // County Action Menu (Rally)
        if(confirm(`Hold Rally in ${this.data.activeCountyState.counties[cid].name}? Costs 1 Energy.`)) {
            if(this.data.energy > 0) {
                this.data.energy--;
                // Boost
                let c = this.data.activeCountyState.counties[cid];
                if(this.data.selectedParty === 'D') c.pcts.D += 2; else c.pcts.R += 2;
                
                this.updateHUD();
                this.showToast("Rally complete! County shifted.");
                
                // Re-color
                let el = document.getElementById(cid);
                if(el) this.colorCountyPath(el, c);
            } else {
                this.showToast("No Energy!");
            }
        }
    },

    showCountyTooltip: function(e, cid) {
        let c = this.data.activeCountyState.counties[cid];
        const tt = document.getElementById('county-tooltip');
        tt.innerHTML = `<b>${c.name}</b><br>D: ${c.pcts.D.toFixed(1)}%<br>R: ${c.pcts.R.toFixed(1)}%`;
        tt.style.left = (e.clientX + 10) + "px";
        tt.style.top = (e.clientY + 10) + "px";
        tt.classList.remove('hidden');
    },

    setMapMode: function(mode, isCounty=false) {
        this.data.mapMode = mode;
        if(isCounty && this.data.activeCountyState) {
            // Re-render county map colors
            let s = this.data.activeCountyState;
            for(let cid in s.counties) {
                let el = document.getElementById(cid);
                if(el) this.colorCountyPath(el, s.counties[cid]);
            }
        } else {
            this.colorMap();
        }
    },

    /* --- SHARED UTILS --- */
    getMarginColor: function(data) { 
        // data = { pct: 52, margin: 4 }
        // D = Blue, R = Red
        let isDem = data.margin > 0;
        let m = Math.abs(data.margin);
        let intensity = Math.min(m/20, 1);
        
        if(m < 0.5) return "#FFFFFF";
        
        if(isDem) {
            let r = Math.round(255 - (255 * intensity)); // 255 -> 0
            let g = Math.round(255 - (81 * intensity));  // 255 -> 174
            let b = Math.round(255 - (12 * intensity));  // 255 -> 243
            return `rgb(${r},${g},${b})`;
        } else {
            let r = Math.round(255 - (23 * intensity));
            let g = Math.round(255 - (228 * intensity));
            let b = Math.round(255 - (220 * intensity));
            return `rgb(${r},${g},${b})`;
        }
    },

    initMap: function() {
        for(let code in this.data.states) {
            let p = document.getElementById(code);
            if(p) {
                p.onclick = () => this.clickState(code);
                p.onmousemove = (e) => this.showTooltip(e, code);
                p.onmouseleave = () => document.getElementById('map-tooltip').style.display='none';
            }
        }
        this.colorMap();
    },
    colorMap: function() {
        for(let code in this.data.states) {
            let s = this.data.states[code];
            let p = document.getElementById(code);
            if(p) {
                // Determine margin from s.pcts
                let m = s.pcts.D - s.pcts.R;
                p.style.fill = this.getMarginColor({margin: m});
                p.style.stroke = "#555";
            }
        }
        this.updateScore();
    },
    clickState: function(code) {
        this.data.selectedState = code;
        const s = this.data.states[code];
        document.getElementById('state-panel').classList.remove('hidden');
        document.getElementById('empty-msg').classList.add('hidden');
        
        let m = s.pcts.D - s.pcts.R;
        let lead = m > 0 ? "D" : "R";
        let col = m > 0 ? "blue" : "red";
        if(Math.abs(m)<0.1) { lead="EVEN"; col="gray"; } else { lead = `${lead}+${Math.abs(m).toFixed(1)}`; }
        
        document.getElementById('sp-name').innerHTML = `${s.name} <span class="${col}" style="font-size:0.8em; margin-left:10px;">${lead}</span>`;
        document.getElementById('sp-ev').innerText = s.ev + " EV";
        document.getElementById('poll-dem-bar').style.width = s.pcts.D + "%";
        document.getElementById('poll-rep-bar').style.width = s.pcts.R + "%";
        document.getElementById('poll-dem-val').innerText = s.pcts.D.toFixed(1) + "%";
        document.getElementById('poll-rep-val').innerText = s.pcts.R.toFixed(1) + "%";
        
        const l = document.getElementById('sp-issues-list'); l.innerHTML="";
        ISSUES.sort((a,b)=>s.priorities[b.id]-s.priorities[a.id]).slice(0,3).forEach(x=>{
            l.innerHTML+=`<div style="display:flex; justify-content:space-between; border-bottom:1px solid #333; padding:2px;"><span>${x.name}</span><span style="color:gold">${s.priorities[x.id]}</span></div>`;
        });
    },
    
    // ... [Keep other helper functions like updateHUD, updateScore, showTooltip from previous code] ...
    updateHUD: function() {
        document.getElementById('hud-funds').innerText = `$${this.data.funds.toFixed(1)}M`;
        const ec = document.getElementById('hud-energy'); ec.innerHTML="";
        for(let i=0; i<this.data.maxEnergy; i++) {
            ec.innerHTML += `<div class="energy-pip ${i<this.data.energy?'active':''}"></div>`;
        }
    },
    updateScore: function() {
        let d=0, r=0;
        for(let k in this.data.states) {
            if(this.data.states[k].pcts.D > this.data.states[k].pcts.R) d += this.data.states[k].ev; else r += this.data.states[k].ev;
        }
        document.getElementById('score-dem').innerText = d; document.getElementById('score-rep').innerText = r;
        let dp = (d/538)*100, rp = (r/538)*100;
        document.getElementById('ev-bar').style.background = `linear-gradient(90deg, #00AEF3 ${dp}%, #333 ${dp}%, #333 ${100-rp}%, #E81B23 ${100-rp}%)`;
    },
    showTooltip: function(e, code) {
        const tt = document.getElementById('map-tooltip');
        const s = this.data.states[code];
        let m = s.pcts.D - s.pcts.R;
        let name = m > 0 ? "Harris" : "Trump"; // Simplified
        let col = m > 0 ? "#00AEF3" : "#E81B23";
        tt.innerHTML = `<span class="tooltip-leader" style="color:${col}">${name} +${Math.abs(m).toFixed(1)}</span>
                        <div class="tip-row"><span class="blue">DEM ${s.pcts.D.toFixed(1)}%</span> <span class="red">REP ${s.pcts.R.toFixed(1)}%</span></div>`;
        tt.style.display='block'; tt.style.left=(e.clientX+15)+'px'; tt.style.top=(e.clientY+15)+'px';
    },
    
    /* --- PLACEHOLDER FUNCTIONS FOR BUTTONS --- */
    initIssues: function() {
        const s = document.getElementById('issue-select');
        if(s) ISSUES.forEach(i => s.innerHTML += `<option value="${i.id}">${i.name}</option>`);
    },
    fundraise: function() {
        if(this.data.energy < 1) return this.showToast("Need Energy");
        this.data.energy--; this.data.funds += 0.5; this.updateHUD();
    },
    runStateAd: function() { this.data.funds -= 0.5; this.updateHUD(); },
    openStateBio: function() { document.getElementById('bio-modal').classList.remove('hidden'); },
    nextWeek: function() { 
        this.data.currentDate.setDate(this.data.currentDate.getDate()+7);
        // Opponent turn logic
        this.updateHUD(); 
    },
    undoLastAction: function() {},
    showToast: function(msg) { console.log(msg); }
};

document.addEventListener('DOMContentLoaded', () => app.init());
