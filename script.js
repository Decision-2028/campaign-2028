/* --- CONFIGURATION --- */
const PARTIES = {
    D: { name: "Democratic", color: "#00AEF3", img: "images/harrison.jpg", desc: "Liberal platform focused on social equality and economic reform." },
    R: { name: "Republican", color: "#E81B23", img: "images/whatley.jpg", desc: "Conservative platform focused on deregulation and traditional values." },
    I: { name: "Independent", color: "#F2C75C", img: "images/scenario.jpg", desc: "Centrist coalition seeking electoral reform." },
    G: { name: "Green", color: "#198754", img: "images/scenario.jpg", desc: "Environmental justice and social democracy." },
    L: { name: "Libertarian", color: "#fd7e14", img: "images/scenario.jpg", desc: "Individual liberty and free markets." }
};

const CANDIDATES = [
    // Democrats
    { id: "harris", name: "Kamala Harris", party: "D", desc: "Incumbent VP.", funds: 60, img: "images/harris.jpg", buff: "Incumbent Advantage" },
    { id: "newsom", name: "Gavin Newsom", party: "D", desc: "CA Governor.", funds: 75, img: "images/newsom.jpg", buff: "Fundraising Machine" },
    { id: "whitmer", name: "Gretchen Whitmer", party: "D", desc: "MI Governor.", funds: 55, img: "images/whitmer.jpg", buff: "Rust Belt Appeal" },
    { id: "shapiro", name: "Josh Shapiro", party: "D", desc: "PA Governor.", funds: 50, img: "images/shapiro.jpg", buff: "Swing State King" },
    { id: "buttigieg", name: "Pete Buttigieg", party: "D", desc: "Transp. Sec.", funds: 55, img: "images/buttigieg.jpg", buff: "Media Savvy" },
    { id: "aoc", name: "AOC", party: "D", desc: "Congresswoman.", funds: 40, img: "images/aoc.jpg", buff: "Grassroots Army" },

    // Republicans
    { id: "desantis", name: "Ron DeSantis", party: "R", desc: "FL Governor.", funds: 65, img: "images/desantis.jpg", buff: "Culture Warrior" },
    { id: "vance", name: "JD Vance", party: "R", desc: "OH Senator.", funds: 50, img: "images/vance.jpg", buff: "Populist Appeal" },
    { id: "haley", name: "Nikki Haley", party: "R", desc: "Former Amb.", funds: 55, img: "images/haley.jpg", buff: "Suburban Appeal" },
    { id: "ramaswamy", name: "Vivek Ramaswamy", party: "R", desc: "Entrepreneur.", funds: 70, img: "images/ramaswamy.jpg", buff: "Outsider Energy" },

    // Third Parties
    { id: "yang", name: "Andrew Yang", party: "I", desc: "Forward Party.", funds: 40, img: "images/yang.jpg", buff: "UBI Appeal" },
    { id: "stein", name: "Jill Stein", party: "G", desc: "Green Party.", funds: 10, img: "images/scenario.jpg", buff: "Eco-Activist" },
    { id: "oliver", name: "Chase Oliver", party: "L", desc: "Libertarian.", funds: 10, img: "images/scenario.jpg", buff: "Liberty First" }
];

const VPS = [
    { id: "shapiro", name: "Josh Shapiro", party: "D", state: "PA", desc: "Popular swing state governor.", img: "images/shapiro.jpg" },
    { id: "kelly", name: "Mark Kelly", party: "D", state: "AZ", desc: "Astronaut & Senator.", img: "images/scenario.jpg" },
    { id: "cooper", name: "Roy Cooper", party: "D", state: "NC", desc: "Moderate southern appeal.", img: "images/scenario.jpg" },
    { id: "rubio", name: "Marco Rubio", party: "R", state: "FL", desc: "Establishment bridge.", img: "images/scenario.jpg" },
    { id: "stefanik", name: "Elise Stefanik", party: "R", state: "NY", desc: "Strong aggressive campaigner.", img: "images/scenario.jpg" },
    { id: "tulsi", name: "Tulsi Gabbard", party: "I", state: "HI", desc: "Anti-war populist.", img: "images/scenario.jpg" }
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

const ISSUES = [
    { id: 'econ', name: 'Economy' }, { id: 'immig', name: 'Border Security' },
    { id: 'abort', name: 'Reproductive Rights' }, { id: 'clim', name: 'Climate Change' }
];

/* --- APP ENGINE --- */
const app = {
    data: {
        selectedParty: null, candidate: null, vp: null, opponent: null,
        thirdPartiesEnabled: true, funds: 0, weeks: 14, actionsLeft: 3,
        states: {}, selectedState: null, turnLog: []
    },

    init: function() {
        console.log("App Initializing...");
        this.data.states = JSON.parse(JSON.stringify(INIT_STATES));
        
        // Initialize State Extras
        for(let s in this.data.states) {
            this.data.states[s].moe = (Math.random() * 2 + 1.5).toFixed(1);
            this.data.states[s].priorities = {};
            ISSUES.forEach(i => this.data.states[s].priorities[i.id] = Math.floor(Math.random()*10)+1);
            
            // Third Party Baselines
            this.data.states[s].greenShare = ['CA','OR','WA','VT'].includes(s) ? 4.0 : 1.0;
            this.data.states[s].libShare = ['NH','MT','AK','NV'].includes(s) ? 4.5 : 1.5;
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
        
        ['D', 'R', 'I'].forEach(key => {
            const p = PARTIES[key];
            const el = document.createElement('div');
            el.className = "card card-party";
            el.style.backgroundImage = `url('${p.img}')`;
            el.style.borderTop = `5px solid ${p.color}`;
            el.innerHTML = `
                <div class="party-overlay">
                    <h3>${p.name} Party</h3>
                    <div class="party-desc">${p.desc}</div>
                </div>`;
            el.onclick = () => {
                this.data.selectedParty = key;
                this.renderCandidates(key);
                this.goToScreen('candidate-screen');
            };
            c.appendChild(el);
        });
    },

    renderCandidates: function(pk) {
        const c = document.getElementById('candidate-cards');
        c.innerHTML = "";
        CANDIDATES.filter(x => x.party === pk).forEach(cand => {
            const img = cand.img ? `<img src="${cand.img}">` : "";
            const el = document.createElement('div');
            el.className = "card";
            el.innerHTML = `
                <div class="portrait">${img}</div>
                <div class="card-info">
                    <h3>${cand.name}</h3>
                    <p>${cand.desc}</p>
                    <p class="buff-text">${cand.buff}</p>
                    <p style="color:#4ade80">Funds: $${cand.funds}M</p>
                </div>`;
            el.onclick = () => {
                this.data.candidate = cand;
                this.renderVPs(pk);
                this.goToScreen('vp-screen');
            };
            c.appendChild(el);
        });
    },

    renderVPs: function(pk) {
        const c = document.getElementById('vp-cards');
        c.innerHTML = "";
        const vps = VPS.filter(x => x.party === pk);
        
        if(vps.length === 0) {
            c.innerHTML = "<div class='card' onclick='app.renderOpponentSelection(); app.goToScreen(\"opponent-screen\")'><div class='card-info'><h3>CONTINUE WITHOUT VP</h3></div></div>";
            return;
        }

        vps.forEach(v => {
            const img = v.img ? `<img src="${v.img}">` : "";
            const el = document.createElement('div');
            el.className = "card";
            el.innerHTML = `
                <div class="portrait">${img}</div>
                <div class="card-info"><h3>${v.name}</h3><p>Home: ${v.state}</p><p>${v.desc}</p></div>`;
            el.onclick = () => {
                this.data.vp = v;
                // VP Bonus
                if(this.data.states[v.state]) {
                    this.data.states[v.state].poll += (pk === 'D' ? 5 : -5);
                }
                this.renderOpponentSelection();
                this.goToScreen('opponent-screen');
            };
            c.appendChild(el);
        });
    },

    renderOpponentSelection: function() {
        const majC = document.getElementById('opponent-cards-major');
        const minC = document.getElementById('opponent-cards-minor');
        majC.innerHTML = ""; minC.innerHTML = "";

        // Determine Rival
        let rivalP = (this.data.selectedParty === 'D') ? 'R' : 'D';
        if(this.data.selectedParty === 'I') rivalP = 'D';

        // Major Opponents
        CANDIDATES.filter(x => x.party === rivalP).forEach(opp => {
            const img = opp.img ? `<img src="${opp.img}">` : "";
            const el = document.createElement('div');
            el.className = "card";
            el.innerHTML = `<div class="portrait">${img}</div><div class="card-info"><h3>${opp.name}</h3><p>${opp.desc}</p></div>`;
            el.onclick = () => { this.data.opponent = opp; this.startGame(); };
            majC.appendChild(el);
        });

        // Minor Opponents (Visual)
        CANDIDATES.filter(x => ['G','L'].includes(x.party)).forEach(opp => {
            const el = document.createElement('div');
            el.className = "card";
            el.style.transform = "scale(0.9)";
            el.innerHTML = `<div class="card-info" style="border-top:3px solid ${PARTIES[opp.party].color}"><h3>${opp.name}</h3><p>${PARTIES[opp.party].name}</p></div>`;
            minC.appendChild(el);
        });
    },

    /* --- GAME START & AI --- */
    startGame: function() {
        this.data.funds = this.data.candidate.funds;
        this.goToScreen('game-screen');
        
        // HUD
        const img = document.getElementById('hud-img');
        if(this.data.candidate.img) { img.src = this.data.candidate.img; img.style.display = "block"; }
        const pKey = this.data.selectedParty;
        img.className = `hud-border-${pKey}`;
        document.getElementById('hud-cand-name').innerText = this.data.candidate.name.toUpperCase();
        document.getElementById('hud-party-name').innerText = PARTIES[pKey].name.toUpperCase() + " NOMINEE";
        document.getElementById('hud-party-name').className = `cand-party text-${pKey}`;

        // Third Party Spoilers
        if(this.data.thirdPartiesEnabled) {
            for(let s in this.data.states) {
                // Remove vote share from major parties
                let totalSpoiler = (this.data.states[s].greenShare || 0) + (this.data.states[s].libShare || 0);
                // Simple logic: Shift towards 50% (chaos) or subtract from leader
                if(this.data.states[s].poll > 50) this.data.states[s].poll -= (totalSpoiler/2);
                else this.data.states[s].poll += (totalSpoiler/2);
            }
            this.log("Third parties entered. Polls tightened.");
        }

        this.initMap();
        this.updateHUD();
        this.log("Campaign Started.");
    },

    nextWeek: function() {
        this.data.weeks--;
        this.data.actionsLeft = 3;
        
        // --- IMPROVED AI ---
        const playerIsDem = this.data.selectedParty === 'D';
        
        for(let code in this.data.states) {
            let s = this.data.states[code];
            // 1. Natural Drift
            s.poll += (Math.random() * 0.6) - 0.3;

            // 2. Opponent AI Strategy
            let isSwing = (s.poll >= 45 && s.poll <= 55);
            let aiWinning = playerIsDem ? (s.poll < 48) : (s.poll > 52);
            
            // AI targets Swing States or Defends vulnerable base
            let attackChance = 0.1;
            if(isSwing) attackChance = 0.5; // Fight hard for swings
            if(aiWinning && Math.random() > 0.8) attackChance = 0.3; // Shore up base sometimes
            
            if(Math.random() < attackChance) {
                let shift = (Math.random() * 1.2) + 0.2;
                if(playerIsDem) s.poll -= shift; // AI is Rep, lower Dem number
                else s.poll += shift; // AI is Dem, raise Dem number
            }
            
            // Clamp
            if(s.poll > 100) s.poll = 100; if(s.poll < 0) s.poll = 0;
        }

        this.updateHUD();
        this.colorMap();
        if(this.data.selectedState) this.clickState(this.data.selectedState);
        this.showToast("Week Advanced. Polls Updated.");
    },

    /* --- HELPERS --- */
    initIssues: function() {
        const sel = document.getElementById('issue-select');
        if(sel) ISSUES.forEach(i => sel.innerHTML += `<option value="${i.id}">${i.name}</option>`);
    },
    toggleThirdParties: function() {
        this.data.thirdPartiesEnabled = document.getElementById('third-party-toggle').checked;
        document.getElementById('third-party-section').style.opacity = this.data.thirdPartiesEnabled ? "1" : "0.3";
    },
    updateHUD: function() {
        document.getElementById('hud-funds').innerText = `$${this.data.funds.toFixed(1)}M`;
        document.getElementById('action-points').innerText = `${this.data.actionsLeft}/3 LEFT`;
    },
    updateScore: function() {
        let d=0, r=0;
        for(let k in this.data.states) {
            if(this.data.states[k].poll >= 50) d+=this.data.states[k].ev; else r+=this.data.states[k].ev;
        }
        document.getElementById('score-dem').innerText = d;
        document.getElementById('score-rep').innerText = r;
        const dp = (d/538)*100; const rp = (r/538)*100;
        document.getElementById('ev-bar').style.background = `linear-gradient(90deg, #0056b3 ${dp}%, #333 ${dp}%, #333 ${100-rp}%, #d32f2f ${100-rp}%)`;
    },
    initMap: function() {
        for(let code in this.data.states) {
            let path = document.getElementById(code);
            if(path) {
                path.onclick = () => this.clickState(code);
                path.onmousemove = (e) => this.showTooltip(e, code);
                path.onmouseleave = () => document.getElementById('map-tooltip').style.display='none';
            }
        }
        this.colorMap();
    },
    colorMap: function() {
        for(let code in this.data.states) {
            const s = this.data.states[code];
            const p = document.getElementById(code);
            if(p) {
                let fill = "#64748b"; // Tossup
                if(s.poll > 53) fill = "#0056b3";
                else if(s.poll > 50) fill = "#4fa1ff";
                else if(s.poll < 47) fill = "#d32f2f";
                else if(s.poll <= 50) fill = "#ff6b6b";
                p.style.fill = fill;
            }
        }
        this.updateScore();
    },
    clickState: function(code) {
        this.data.selectedState = code;
        const s = this.data.states[code];
        document.getElementById('state-panel').classList.remove('hidden');
        document.getElementById('empty-msg').classList.add('hidden');
        
        document.getElementById('sp-name').innerText = s.name;
        document.getElementById('sp-ev').innerText = s.ev + " EV";
        
        // Bars
        document.getElementById('poll-dem-bar').style.width = s.poll + "%";
        document.getElementById('poll-rep-bar').style.width = (100-s.poll) + "%";
        document.getElementById('poll-dem-val').innerText = s.poll.toFixed(1) + "%";
        document.getElementById('poll-rep-val').innerText = (100-s.poll).toFixed(1) + "%";
        
        // Issues
        const list = document.getElementById('sp-issues-list');
        list.innerHTML = "";
        ISSUES.sort((a,b) => s.priorities[b.id] - s.priorities[a.id]).slice(0,3).forEach(x => {
            list.innerHTML += `<div style="display:flex; justify-content:space-between; border-bottom:1px solid #333; padding:2px;"><span>${x.name}</span><span style="color:gold">${s.priorities[x.id]}/10</span></div>`;
        });
    },
    runStateAd: function() {
        if(this.data.actionsLeft <= 0) return this.showToast("No actions left!");
        if(this.data.funds < 0.5) return this.showToast("Need $500k!");
        this.data.funds -= 0.5; this.data.actionsLeft--;
        const s = this.data.states[this.data.selectedState];
        const boost = (Math.random() * 1.5) + 0.5;
        if(this.data.selectedParty === 'D') s.poll += boost; else s.poll -= boost;
        if(s.poll > 100) s.poll = 100; if(s.poll < 0) s.poll = 0;
        this.log(`Ad Blitz in ${s.name}.`);
        this.updateHUD(); this.colorMap(); this.clickState(this.data.selectedState);
    },
    runNationalAd: function() {
        if(this.data.actionsLeft <= 0) return this.showToast("No actions left!");
        if(this.data.funds < 2.5) return this.showToast("Need $2.5M!");
        this.data.funds -= 2.5; this.data.actionsLeft--;
        for(let code in this.data.states) {
            const boost = (Math.random() * 0.5); 
            if(this.data.selectedParty === 'D') this.data.states[code].poll += boost; else this.data.states[code].poll -= boost;
        }
        this.log("National Ad Buy.");
        this.updateHUD(); this.colorMap(); if(this.data.selectedState) this.clickState(this.data.selectedState);
    },
    showTooltip: function(e, code) {
        const tt = document.getElementById('map-tooltip');
        const s = this.data.states[code];
        tt.innerHTML = `<h4>${s.name}</h4><div>D: ${s.poll.toFixed(1)}%</div><div>R: ${(100-s.poll).toFixed(1)}%</div>`;
        tt.style.display='block'; tt.style.left=(e.clientX+15)+'px'; tt.style.top=(e.clientY+15)+'px';
    },
    log: function(msg) {
        const feed = document.getElementById('log-content');
        if(feed) { const div = document.createElement('div'); div.className = "log-entry"; div.innerText = `> ${msg}`; feed.prepend(div); }
    },
    showToast: function(msg) {
        const t = document.getElementById('toast');
        t.innerText = msg; t.style.opacity = 1; setTimeout(() => t.style.opacity = 0, 2000);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
