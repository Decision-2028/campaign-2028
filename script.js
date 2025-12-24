/* --- CONFIGURATION --- */
const PARTIES = {
    D: { name: "Democratic", color: "#00AEF3", img: "images/harrison.jpg", desc: "Liberal platform focused on social equality and economic reform." },
    R: { name: "Republican", color: "#E81B23", img: "images/whatley.jpg", desc: "Conservative platform focused on deregulation and traditional values." },
    I: { name: "Independent", color: "#F2C75C", img: "images/scenario.jpg", desc: "Centrist coalition seeking electoral reform." },
    G: { name: "Green", color: "#198754", img: "images/scenario.jpg", desc: "Environmental justice and social democracy." },
    L: { name: "Libertarian", color: "#fd7e14", img: "images/scenario.jpg", desc: "Individual liberty and free markets." }
};

const ISSUES = [
    { id: 'econ', name: 'Economy: Inflation' }, { id: 'jobs', name: 'Economy: Jobs' },
    { id: 'tax', name: 'Tax Policy' }, { id: 'health', name: 'Healthcare' },
    { id: 'immig', name: 'Immigration' }, { id: 'clim', name: 'Climate Change' },
    { id: 'gun', name: 'Gun Control' }, { id: 'abort', name: 'Abortion Rights' },
    { id: 'foreign', name: 'Foreign Policy' }, { id: 'crime', name: 'Crime & Safety' }
];

const INTEREST_GROUPS = [
    { id: 'aa', name: 'African American' }, { id: 'his', name: 'Hispanic/Latino' },
    { id: 'union', name: 'Union Workers' }, { id: 'evang', name: 'Evangelicals' },
    { id: 'youth', name: 'Youth (<30)' }, { id: 'senior', name: 'Seniors (65+)' }
];

const CANDIDATES = [
    // Democrats
    { id: "harris", name: "Kamala Harris", party: "D", funds: 60, img: "images/harris.jpg", buff: "Incumbent Advantage", desc: "Current Vice President.", stamina: 8 },
    { id: "newsom", name: "Gavin Newsom", party: "D", funds: 75, img: "images/newsom.jpg", buff: "Fundraising Machine", desc: "Governor of California.", stamina: 9 },
    { id: "whitmer", name: "Gretchen Whitmer", party: "D", funds: 55, img: "images/whitmer.jpg", buff: "Rust Belt Appeal", desc: "Governor of Michigan.", stamina: 8 },
    { id: "shapiro", name: "Josh Shapiro", party: "D", funds: 50, img: "images/shapiro.jpg", buff: "Swing State King", desc: "Governor of Pennsylvania.", stamina: 8 },
    // Republicans
    { id: "desantis", name: "Ron DeSantis", party: "R", funds: 65, img: "images/desantis.jpg", buff: "Culture Warrior", desc: "Governor of Florida.", stamina: 9 },
    { id: "vance", name: "JD Vance", party: "R", funds: 50, img: "images/vance.jpg", buff: "Populist Appeal", desc: "Senator from Ohio.", stamina: 8 },
    { id: "ramaswamy", name: "Vivek Ramaswamy", party: "R", funds: 70, img: "images/ramaswamy.jpg", buff: "Outsider Energy", desc: "Tech Entrepreneur.", stamina: 10 },
    // Third Party (Not playable directly but exist in simulation)
    { id: "yang", name: "Andrew Yang", party: "I", funds: 40, img: "images/yang.jpg", buff: "Tech Innovator", desc: "Forward Party Founder.", stamina: 8 },
    { id: "stein", name: "Jill Stein", party: "G", funds: 10, img: "images/scenario.jpg", buff: "Eco-Activist", desc: "Green Party Nominee.", stamina: 6 },
    { id: "oliver", name: "Chase Oliver", party: "L", funds: 12, img: "images/scenario.jpg", buff: "Liberty First", desc: "Libertarian Nominee.", stamina: 7 }
];

const VPS = [
    { id: "shapiro", name: "Josh Shapiro", party: "D", state: "PA", desc: "Popular swing state governor.", img: "images/shapiro.jpg" },
    { id: "kelly", name: "Mark Kelly", party: "D", state: "AZ", desc: "Astronaut & Senator.", img: "images/scenario.jpg" },
    { id: "rubio", name: "Marco Rubio", party: "R", state: "FL", desc: "Establishment bridge.", img: "images/scenario.jpg" },
    { id: "stefanik", name: "Elise Stefanik", party: "R", state: "NY", desc: "Strong aggressive campaigner.", img: "images/scenario.jpg" }
];

const INIT_STATES = {
    "AL": { name: "Alabama", ev: 9, poll: 35 }, "AK": { name: "Alaska", ev: 3, poll: 42 }, "AZ": { name: "Arizona", ev: 11, poll: 49.5 },
    "AR": { name: "Arkansas", ev: 6, poll: 35 }, "CA": { name: "California", ev: 54, poll: 65 }, "CO": { name: "Colorado", ev: 10, poll: 56 },
    "CT": { name: "Connecticut", ev: 7, poll: 59 }, "DE": { name: "Delaware", ev: 3, poll: 62 }, "DC": { name: "D.C.", ev: 3, poll: 92 },
    "FL": { name: "Florida", ev: 30, poll: 46 }, "GA": { name: "Georgia", ev: 16, poll: 49.2 }, "HI": { name: "Hawaii", ev: 4, poll: 68 },
    "ID": { name: "Idaho", ev: 4, poll: 30 }, "IL": { name: "Illinois", ev: 19, poll: 57 }, "IN": { name: "Indiana", ev: 11, poll: 40 },
    "IA": { name: "Iowa", ev: 6, poll: 43 }, "KS": { name: "Kansas", ev: 6, poll: 40 }, "KY": { name: "Kentucky", ev: 8, poll: 35 },
    "LA": { name: "Louisiana", ev: 8, poll: 38 }, "ME": { name: "Maine", ev: 4, poll: 55 }, "MD": { name: "Maryland", ev: 10, poll: 65 },
    "MA": { name: "Massachusetts", ev: 11, poll: 68 }, "MI": { name: "Michigan", ev: 15, poll: 51.5 }, "MN": { name: "Minnesota", ev: 10, poll: 54 },
    "MS": { name: "Mississippi", ev: 6, poll: 38 }, "MO": { name: "Missouri", ev: 10, poll: 42 }, "MT": { name: "Montana", ev: 4, poll: 40 },
    "NE": { name: "Nebraska", ev: 5, poll: 38 }, "NV": { name: "Nevada", ev: 6, poll: 50.5 }, "NH": { name: "New Hampshire", ev: 4, poll: 53 },
    "NJ": { name: "New Jersey", ev: 14, poll: 58 }, "NM": { name: "New Mexico", ev: 5, poll: 54 }, "NY": { name: "New York", ev: 28, poll: 62 },
    "NC": { name: "North Carolina", ev: 16, poll: 48.5 }, "ND": { name: "North Dakota", ev: 3, poll: 30 }, "OH": { name: "Ohio", ev: 17, poll: 45 },
    "OK": { name: "Oklahoma", ev: 7, poll: 32 }, "OR": { name: "Oregon", ev: 8, poll: 58 }, "PA": { name: "Pennsylvania", ev: 19, poll: 50.2 },
    "RI": { name: "Rhode Island", ev: 4, poll: 60 }, "SC": { name: "South Carolina", ev: 9, poll: 42 }, "SD": { name: "South Dakota", ev: 3, poll: 35 },
    "TN": { name: "Tennessee", ev: 11, poll: 37 }, "TX": { name: "Texas", ev: 40, poll: 44 }, "UT": { name: "Utah", ev: 6, poll: 38 },
    "VT": { name: "Vermont", ev: 3, poll: 66 }, "VA": { name: "Virginia", ev: 13, poll: 54 }, "WA": { name: "Washington", ev: 12, poll: 60 },
    "WV": { name: "West Virginia", ev: 4, poll: 28 }, "WI": { name: "Wisconsin", ev: 10, poll: 50.8 }, "WY": { name: "Wyoming", ev: 3, poll: 25 }
};

/* --- APP ENGINE --- */
const app = {
    data: {
        currentDate: new Date("2028-07-04"),
        electionDay: new Date("2028-11-07"),
        selectedParty: null, candidate: null, vp: null, 
        opponent: null, opponentVP: null,
        funds: 0, energy: 8, maxEnergy: 8,
        thirdPartiesEnabled: true,
        states: {}, selectedState: null,
        turnSnapshot: null 
    },

    init: function() {
        console.log("App Initializing...");
        this.data.states = JSON.parse(JSON.stringify(INIT_STATES));
        
        // Initialize State Data
        for(let s in this.data.states) {
            this.data.states[s].moe = (Math.random() * 2 + 1.5).toFixed(1);
            this.data.states[s].donorFatigue = 0; 
            
            // 1. Initialize Vote Shares based on base poll
            let baseD = this.data.states[s].poll;
            let baseR = 100 - baseD;
            
            this.data.states[s].pcts = { D: baseD, R: baseR, G: 0, L: 0 };

            // 2. Define Third Party Baselines
            this.data.states[s].greenBase = ['CA','OR','VT','WA','NY'].includes(s) ? 4.5 : 1.0;
            this.data.states[s].libBase = ['NH','MT','NV','AK','NM'].includes(s) ? 5.0 : 1.5;

            // 3. Priorities & Demographics
            this.data.states[s].priorities = {};
            ISSUES.forEach(i => this.data.states[s].priorities[i.id] = Math.floor(Math.random()*10)+1);
            
            this.data.states[s].demographics = {};
            INTEREST_GROUPS.forEach(ig => this.data.states[s].demographics[ig.id] = Math.floor(Math.random()*30)+5);
        }
        
        this.renderParties();
        this.initIssues();
    },

    goToScreen: function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    /* --- SETUP SCREENS --- */
    renderParties: function() {
        const c = document.getElementById('party-cards');
        if(!c) return; c.innerHTML = "";
        ['D','R','I'].forEach(k => {
            const p = PARTIES[k];
            c.innerHTML += `<div class="card card-party" onclick="app.selParty('${k}')" style="background-image:url('${p.img}'); border-top:5px solid ${p.color}"><div class="party-overlay"><h3>${p.name} Party</h3><div class="party-desc">${p.desc}</div></div></div>`;
        });
    },
    selParty: function(k) { this.data.selectedParty = k; this.renderCands(k); this.goToScreen('candidate-screen'); },

    renderCands: function(pk) {
        const c = document.getElementById('candidate-cards');
        c.innerHTML = "";
        CANDIDATES.filter(x => x.party === pk).forEach(cand => {
            const img = cand.img ? `<img src="${cand.img}">` : "";
            c.innerHTML += `<div class="card" onclick="app.selCand('${cand.id}')"><div class="portrait">${img}</div><div class="card-info"><h3>${cand.name}</h3><p>${cand.desc}</p><p class="buff-text">Stamina: ${cand.stamina}</p></div></div>`;
        });
    },
    selCand: function(id) {
        this.data.candidate = CANDIDATES.find(x => x.id === id);
        this.data.maxEnergy = this.data.candidate.stamina;
        this.data.energy = this.data.maxEnergy;
        this.renderVPs(this.data.candidate.party);
        this.goToScreen('vp-screen');
    },

    renderVPs: function(pk) {
        const c = document.getElementById('vp-cards');
        c.innerHTML = "";
        const vps = VPS.filter(x => x.party === pk);
        
        if(vps.length === 0) {
            c.innerHTML = `<div class="card" onclick="app.renderOpp()"><div class="card-info"><h3>CONTINUE (NO VP)</h3></div></div>`;
            return;
        }

        vps.forEach(v => {
            const img = v.img ? `<img src="${v.img}">` : "";
            c.innerHTML += `<div class="card" onclick="app.selVP('${v.id}')"><div class="portrait">${img}</div><div class="card-info"><h3>${v.name}</h3><p>${v.state}</p></div></div>`;
        });
    },
    selVP: function(id) { 
        this.data.vp = VPS.find(x => x.id === id); 
        this.renderOpp();
    },

    // Opponent Selection Flow
    renderOpp: function() {
        const maj = document.getElementById('opponent-cards-major');
        const min = document.getElementById('opponent-cards-minor');
        if(!maj || !min) return; 
        maj.innerHTML = ""; min.innerHTML = "";
        document.getElementById('opp-section-title').innerText = "SELECT OPPONENT CANDIDATE";

        let rivalP = (this.data.selectedParty === 'D') ? 'R' : 'D';
        if(this.data.selectedParty === 'I') rivalP = 'D';

        CANDIDATES.filter(x => x.party === rivalP).forEach(opp => {
            const img = opp.img ? `<img src="${opp.img}">` : "";
            maj.innerHTML += `<div class="card" onclick="app.selOpp('${opp.id}')"><div class="portrait">${img}</div><div class="card-info"><h3>${opp.name}</h3><p>${opp.desc}</p></div></div>`;
        });

        CANDIDATES.filter(x => ['G','L'].includes(x.party)).forEach(opp => {
            min.innerHTML += `<div class="card" style="transform:scale(0.9); border-top:3px solid ${PARTIES[opp.party].color}"><div class="card-info"><h3>${opp.name}</h3><p>${PARTIES[opp.party].name}</p></div></div>`;
        });
        
        this.goToScreen('opponent-screen');
    },
    selOpp: function(id) {
        this.data.opponent = CANDIDATES.find(x => x.id === id);
        this.renderOppVPs();
    },
    renderOppVPs: function() {
        const maj = document.getElementById('opponent-cards-major');
        maj.innerHTML = "";
        document.getElementById('opp-section-title').innerText = "SELECT OPPONENT'S VP";

        const vps = VPS.filter(x => x.party === this.data.opponent.party);
        if(vps.length === 0) { this.startGame(); return; }

        vps.forEach(v => {
            const img = v.img ? `<img src="${v.img}">` : "";
            maj.innerHTML += `<div class="card" onclick="app.selOppVP('${v.id}')"><div class="portrait">${img}</div><div class="card-info"><h3>${v.name}</h3><p>${v.state}</p></div></div>`;
        });
    },
    selOppVP: function(id) {
        this.data.opponentVP = VPS.find(x => x.id === id);
        this.startGame();
    },

    toggleThirdParties: function() {
        this.data.thirdPartiesEnabled = document.getElementById('third-party-toggle').checked;
        document.getElementById('third-party-section').style.opacity = this.data.thirdPartiesEnabled ? "1" : "0.3";
    },

    /* --- GAME START --- */
    startGame: function() {
        this.data.funds = this.data.candidate.funds;
        this.saveSnapshot(); 
        this.goToScreen('game-screen');
        
        // HUD
        const img = document.getElementById('hud-img');
        if(this.data.candidate.img) { img.src = this.data.candidate.img; img.style.display = "block"; }
        const pKey = this.data.selectedParty;
        img.className = `hud-border-${pKey}`;
        document.getElementById('hud-cand-name').innerText = this.data.candidate.name.toUpperCase();
        document.getElementById('hud-party-name').innerText = PARTIES[pKey].name.toUpperCase() + " NOMINEE";
        document.getElementById('hud-party-name').className = `cand-party text-${pKey}`;

        // Initialize Votes (Spoiler Logic)
        if(this.data.thirdPartiesEnabled) {
            for(let s in this.data.states) {
                let st = this.data.states[s];
                st.pcts.G = st.greenBase;
                st.pcts.L = st.libBase;
                
                // Green hurts D (70%) / R (30%)
                st.pcts.D -= (st.pcts.G * 0.7);
                st.pcts.R -= (st.pcts.G * 0.3);
                
                // Lib hurts R (70%) / D (30%)
                st.pcts.R -= (st.pcts.L * 0.7);
                st.pcts.D -= (st.pcts.L * 0.3);
            }
            this.log("Third parties entered the race. Vote shares adjusted.");
        }

        // VP Buffs
        if(this.data.vp && this.data.states[this.data.vp.state]) {
            if(pKey === 'D') this.data.states[this.data.vp.state].pcts.D += 5;
            else this.data.states[this.data.vp.state].pcts.R += 5;
        }

        this.initMap();
        this.updateHUD();
    },

    /* --- GAMEPLAY --- */
    initIssues: function() {
        const s = document.getElementById('issue-select');
        const r = document.getElementById('rally-issue-select');
        if(s) ISSUES.forEach(i => s.innerHTML += `<option value="${i.id}">${i.name}</option>`);
        if(r) ISSUES.forEach(i => r.innerHTML += `<option value="${i.id}">${i.name}</option>`);
    },

    fundraise: function() {
        if(this.data.energy < 1) return this.showToast("Need 1 Energy!");
        this.data.energy--;
        
        const s = this.data.states[this.data.selectedState];
        // Support based on player party
        let mySupport = this.data.selectedParty === 'D' ? s.pcts.D : s.pcts.R;
        let base = 0.5;
        let fatigue = Math.pow(0.5, s.donorFatigue);
        
        let amt = base * (s.ev/5) * (mySupport/50) * fatigue;
        if(amt < 0.1) amt = 0.1;
        
        this.data.funds += amt;
        s.donorFatigue++;
        
        this.updateHUD();
        this.showToast(`Raised $${amt.toFixed(1)}M in ${s.name}`);
    },

    setupRally: function() { document.getElementById('rally-options').classList.remove('hidden'); },
    
    executeRally: function() {
        if(this.data.energy < 2) return this.showToast("Need 2 Energy!");
        if(this.data.funds < 0.1) return this.showToast("Need $100k!");
        
        this.data.energy -= 2;
        this.data.funds -= 0.1;
        
        const s = this.data.states[this.data.selectedState];
        const iID = document.getElementById('rally-issue-select').value;
        const imp = s.priorities[iID] || 5;
        
        let boost = (imp/3) * (Math.random()*0.5 + 0.8);
        
        if(this.data.selectedParty==='D') { s.pcts.D += boost; s.pcts.R -= (boost/2); }
        else { s.pcts.R += boost; s.pcts.D -= (boost/2); }
        
        document.getElementById('rally-options').classList.add('hidden');
        this.updateHUD();
        this.colorMap();
        this.clickState(this.data.selectedState);
        this.showToast("Rally Complete!");
    },

    runStateAd: function() {
        if(this.data.funds < 0.5) return this.showToast("Need $500k!");
        this.data.funds -= 0.5;
        const s = this.data.states[this.data.selectedState];
        const boost = 1.2;
        if(this.data.selectedParty==='D') { s.pcts.D += boost; s.pcts.R -= boost; }
        else { s.pcts.R += boost; s.pcts.D -= boost; }
        this.updateHUD(); this.colorMap(); this.clickState(this.data.selectedState);
    },

    openStateBio: function() {
        const s = this.data.states[this.data.selectedState];
        const modal = document.getElementById('bio-modal');
        const content = document.getElementById('bio-content');
        
        let demoHTML = `<div class="ig-grid">`;
        for(let k in s.demographics) {
            let n = INTEREST_GROUPS.find(x=>x.id===k).name;
            demoHTML += `<div class="ig-tag"><span>${n}</span><span class="ig-val">${s.demographics[k]}%</span></div>`;
        }
        demoHTML += `</div>`;
        
        content.innerHTML = `
            <div class="bio-header" style="background:#333;">
                <div class="bio-title"><h2>${s.name}</h2></div>
            </div>
            <div class="bio-lore">"Key battleground with ${s.ev} Electoral Votes."</div>
            <h3>DEMOGRAPHICS</h3>${demoHTML}
            <h3 style="margin-top:20px;">POLLING</h3>
            <p>
                <span class="text-D">DEM: ${s.pcts.D.toFixed(1)}%</span> | 
                <span class="text-R">REP: ${s.pcts.R.toFixed(1)}%</span> | 
                <span class="text-G">GRN: ${s.pcts.G.toFixed(1)}%</span> | 
                <span class="text-L">LIB: ${s.pcts.L.toFixed(1)}%</span>
            </p>
        `;
        modal.classList.remove('hidden');
    },

    /* --- TURN & AI --- */
    nextWeek: function() {
        if(this.data.currentDate >= this.data.electionDay) return alert("Election Day Reached! Tallying votes...");
        
        this.data.currentDate.setDate(this.data.currentDate.getDate()+7);
        let roll = this.data.energy;
        this.data.energy = Math.min(this.data.maxEnergy + roll, Math.floor(this.data.maxEnergy*1.5));
        for(let s in this.data.states) { if(this.data.states[s].donorFatigue > 0) this.data.states[s].donorFatigue--; }
        
        this.opponentTurn();
        this.saveSnapshot();
        this.updateHUD();
        this.colorMap();
        if(this.data.selectedState) this.clickState(this.data.selectedState);
        this.showToast("Week Advanced.");
    },

    opponentTurn: function() {
        const playerIsDem = this.data.selectedParty === 'D';
        for(let code in this.data.states) {
            let s = this.data.states[code];
            // Drift
            let drift = (Math.random()*0.6 - 0.3);
            s.pcts.D += drift; s.pcts.R -= drift;
            
            // AI Logic: Target close states
            let lead = s.pcts.D - s.pcts.R;
            let isSwing = Math.abs(lead) < 6;
            
            if(isSwing && Math.random() > 0.4) {
                let shift = Math.random()*1.0 + 0.2;
                if(playerIsDem) { s.pcts.R += shift; s.pcts.D -= (shift*0.5); }
                else { s.pcts.D += shift; s.pcts.R -= (shift*0.5); }
            }
        }
    },

    saveSnapshot: function() { this.data.turnSnapshot = JSON.stringify(this.data); },
    undoLastAction: function() {
        if(!this.data.turnSnapshot) return;
        if(confirm("Reset Turn?")) {
            const snap = JSON.parse(this.data.turnSnapshot);
            this.data.funds = snap.funds;
            this.data.energy = snap.energy;
            this.data.states = snap.states;
            this.updateHUD(); this.colorMap();
            if(this.data.selectedState) this.clickState(this.data.selectedState);
        }
    },

    /* --- MAP UTILS & COLORING --- */
    getLeadInfo: function(state) {
        // Returns { leader: 'D'|'R'|'G'|'L', margin: 5.2, name: 'Harris' }
        let p = state.pcts;
        let sorted = Object.keys(p).sort((a,b) => p[b] - p[a]); // Sort keys by value desc
        let leader = sorted[0];
        let runnerUp = sorted[1];
        let margin = p[leader] - p[runnerUp];
        
        let candName = "Opponent";
        // Map Party Code to Name
        if(leader === this.data.selectedParty) candName = this.data.candidate.name.split(" ").pop();
        else if(this.data.opponent && leader === this.data.opponent.party) candName = this.data.opponent.name.split(" ").pop();
        else if(leader === 'G') candName = "Stein";
        else if(leader === 'L') candName = "Oliver";
        else candName = leader; // Fallback

        return { party: leader, margin: margin, name: candName };
    },

    getMarginColor: function(info) {
        // info = { party: 'D', margin: 5.5 }
        if(info.margin < 1.0) return "#FFFFFF"; // Swing/Tie = White
        
        let intensity = Math.min(info.margin / 15, 1); // Cap at 15%
        
        // Base Colors
        const bases = {
            D: [0, 174, 243], // #00AEF3
            R: [232, 27, 35], // #E81B23
            I: [242, 199, 92],
            G: [25, 135, 84],
            L: [253, 126, 20]
        };
        
        let c = bases[info.party] || [128,128,128];
        
        // Interpolate White (255,255,255) -> Base Color
        let r = Math.round(255 - (255 - c[0]) * intensity);
        let g = Math.round(255 - (255 - c[1]) * intensity);
        let b = Math.round(255 - (255 - c[2]) * intensity);
        
        return `rgb(${r}, ${g}, ${b})`;
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
                let info = this.getLeadInfo(s);
                p.style.fill = this.getMarginColor(info);
                p.style.stroke = "#333";
                p.style.strokeWidth = "0.5";
            }
        }
        this.updateScore();
    },

    clickState: function(code) {
        this.data.selectedState = code;
        const s = this.data.states[code];
        document.getElementById('state-panel').classList.remove('hidden');
        document.getElementById('empty-msg').classList.add('hidden');
        
        let info = this.getLeadInfo(s);
        let mText = info.margin < 0.1 ? "EVEN" : `${info.party}+${info.margin.toFixed(1)}`;
        let mClass = `text-${info.party}`; // e.g. text-D
        
        document.getElementById('sp-name').innerHTML = `${s.name} <span class="${mClass}" style="font-size:0.8em; margin-left:8px; font-weight:bold;">${mText}</span>`;
        document.getElementById('sp-ev').innerText = s.ev + " EV";
        
        // Update Bars
        document.getElementById('poll-dem-bar').style.width = s.pcts.D + "%";
        document.getElementById('poll-rep-bar').style.width = s.pcts.R + "%";
        document.getElementById('poll-dem-val').innerText = s.pcts.D.toFixed(1) + "%";
        document.getElementById('poll-rep-val').innerText = s.pcts.R.toFixed(1) + "%";
        
        const l = document.getElementById('sp-issues-list');
        l.innerHTML="";
        ISSUES.sort((a,b)=>s.priorities[b.id]-s.priorities[a.id]).slice(0,3).forEach(x=>{
            l.innerHTML+=`<div style="display:flex; justify-content:space-between; padding:2px; border-bottom:1px solid #333"><span>${x.name}</span><span style="color:gold">${s.priorities[x.id]}</span></div>`;
        });
    },

    showTooltip: function(e, code) {
        const tt = document.getElementById('map-tooltip');
        const s = this.data.states[code];
        let info = this.getLeadInfo(s);
        
        // Color lookup
        const colors = { D: "#00AEF3", R: "#E81B23", G: "#198754", L: "#fd7e14" };
        let c = colors[info.party] || "#fff";

        tt.innerHTML = `
            <div style="font-size:0.8rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:2px; color:#ccc;">${s.name}</div>
            <span class="tooltip-leader" style="color:${c};">${info.name} +${info.margin.toFixed(1)}</span>
        `;
        tt.style.display='block'; tt.style.left=(e.clientX+15)+'px'; tt.style.top=(e.clientY+15)+'px';
    },

    updateHUD: function() {
        const opt = { month: 'short', day: 'numeric' };
        document.getElementById('hud-date').innerText = this.data.currentDate.toLocaleDateString('en-US', opt);
        document.getElementById('hud-funds').innerText = `$${this.data.funds.toFixed(1)}M`;
        const ec = document.getElementById('hud-energy');
        ec.innerHTML="";
        for(let i=0; i<this.data.maxEnergy; i++) {
            ec.innerHTML += `<div class="energy-pip ${i<this.data.energy?'active':''}"></div>`;
        }
    },
    
    updateScore: function() {
        let d=0, r=0;
        for(let k in this.data.states) {
            let info = this.getLeadInfo(this.data.states[k]);
            if(info.party === 'D') d += this.data.states[k].ev;
            if(info.party === 'R') r += this.data.states[k].ev;
        }
        document.getElementById('score-dem').innerText = d;
        document.getElementById('score-rep').innerText = r;
        const dp = (d/538)*100; const rp = (r/538)*100;
        document.getElementById('ev-bar').style.background = `linear-gradient(90deg, #00AEF3 ${dp}%, #333 ${dp}%, #333 ${100-rp}%, #E81B23 ${100-rp}%)`;
    },
    
    log: function(msg) {
        const feed = document.getElementById('log-content');
        if(feed) { const div = document.createElement('div'); div.className = "log-entry"; div.innerText = `> ${msg}`; feed.prepend(div); }
    },
    showToast: function(msg) {
        const t = document.getElementById('toast');
        t.innerText = msg; t.style.opacity = 1; setTimeout(() => t.style.opacity = 0, 2000);
    },
    toggleThirdParties: function() {
        this.data.thirdPartiesEnabled = document.getElementById('third-party-toggle').checked;
        document.getElementById('third-party-section').style.opacity = this.data.thirdPartiesEnabled ? "1" : "0.3";
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
