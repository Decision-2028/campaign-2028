/* --- CONFIGURATION --- */
const PARTIES = {
    D: { name: "Democratic", color: "#0056b3", desc: "Liberal platform." },
    R: { name: "Republican", color: "#d32f2f", desc: "Conservative platform." },
    I: { name: "Independent", color: "#d4a017", desc: "Centrist/Populist." },
    G: { name: "Green", color: "#198754", desc: "Environmentalist/Left." },
    L: { name: "Libertarian", color: "#fd7e14", desc: "Liberty/Small Gov." }
};

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
    { id: "rfk", name: "RFK Jr.", party: "I", desc: "Independent.", funds: 45, img: "", buff: "Name Recognition" },
    // GREEN
    { id: "stein", name: "Jill Stein", party: "G", desc: "Green Party.", funds: 10, img: "", buff: "Activist Base" },
    { id: "west", name: "Cornel West", party: "G", desc: "Philosopher.", funds: 15, img: "", buff: "Intellectual Appeal" },
    { id: "hawkins", name: "Howie Hawkins", party: "G", desc: "Eco-Socialist.", funds: 8, img: "", buff: "Grassroots" },
    // LIBERTARIAN
    { id: "oliver", name: "Chase Oliver", party: "L", desc: "Libertarian.", funds: 12, img: "", buff: "Youth Appeal" },
    { id: "mapstead", name: "Lars Mapstead", party: "L", desc: "Tech CEO.", funds: 20, img: "", buff: "Self-Funded" },
    { id: "termaat", name: "Mike ter Maat", party: "L", desc: "Economist.", funds: 10, img: "", buff: "Policy Wonk" }
];

const VPS = [
    { id: "shapiro", name: "Josh Shapiro", party: "D", state: "PA", desc: "Popular swing state governor." },
    { id: "kelly", name: "Mark Kelly", party: "D", state: "AZ", desc: "Astronaut & Senator." },
    { id: "cooper", name: "Roy Cooper", party: "D", state: "NC", desc: "Moderate southern appeal." },
    { id: "rubio", name: "Marco Rubio", party: "R", state: "FL", desc: "Establishment bridge." },
    { id: "stefanik", name: "Elise Stefanik", party: "R", state: "NY", desc: "Strong aggressive campaigner." },
    { id: "tulsi", name: "Tulsi Gabbard", party: "I", state: "HI", desc: "Anti-war populist." }
];

// ... KEEP INIT_STATES AND ISSUES ARRAYS AS THEY WERE ... 
// (I am omitting them here to save space, but DO NOT DELETE THEM from your file)

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
        console.log("App Initializing...");
        // Deep copy state data
        this.data.states = JSON.parse(JSON.stringify(INIT_STATES));
        
        // Add random flavor data
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

    /* --- 1. PARTY & CANDIDATE SELECTION --- */
    renderParties: function() {
        const container = document.getElementById('party-cards');
        if(!container) return;
        container.innerHTML = "";
        
        for(let key in PARTIES) {
            const p = PARTIES[key];
            const el = document.createElement('div');
            el.className = "card";
            el.innerHTML = `
                <div class="card-info" style="border-top: 5px solid ${p.color}; padding-top:20px;">
                    <h3>${p.name} Party</h3>
                    <p>${p.desc}</p>
                </div>
            `;
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
        
        if(filtered.length === 0) { container.innerHTML = "<p>No candidates available.</p>"; return; }

        filtered.forEach(c => {
            const el = document.createElement('div');
            el.className = 'card';
            const imgHTML = c.img ? `<img src="${c.img}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : "";
            el.innerHTML = `
                <div class="portrait">
                    ${imgHTML}
                    <div class="portrait-placeholder" ${imgHTML ? 'style="display:none"' : ''}>${c.name.charAt(0)}</div>
                </div>
                <div class="card-info">
                    <h3>${c.name}</h3>
                    <p>${c.desc}</p>
                    <p class="buff-text">${c.buff}</p>
                    <p style="color:#4ade80">Funds: $${c.funds}M</p>
                </div>
            `;
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
        
        // Allow choosing from pool if party has no specific VPs
        if(filtered.length === 0 && (partyKey === 'G' || partyKey === 'L')) {
             container.innerHTML = "<p>VP will be auto-selected.</p>";
             // Auto-advance logic could go here, but for now let's just make a generic button
             const btn = document.createElement('button');
             btn.className = "start-btn";
             btn.innerText = "CONTINUE WITHOUT VP";
             btn.onclick = () => { this.renderOpponentSelection(); this.goToScreen('opponent-screen'); };
             container.appendChild(btn);
             return;
        }

        filtered.forEach(v => {
            const el = document.createElement('div');
            el.className = 'card';
            el.innerHTML = `
                <div class="card-info">
                    <h3>${v.name}</h3>
                    <p>Home: ${v.state}</p>
                    <p>${v.desc}</p>
                </div>
            `;
            el.onclick = () => {
                this.data.vp = v;
                this.renderOpponentSelection();
                this.goToScreen('opponent-screen');
            };
            container.appendChild(el);
        });
    },

    /* --- 2. OPPONENT SELECTION (NEW) --- */
    toggleThirdParties: function() {
        this.data.thirdPartiesEnabled = document.getElementById('third-party-toggle').checked;
        const section = document.getElementById('third-party-section');
        section.style.opacity = this.data.thirdPartiesEnabled ? "1" : "0.3";
    },

    renderOpponentSelection: function() {
        const majorContainer = document.getElementById('opponent-cards-major');
        const minorContainer = document.getElementById('opponent-cards-minor');
        majorContainer.innerHTML = "";
        minorContainer.innerHTML = "";

        // Determine Major Rival Party
        let rivalParty = 'R';
        if (this.data.selectedParty === 'R') rivalParty = 'D';
        if (this.data.selectedParty !== 'D' && this.data.selectedParty !== 'R') rivalParty = 'D'; // Indep/3rd party fights incumbent D?

        // 1. Render Major Opponents
        const majors = CANDIDATES.filter(c => c.party === rivalParty);
        majors.forEach(c => {
            const el = document.createElement('div');
            el.className = 'card';
            const imgHTML = c.img ? `<img src="${c.img}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : "";
            el.innerHTML = `
                <div class="portrait">
                    ${imgHTML}
                    <div class="portrait-placeholder" ${imgHTML ? 'style="display:none"' : ''}>${c.name.charAt(0)}</div>
                </div>
                <div class="card-info">
                    <h3>${c.name}</h3>
                    <p>${c.desc}</p>
                </div>
            `;
            el.onclick = () => {
                this.data.opponent = c;
                this.startGame(); // Opponent selected, start!
            };
            majorContainer.appendChild(el);
        });

        // 2. Render Third Parties (Visual Only/Spoiler context)
        const minors = CANDIDATES.filter(c => ['G', 'L', 'I'].includes(c.party) && c.id !== this.data.candidate.id);
        minors.forEach(c => {
            const el = document.createElement('div');
            el.className = 'card';
            el.style.transform = "scale(0.9)"; // Smaller visual
            el.innerHTML = `
                <div class="card-info" style="border-top:3px solid ${PARTIES[c.party].color}">
                    <h3>${c.name}</h3>
                    <p>${PARTIES[c.party].name}</p>
                </div>
            `;
            minorContainer.appendChild(el);
        });
    },

    /* --- 3. GAME INITIALIZATION --- */
    initIssues: function() {
        const sel = document.getElementById('issue-select');
        ISSUES.forEach(i => sel.innerHTML += `<option value="${i.id}">${i.name}</option>`);
    },

    startGame: function() {
        this.data.funds = this.data.candidate.funds;
        this.goToScreen('game-screen');
        
        // --- 1. SET HUD ---
        const img = document.getElementById('hud-img');
        if(this.data.candidate.img) {
            img.src = this.data.candidate.img;
            img.style.display = "block";
        }
        
        const pKey = this.data.selectedParty;
        img.className = `hud-border-${pKey}`; 
        document.getElementById('hud-cand-name').innerText = this.data.candidate.name.toUpperCase();
        document.getElementById('hud-party-name').innerText = PARTIES[pKey].name.toUpperCase() + " NOMINEE";
        
        // --- 2. APPLY VP BUFF ---
        if(this.data.vp && this.data.states[this.data.vp.state]) {
            // Boost in VP home state
            if(pKey === 'D') this.data.states[this.data.vp.state].poll += 5;
            else this.data.states[this.data.vp.state].poll -= 5;
        }

        // --- 3. APPLY THIRD PARTY SPOILER EFFECT ---
        if(this.data.thirdPartiesEnabled && pKey !== 'G' && pKey !== 'L' && pKey !== 'I') {
            for(let s in this.data.states) {
                // Determine 3rd party share based on state history/randomness
                // Rough sim: 3rd parties take 2-6% of vote. 
                // In this simplified model (0-100 D share), we simply compress the available share.
                // Or, simply shift poll towards 50 (chaos) or random subtraction.
                // Let's effectively "steal" vote share.
                
                let spoiler = (Math.random() * 4) + 1; // 1-5% spoiler
                // If D, spoiler hurts D share. If R, spoiler hurts R share (adds to D poll number).
                // Actually, usually 3rd parties hurt both. 
                // Let's say spoiler reduces the *Margin*.
                // Simpler: Just random chaos.
                if(Math.random() > 0.5) this.data.states[s].poll -= spoiler; // Hurts D
                else this.data.states[s].poll += spoiler; // Hurts R
            }
            this.log("Third parties entered the race. Polling adjusted.");
        }

        // --- 4. START ---
        this.updateHUD();
        this.initMap();
        this.log(`Campaign started vs ${this.data.opponent.name}.`);
    },

    /* --- MAP & GAMEPLAY --- */
    initMap: function() {
        for(let code in this.data.states) {
            let path = document.getElementById(code);
            if(path) {
                path.onclick = () => this.clickState(code);
                path.onmousemove = (e) => this.showTooltip(e, code);
                path.onmouseleave = () => this.hideTooltip();
                path.style.cursor = "pointer";
                path.style.transition = "fill 0.2s, opacity 0.2s";
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
            if(s.poll > 55) fill = "#0056b3";      // Safe Dem
            else if(s.poll > 50) fill = "#4fa1ff"; // Lean Dem
            else if(s.poll > 45) fill = "#ff6b6b"; // Lean Rep
            else fill = "#d32f2f";                 // Safe Rep
            
            if(s.poll >= 48 && s.poll <= 52) fill = "#64748b"; // Tossup

            p.style.fill = fill;
        }
        this.updateScore();
    },

    showTooltip: function(e, code) {
        const tt = document.getElementById('map-tooltip');
        const s = this.data.states[code];
        const dPct = s.poll.toFixed(1);
        const rPct = (100 - s.poll).toFixed(1);
        
        tt.innerHTML = `
            <h4>${s.name}</h4>
            <div class="tip-row"><span style="color:#4fa1ff">DEM</span> <span>${dPct}%</span></div>
            <div class="tip-row"><span style="color:#ff6b6b">REP</span> <span>${rPct}%</span></div>
            <div class="tip-row" style="color:#aaa; font-size:0.75rem; margin-top:5px; border-top:1px solid #444; padding-top:4px;">${s.ev} Electoral Votes</div>
        `;
        tt.style.display = 'block';
        tt.style.left = (e.clientX + 15) + 'px';
        tt.style.top = (e.clientY + 15) + 'px';
    },

    hideTooltip: function() {
        document.getElementById('map-tooltip').style.display = 'none';
    },

    clickState: function(code) {
        this.data.selectedState = code;
        const s = this.data.states[code];
        
        document.getElementById('empty-msg').classList.add('hidden');
        document.getElementById('state-panel').classList.remove('hidden');
        document.getElementById('sp-name').innerText = s.name;
        document.getElementById('sp-ev').innerText = s.ev + " EV";
        document.getElementById('sp-moe').innerText = `MOE: ±${s.moe}%`;

        const dVal = s.poll.toFixed(1);
        const rVal = (100 - s.poll).toFixed(1);
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
        if(this.data.actionsLeft <= 0) return this.showToast("No actions left this week!");
        if(this.data.funds < 0.5) return this.showToast("Insufficient funds ($500k needed)");

        this.data.funds -= 0.5;
        this.data.actionsLeft--;
        
        const s = this.data.states[this.data.selectedState];
        const boost = (Math.random() * 1.5) + 0.5;
        
        if(this.data.selectedParty === 'D') s.poll += boost;
        else if(this.data.selectedParty === 'R') s.poll -= boost;
        
        // Clamp
        if(s.poll > 100) s.poll = 100; if(s.poll < 0) s.poll = 0;

        this.log(`Ad Blitz in ${s.name}.`);
        this.updateHUD();
        this.colorMap();
        this.clickState(this.data.selectedState);
    },

    runNationalAd: function() {
        if(this.data.actionsLeft <= 0) return this.showToast("No actions left!");
        if(this.data.funds < 2.5) return this.showToast("Insufficient funds ($2.5M needed)");

        this.data.funds -= 2.5;
        this.data.actionsLeft--;

        for(let code in this.data.states) {
            const boost = (Math.random() * 0.5); 
            if(this.data.selectedParty === 'D') this.data.states[code].poll += boost;
            else if(this.data.selectedParty === 'R') this.data.states[code].poll -= boost;
        }

        this.log("National Ad Campaign Launched.");
        this.updateHUD();
        this.colorMap();
        if(this.data.selectedState) this.clickState(this.data.selectedState);
    },

    nextWeek: function() {
        this.data.weeks--;
        this.data.actionsLeft = 3;
        
        for(let code in this.data.states) {
            let drift = (Math.random() * 1.0) - 0.5; 
            this.data.states[code].poll += drift;
            
            // Opponent Logic (Undo player progress)
            if(this.data.opponent) {
                if(this.data.selectedParty === 'D' && Math.random() > 0.8) {
                    this.data.states[code].poll -= 1.2; 
                } else if(this.data.selectedParty === 'R' && Math.random() > 0.8) {
                    this.data.states[code].poll += 1.2;
                }
            }
        }

        this.updateHUD();
        this.colorMap();
        if(this.data.selectedState) this.clickState(this.data.selectedState);
        this.showToast("Week Advanced.");
        this.log("New polling data released.");
    },

    updateHUD: function() {
        document.getElementById('hud-funds').innerText = `$${this.data.funds.toFixed(1)}M`;
        document.getElementById('action-points').innerText = `${this.data.actionsLeft}/3 LEFT`;
    },

    updateScore: function() {
        let dem = 0, rep = 0;
        for(let code in this.data.states) {
            const s = this.data.states[code];
            if(s.poll >= 50) dem += s.ev;
            else rep += s.ev;
        }
        document.getElementById('score-dem').innerText = dem;
        document.getElementById('score-rep').innerText = rep;
        
        const total = 538;
        const demPct = (dem / total) * 100;
        const repPct = (rep / total) * 100;
        document.getElementById('ev-bar').style.background = `linear-gradient(90deg, #0056b3 ${demPct}%, #333 ${demPct}%, #333 ${100-repPct}%, #d32f2f ${100-repPct}%)`;
    },

    log: function(msg) {
        const feed = document.getElementById('log-content');
        feed.innerHTML = `<div class="log-entry">${msg}</div>` + feed.innerHTML;
    },

    showToast: function(msg) {
        const t = document.getElementById('toast');
        t.innerText = msg;
        t.style.opacity = 1;
        setTimeout(() => t.style.opacity = 0, 2000);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
