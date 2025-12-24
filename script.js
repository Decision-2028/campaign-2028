/* --- CONFIGURATION --- */
const PARTIES = {
    D: { name: "Democratic", color: "#00AEF3", img: "images/harrison.jpg", desc: "The liberal party, focused on social equality, environmental protection, and a mixed economy." },
    R: { name: "Republican", color: "#E81B23", img: "images/whatley.jpg", desc: "The conservative party, focused on deregulation, traditional values, and strong national defense." },
    I: { name: "Independent", color: "#F2C75C", img: "images/scenario.jpg", desc: "A coalition of centrist and anti-establishment voters seeking electoral reform." },
    G: { name: "Green", color: "#198754", img: "images/scenario.jpg", desc: "Focused on environmentalism, nonviolence, and social justice." },
    L: { name: "Libertarian", color: "#fd7e14", img: "images/scenario.jpg", desc: "Focused on civil liberties, non-interventionism, and laissez-faire capitalism." }
};

const CANDIDATES = [
    // Democrats
    { id: "harris", name: "Kamala Harris", party: "D", desc: "Incumbent VP. Establishing continuity.", funds: 60, img: "images/harris.jpg", buff: "Incumbent Advantage" },
    { id: "newsom", name: "Gavin Newsom", party: "D", desc: "CA Governor. High charisma & funding.", funds: 75, img: "images/newsom.jpg", buff: "Fundraising Machine" },
    { id: "whitmer", name: "Gretchen Whitmer", party: "D", desc: "MI Governor. Strong Rust Belt appeal.", funds: 55, img: "images/whitmer.jpg", buff: "Rust Belt Appeal" },
    { id: "shapiro", name: "Josh Shapiro", party: "D", desc: "PA Governor. Popular in swing states.", funds: 50, img: "images/shapiro.jpg", buff: "Swing State King" },
    { id: "buttigieg", name: "Pete Buttigieg", party: "D", desc: "Transportation Sec. Media darling.", funds: 55, img: "images/buttigieg.jpg", buff: "Media Savvy" },
    { id: "aoc", name: "AOC", party: "D", desc: "Progressive firebrand.", funds: 40, img: "images/aoc.jpg", buff: "Grassroots Army" },

    // Republicans
    { id: "desantis", name: "Ron DeSantis", party: "R", desc: "FL Governor. Culture warrior.", funds: 65, img: "images/desantis.jpg", buff: "Culture Warrior" },
    { id: "vance", name: "JD Vance", party: "R", desc: "OH Senator. Populist appeal.", funds: 50, img: "images/vance.jpg", buff: "Populist Appeal" },
    { id: "haley", name: "Nikki Haley", party: "R", desc: "Former UN Amb. Suburban appeal.", funds: 55, img: "images/haley.jpg", buff: "Suburban Appeal" },
    { id: "ramaswamy", name: "Vivek Ramaswamy", party: "R", desc: "Tech Entrepreneur. Outsider energy.", funds: 70, img: "images/ramaswamy.jpg", buff: "Outsider Energy" },

    // Independents / Third Parties
    { id: "yang", name: "Andrew Yang", party: "I", desc: "Forward Party. Tech innovator.", funds: 40, img: "images/yang.jpg", buff: "UBI Appeal" },
    { id: "stein", name: "Jill Stein", party: "G", desc: "Green Party. Environmentalist.", funds: 10, img: "images/scenario.jpg", buff: "Eco-Warrior" }, // Placeholder img
    { id: "oliver", name: "Chase Oliver", party: "L", desc: "Libertarian. Liberty first.", funds: 10, img: "images/scenario.jpg", buff: "Liberty" } // Placeholder img
];

const VPS = [
    { id: "shapiro", name: "Josh Shapiro", party: "D", state: "PA", desc: "Popular swing state governor.", img: "images/shapiro.jpg" },
    { id: "kelly", name: "Mark Kelly", party: "D", state: "AZ", desc: "Astronaut & Senator.", img: "images/scenario.jpg" }, 
    { id: "cooper", name: "Roy Cooper", party: "D", state: "NC", desc: "Moderate southern appeal.", img: "images/scenario.jpg" },
    { id: "rubio", name: "Marco Rubio", party: "R", state: "FL", desc: "Establishment bridge.", img: "images/scenario.jpg" },
    { id: "stefanik", name: "Elise Stefanik", party: "R", state: "NY", desc: "Strong aggressive campaigner.", img: "images/scenario.jpg" },
    { id: "tulsi", name: "Tulsi Gabbard", party: "I", state: "HI", desc: "Anti-war populist.", img: "images/scenario.jpg" }
];

// ... (KEEP INIT_STATES and ISSUES as they are) ...

/* --- APP LOGIC --- */
const app = {
    data: { 
        selectedParty: null, candidate: null, vp: null, opponent: null,
        thirdPartiesEnabled: true, funds: 0, weeks: 14, actionsLeft: 3, 
        states: {}, selectedState: null, turnLog: []
    },

    init: function() {
        this.data.states = JSON.parse(JSON.stringify(INIT_STATES));
        
        // Initialize State Data
        for(let s in this.data.states) {
            this.data.states[s].moe = (Math.random() * 2 + 2).toFixed(1);
            this.data.states[s].priorities = {};
            // Initialize Third Party Baselines based on regions
            this.data.states[s].greenShare = 0;
            this.data.states[s].libShare = 0;
            
            // Regional Bonus for Green
            if(['CA','OR','WA','VT','NY'].includes(s)) this.data.states[s].greenShare = 3.5;
            else this.data.states[s].greenShare = 1.0;

            // Regional Bonus for Libertarian
            if(['NH','MT','AK','NM','NV'].includes(s)) this.data.states[s].libShare = 4.0;
            else this.data.states[s].libShare = 1.5;
        }
        
        this.renderParties();
        // this.initIssues(); // Ensure ISSUES array exists before calling
    },

    goToScreen: function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    /* --- PARTY SELECTION (FIXED) --- */
    renderParties: function() {
        const container = document.getElementById('party-cards');
        if(!container) return;
        container.innerHTML = "";
        
        // Only show D, R, I for player selection
        ['D', 'R', 'I'].forEach(key => {
            const p = PARTIES[key];
            const el = document.createElement('div');
            el.className = "card card-party";
            // Uses background image for the card
            el.style.backgroundImage = `url('${p.img}')`;
            el.style.borderTop = `5px solid ${p.color}`;
            
            el.innerHTML = `
                <div class="party-overlay">
                    <h3>${p.name} Party</h3>
                    <div class="party-desc">${p.desc}</div>
                </div>
            `;
            el.onclick = () => {
                this.data.selectedParty = key;
                this.renderCandidates(key);
                this.goToScreen('candidate-screen');
            };
            container.appendChild(el);
        });
    },

    /* --- CANDIDATE SELECTION (FIXED) --- */
    renderCandidates: function(partyKey) {
        const container = document.getElementById('candidate-cards');
        container.innerHTML = "";
        const filtered = CANDIDATES.filter(c => c.party === partyKey);
        
        filtered.forEach(c => {
            const el = document.createElement('div');
            el.className = 'card';
            const imgHTML = c.img ? `<img src="${c.img}">` : "";
            el.innerHTML = `
                <div class="portrait">${imgHTML}</div>
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

    /* --- VP SELECTION (FIXED IMAGES) --- */
    renderVPs: function(partyKey) {
        const container = document.getElementById('vp-cards');
        container.innerHTML = "";
        const filtered = VPS.filter(v => v.party === partyKey);
        
        if(filtered.length === 0) {
             container.innerHTML = "<div class='card' onclick='app.renderOpponentSelection(); app.goToScreen(\"opponent-screen\")'><h3>CONTINUE WITHOUT VP</h3></div>";
             return;
        }

        filtered.forEach(v => {
            const el = document.createElement('div');
            el.className = 'card';
            const imgHTML = v.img ? `<img src="${v.img}">` : "";
            el.innerHTML = `
                <div class="portrait">${imgHTML}</div>
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

    /* --- OPPONENT SELECTION --- */
    renderOpponentSelection: function() {
        const majorContainer = document.getElementById('opponent-cards-major');
        const minorContainer = document.getElementById('opponent-cards-minor');
        if(!majorContainer) return;
        
        majorContainer.innerHTML = "";
        minorContainer.innerHTML = "";

        // Determine Rivals
        let rivalParty = (this.data.selectedParty === 'D') ? 'R' : 'D';
        if (this.data.selectedParty === 'I') rivalParty = 'D'; 

        // Major
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

        // Third Parties (Green & Libertarian)
        CANDIDATES.filter(c => c.party === 'G' || c.party === 'L').forEach(c => {
            const el = document.createElement('div');
            el.className = 'card';
            el.style.transform = "scale(0.9)";
            el.innerHTML = `
                <div class="card-info" style="border-top:3px solid ${PARTIES[c.party].color}">
                    <h3>${c.name}</h3>
                    <p>${PARTIES[c.party].name}</p>
                </div>
            `;
            minorContainer.appendChild(el);
        });
    },

    toggleThirdParties: function() {
        this.data.thirdPartiesEnabled = document.getElementById('third-party-toggle').checked;
        document.getElementById('third-party-section').style.opacity = this.data.thirdPartiesEnabled ? "1" : "0.3";
    },

    /* --- GAME START & HUD --- */
    startGame: function() {
        this.data.funds = this.data.candidate.funds;
        this.goToScreen('game-screen');
        
        const img = document.getElementById('hud-img');
        if(this.data.candidate.img) { img.src = this.data.candidate.img; img.style.display = "block"; }
        
        const pKey = this.data.selectedParty;
        
        // 1. Text Colors
        const partyNameElem = document.getElementById('hud-party-name');
        partyNameElem.innerText = PARTIES[pKey].name.toUpperCase() + " NOMINEE";
        partyNameElem.className = `cand-party text-${pKey}`; // Apply Color Class
        
        document.getElementById('hud-cand-name').innerText = this.data.candidate.name.toUpperCase();
        
        // 2. Initialize Vote Shares (Spoiler Effect)
        if(this.data.thirdPartiesEnabled) {
            for(let s in this.data.states) {
                // Subtract 3rd party shares from Major parties
                // Simple logic: Split the spoiler damage between D and R
                let totalSpoiler = this.data.states[s].greenShare + this.data.states[s].libShare;
                // Green hurts D more, Lib hurts R more
                let dDamage = this.data.states[s].greenShare * 0.8 + this.data.states[s].libShare * 0.2;
                // For simplicity in a 2-party view, we adjust the 'poll' (D share)
                // If D loses votes, poll goes down.
                this.data.states[s].poll -= dDamage;
            }
            this.log("Third parties entered. Polls adjusted.");
        }

        this.updateHUD();
        this.initMap();
        this.log(`Campaign started vs ${this.data.opponent ? this.data.opponent.name : 'Opponent'}.`);
    },

    /* --- INTELLIGENT AI & LOG --- */
    nextWeek: function() {
        this.data.weeks--;
        this.data.actionsLeft = 3;
        
        // Smart Opponent AI
        for(let code in this.data.states) {
            const s = this.data.states[code];
            let drift = (Math.random() * 0.6) - 0.3; // Natural drift
            s.poll += drift;

            if(this.data.opponent) {
                // AI Logic:
                // 1. Attack Swing States (45-55)
                // 2. Protect Base if slipping (<55 for them)
                
                let isSwing = (s.poll > 45 && s.poll < 55);
                let isOpponentLeading = (this.data.selectedParty === 'D' && s.poll < 50) || (this.data.selectedParty === 'R' && s.poll > 50);
                
                // Aggressiveness factor
                let attackChance = isSwing ? 0.6 : 0.2;
                
                if(Math.random() < attackChance) {
                    let impact = (Math.random() * 1.5) + 0.5;
                    // Apply impact against player
                    if(this.data.selectedParty === 'D') s.poll -= impact;
                    else s.poll += impact;
                    
                    // Only log significant moves in swing states to avoid spam
                    if(isSwing && impact > 1.0) {
                        // this.log(`Opponent attacked ${s.name}!`); // Optional spam
                    }
                }
            }
            
            // Clamp
            if(s.poll > 100) s.poll = 100; if(s.poll < 0) s.poll = 0;
        }

        this.updateHUD();
        this.colorMap();
        if(this.data.selectedState) this.clickState(this.data.selectedState);
        this.showToast("Week Advanced.");
        this.log("New polling data released.");
    },

    log: function(msg) {
        const feed = document.getElementById('log-content');
        if(feed) {
            const div = document.createElement('div');
            div.className = "log-entry";
            div.innerText = `> ${msg}`;
            feed.prepend(div); // Add to top
        }
    },

    /* --- STANDARD MAP FUNCTIONS (Keep existing clickState, colorMap, etc) --- */
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
        
        const dVal = s.poll.toFixed(1); const rVal = (100 - s.poll).toFixed(1);
        document.getElementById('poll-dem-bar').style.width = dVal + "%";
        document.getElementById('poll-rep-bar').style.width = rVal + "%";
        document.getElementById('poll-dem-val').innerText = dVal + "%";
        document.getElementById('poll-rep-val').innerText = rVal + "%";
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

    showToast: function(msg) {
        const t = document.getElementById('toast');
        t.innerText = msg; t.style.opacity = 1; setTimeout(() => t.style.opacity = 0, 2000);
    },
    
    // Placeholder for Run Ad functions (ensure these exist in your file)
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
    
    toggleThirdParties: function() { /* Handled in startGame */ }
};

document.addEventListener('DOMContentLoaded', () => app.init());
