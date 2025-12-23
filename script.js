/* --- CONFIGURATION --- */
// ... (PARTIES and VPS arrays remain the same as your file) ...

const CANDIDATES = [
    // DEMOCRATS
    { id: "harris", name: "Kamala Harris", party: "D", desc: "Incumbent VP.", funds: 60, img: "images/harris.jpg", buff: "Incumbent Advantage" },
    { id: "newsom", name: "Gavin Newsom", party: "D", desc: "CA Governor.", funds: 75, img: "images/newsom.jpg", buff: "Fundraising Machine" },
    { id: "whitmer", name: "Gretchen Whitmer", party: "D", desc: "MI Governor.", funds: 55, img: "images/whitmer.jpg", buff: "Rust Belt Appeal" },
    { id: "shapiro", name: "Josh Shapiro", party: "D", desc: "PA Governor.", funds: 50, img: "images/shapiro.jpg", buff: "Swing State King" },
    // REPUBLICANS
    { id: "desantis", name: "Ron DeSantis", party: "R", desc: "FL Governor.", funds: 65, img: "images/desantis.jpg", buff: "Culture Warrior" },
    { id: "vance", name: "JD Vance", party: "R", desc: "OH Senator.", funds: 50, img: "images/vance.jpg", buff: "Populist Appeal" },
    { id: "haley", name: "Nikki Haley", party: "R", desc: "Former UN Amb.", funds: 55, img: "images/haley.jpg", buff: "Suburban Appeal" },
    { id: "ramaswamy", name: "Vivek Ramaswamy", party: "R", desc: "Entrepreneur.", funds: 70, img: "images/ramaswamy.jpg", buff: "Outsider Energy" },
    // INDEPENDENT
    { id: "yang", name: "Andrew Yang", party: "I", desc: "Forward Party.", funds: 40, img: "images/yang.jpg", buff: "Tech Innovator" },
    // GREEN
    { id: "stein", name: "Jill Stein", party: "G", desc: "Green Party.", funds: 10, img: "", buff: "Activist Base" },
    { id: "west", name: "Cornel West", party: "G", desc: "Philosopher.", funds: 15, img: "", buff: "Intellectual" },
    { id: "hawkins", name: "Howie Hawkins", party: "G", desc: "Eco-Socialist.", funds: 8, img: "", buff: "Grassroots" },
    // LIBERTARIAN
    { id: "oliver", name: "Chase Oliver", party: "L", desc: "Libertarian.", funds: 12, img: "", buff: "Youth Appeal" },
    { id: "mapstead", name: "Lars Mapstead", party: "L", desc: "Tech CEO.", funds: 20, img: "", buff: "Self-Funded" },
    { id: "termaat", name: "Mike ter Maat", party: "L", desc: "Economist.", funds: 10, img: "", buff: "Policy Wonk" }
];

// ... (INIT_STATES and ISSUES remain the same) ...

/* --- APP LOGIC --- */
const app = {
    data: { 
        selectedParty: null,
        candidate: null, 
        vp: null,
        opponent: null,
        thirdPartiesEnabled: true,
        funds: 0, 
        weeks: 14, 
        actionsLeft: 3, 
        states: {}, 
        selectedState: null 
    },

    init: function() {
        this.data.states = JSON.parse(JSON.stringify(INIT_STATES));
        for(let s in this.data.states) {
            this.data.states[s].moe = (Math.random() * 2 + 2).toFixed(1);
            this.data.states[s].priorities = {};
            ISSUES.forEach(i => this.data.states[s].priorities[i.id] = Math.floor(Math.random()*10)+1);
        }
        
        this.renderParties();
        this.initIssues();
    },

    goToScreen: function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    renderParties: function() {
        const container = document.getElementById('party-cards');
        if(!container) return;
        container.innerHTML = "";
        
        for(let key in PARTIES) {
            if(key === 'G' || key === 'L') continue; // Only show major parties + Indep for player selection
            const p = PARTIES[key];
            const el = document.createElement('div');
            el.className = "card";
            el.innerHTML = `<div class="card-info" style="border-top: 5px solid ${p.color}; padding-top:20px;"><h3>${p.name} Party</h3><p>${p.desc}</p></div>`;
            el.onclick = () => {
                this.data.selectedParty = key;
                this.renderCandidates(key);
                this.goToScreen('candidate-screen');
            };
            container.appendChild(el);
        }
    },

    renderCandidates: function(partyKey) {
        const container = document.getElementById('candidate-cards');
        container.innerHTML = "";
        const filtered = CANDIDATES.filter(c => c.party === partyKey);
        
        filtered.forEach(c => {
            const el = document.createElement('div');
            el.className = 'card';
            const imgHTML = c.img ? `<img src="${c.img}">` : "";
            el.innerHTML = `<div class="portrait">${imgHTML}<div class="portrait-placeholder">${c.name.charAt(0)}</div></div><div class="card-info"><h3>${c.name}</h3><p>${c.desc}</p><p class="buff-text">${c.buff}</p><p style="color:#4ade80">Funds: $${c.funds}M</p></div>`;
            el.onclick = () => {
                this.data.candidate = c;
                this.renderVPs(c.party);
                this.goToScreen('vp-screen');
            };
            container.appendChild(el);
        });
    },

    renderVPs: function(partyKey) {
        const container = document.getElementById('vp-cards');
        container.innerHTML = "";
        const filtered = VPS.filter(v => v.party === partyKey);
        
        filtered.forEach(v => {
            const el = document.createElement('div');
            el.className = 'card';
            el.innerHTML = `<div class="card-info"><h3>${v.name}</h3><p>Home: ${v.state}</p><p>${v.desc}</p></div>`;
            el.onclick = () => {
                this.data.vp = v;
                this.renderOpponentSelection();
                this.goToScreen('opponent-screen');
            };
            container.appendChild(el);
        });
    },

    /* --- OPPONENT LOGIC --- */
    toggleThirdParties: function() {
        this.data.thirdPartiesEnabled = document.getElementById('third-party-toggle').checked;
        document.getElementById('third-party-section').style.opacity = this.data.thirdPartiesEnabled ? "1" : "0.3";
    },

    renderOpponentSelection: function() {
        const majorContainer = document.getElementById('opponent-cards-major');
        const minorContainer = document.getElementById('opponent-cards-minor');
        majorContainer.innerHTML = "";
        minorContainer.innerHTML = "";

        // Determine Major Rival
        let rivalParty = (this.data.selectedParty === 'D') ? 'R' : 'D';
        if (this.data.selectedParty === 'I') rivalParty = 'D'; // Independents fight incumbent D

        // Render Major Opponents
        CANDIDATES.filter(c => c.party === rivalParty).forEach(c => {
            const el = document.createElement('div');
            el.className = 'card';
            const imgHTML = c.img ? `<img src="${c.img}">` : "";
            el.innerHTML = `<div class="portrait">${imgHTML}</div><div class="card-info"><h3>${c.name}</h3><p>${c.desc}</p></div>`;
            el.onclick = () => {
                this.data.opponent = c;
                this.startGame();
            };
            majorContainer.appendChild(el);
        });

        // Render Third Parties
        CANDIDATES.filter(c => ['G', 'L', 'I'].includes(c.party) && c.id !== this.data.candidate.id).forEach(c => {
            const el = document.createElement('div');
            el.className = 'card';
            el.style.transform = "scale(0.9)";
            el.innerHTML = `<div class="card-info" style="border-top:3px solid ${PARTIES[c.party].color}"><h3>${c.name}</h3><p>${PARTIES[c.party].name}</p></div>`;
            minorContainer.appendChild(el);
        });
    },

    initIssues: function() {
        const sel = document.getElementById('issue-select');
        ISSUES.forEach(i => sel.innerHTML += `<option value="${i.id}">${i.name}</option>`);
    },

    startGame: function() {
        this.data.funds = this.data.candidate.funds;
        this.goToScreen('game-screen');
        
        const img = document.getElementById('hud-img');
        if(this.data.candidate.img) { img.src = this.data.candidate.img; img.style.display = "block"; }
        
        const pKey = this.data.selectedParty;
        img.className = `hud-border-${pKey}`; 
        document.getElementById('hud-cand-name').innerText = this.data.candidate.name.toUpperCase();
        document.getElementById('hud-party-name').innerText = PARTIES[pKey].name.toUpperCase() + " NOMINEE";
        
        // VP Buff
        if(this.data.vp && this.data.states[this.data.vp.state]) {
            if(pKey === 'D') this.data.states[this.data.vp.state].poll += 5;
            else this.data.states[this.data.vp.state].poll -= 5;
        }

        // Spoiler Effect
        if(this.data.thirdPartiesEnabled) {
            for(let s in this.data.states) {
                // Randomly hurts D or R based on state
                let spoiler = (Math.random() * 4) + 1; 
                if(Math.random() > 0.5) this.data.states[s].poll -= spoiler; else this.data.states[s].poll += spoiler;
            }
        }

        this.updateHUD();
        this.initMap();
        this.log(`Campaign vs ${this.data.opponent ? this.data.opponent.name : 'Opponent'} started.`);
    },

    /* --- MAP & GAME LOOP --- */
    initMap: function() {
        for(let code in this.data.states) {
            let path = document.getElementById(code);
            if(path) {
                path.onclick = () => this.clickState(code);
                path.style.cursor = "pointer";
                path.style.transition = "fill 0.2s";
            }
        }
        this.colorMap();
    },

    colorMap: function() {
        for(let code in this.data.states) {
            const s = this.data.states[code];
            const p = document.getElementById(code);
            if(!p) continue;
            let fill;
            if(s.poll > 55) fill = "#0056b3"; else if(s.poll > 50) fill = "#4fa1ff"; else if(s.poll > 45) fill = "#ff6b6b"; else fill = "#d32f2f";
            if(s.poll >= 48 && s.poll <= 52) fill = "#64748b";
            p.style.fill = fill;
            p.style.stroke = "white"; p.style.strokeWidth = "1";
        }
        this.updateScore();
    },

    clickState: function(code) {
        this.data.selectedState = code;
        const s = this.data.states[code];
        document.getElementById('empty-msg').classList.add('hidden');
        document.getElementById('state-panel').classList.remove('hidden');
        document.getElementById('sp-name').innerText = s.name;
        document.getElementById('sp-ev').innerText = s.ev + " EV";
        document.getElementById('sp-moe').innerText = `MOE: ±${s.moe}%`;
        const dVal = s.poll.toFixed(1); const rVal = (100 - s.poll).toFixed(1);
        document.getElementById('poll-dem-bar').style.width = dVal + "%";
        document.getElementById('poll-rep-bar').style.width = rVal + "%";
        document.getElementById('poll-dem-val').innerText = dVal + "%";
        document.getElementById('poll-rep-val').innerText = rVal + "%";
        const list = document.getElementById('sp-issues-list');
        list.innerHTML = '';
        ISSUES.sort((a,b) => s.priorities[b.id] - s.priorities[a.id]).slice(0,3).forEach(x => {
            list.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:5px; font-size:0.8rem; border-bottom:1px solid #333;"><span>${x.name}</span><span style="color:#ffd700">${s.priorities[x.id]}/10</span></div>`;
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

    nextWeek: function() {
        this.data.weeks--; this.data.actionsLeft = 3;
        for(let code in this.data.states) {
            let drift = (Math.random() * 1.0) - 0.5; 
            this.data.states[code].poll += drift;
            if(this.data.opponent) {
                if(this.data.selectedParty === 'D' && Math.random() > 0.8) this.data.states[code].poll -= 1.2; 
                else if(this.data.selectedParty === 'R' && Math.random() > 0.8) this.data.states[code].poll += 1.2;
            }
        }
        this.updateHUD(); this.colorMap(); if(this.data.selectedState) this.clickState(this.data.selectedState);
        this.showToast("Week Advanced.");
    },

    updateHUD: function() {
        document.getElementById('hud-funds').innerText = `$${this.data.funds.toFixed(1)}M`;
        document.getElementById('action-points').innerText = `${this.data.actionsLeft}/3 LEFT`;
    },

    updateScore: function() {
        let dem = 0, rep = 0;
        for(let code in this.data.states) {
            if(this.data.states[code].poll >= 50) dem += this.data.states[code].ev; else rep += this.data.states[code].ev;
        }
        document.getElementById('score-dem').innerText = dem;
        document.getElementById('score-rep').innerText = rep;
        const demPct = (dem / 538) * 100; const repPct = (rep / 538) * 100;
        document.getElementById('ev-bar').style.background = `linear-gradient(90deg, #0056b3 ${demPct}%, #333 ${demPct}%, #333 ${100-repPct}%, #d32f2f ${100-repPct}%)`;
    },

    log: function(msg) {
        const feed = document.getElementById('log-content');
        feed.innerHTML = `<div class="log-entry">${msg}</div>` + feed.innerHTML;
    },

    showToast: function(msg) {
        const t = document.getElementById('toast');
        t.innerText = msg; t.style.opacity = 1; setTimeout(() => t.style.opacity = 0, 2000);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
