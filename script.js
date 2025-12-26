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

const INIT_STATES = {
    "AL": { name: "Alabama", ev: 9 }, "AK": { name: "Alaska", ev: 3 }, "AZ": { name: "Arizona", ev: 11 },
    "AR": { name: "Arkansas", ev: 6 }, "CA": { name: "California", ev: 54 }, "CO": { name: "Colorado", ev: 10 },
    "CT": { name: "Connecticut", ev: 7 }, "DE": { name: "Delaware", ev: 3 }, "DC": { name: "District of Columbia", ev: 3 },
    "FL": { name: "Florida", ev: 30 }, "GA": { name: "Georgia", ev: 16 }, "HI": { name: "Hawaii", ev: 4 },
    "ID": { name: "Idaho", ev: 4 }, "IL": { name: "Illinois", ev: 19 }, "IN": { name: "Indiana", ev: 11 },
    "IA": { name: "Iowa", ev: 6 }, "KS": { name: "Kansas", ev: 6 }, "KY": { name: "Kentucky", ev: 8 },
    "LA": { name: "Louisiana", ev: 8 }, "ME": { name: "Maine", ev: 4 }, "MD": { name: "Maryland", ev: 10 },
    "MA": { name: "Massachusetts", ev: 11 }, "MI": { name: "Michigan", ev: 15 }, "MN": { name: "Minnesota", ev: 10 },
    "MS": { name: "Mississippi", ev: 6 }, "MO": { name: "Missouri", ev: 10 }, "MT": { name: "Montana", ev: 4 },
    "NE": { name: "Nebraska", ev: 5 }, "NV": { name: "Nevada", ev: 6 }, "NH": { name: "New Hampshire", ev: 4 },
    "NJ": { name: "New Jersey", ev: 14 }, "NM": { name: "New Mexico", ev: 5 }, "NY": { name: "New York", ev: 28 },
    "NC": { name: "North Carolina", ev: 16 }, "ND": { name: "North Dakota", ev: 3 }, "OH": { name: "Ohio", ev: 17 },
    "OK": { name: "Oklahoma", ev: 7 }, "OR": { name: "Oregon", ev: 8 }, "PA": { name: "Pennsylvania", ev: 19 },
    "RI": { name: "Rhode Island", ev: 4 }, "SC": { name: "South Carolina", ev: 9 }, "SD": { name: "South Dakota", ev: 3 },
    "TN": { name: "Tennessee", ev: 11 }, "TX": { name: "Texas", ev: 40 }, "UT": { name: "Utah", ev: 6 },
    "VT": { name: "Vermont", ev: 3 }, "VA": { name: "Virginia", ev: 13 }, "WA": { name: "Washington", ev: 12 },
    "WV": { name: "West Virginia", ev: 4 }, "WI": { name: "Wisconsin", ev: 10 }, "WY": { name: "Wyoming", ev: 3 }
};

/* --- CIV & COUNTY ENGINE --- */
class County {
    constructor(id, name, stateName, baseG, baseL) {
        this.id = id;
        this.name = name || id;
        
        // --- 1. DETERMINE TYPE BY NAME HINTS ---
        // (Procedural fallback if no name match)
        const n = this.name.toLowerCase();
        const rand = Math.random();
        
        if (n.includes('city') || n.includes('milwaukee') || n.includes('cook') || n.includes('angeles') || n.includes('york')) {
            this.type = 'Urban';
        } else if (n.includes('suburb') || rand > 0.7) {
            this.type = 'Suburb';
        } else {
            this.type = 'Rural';
        }

        // --- 2. POPULATION (Simulation) ---
        let base = this.type === 'Urban' ? 500000 : (this.type === 'Suburb' ? 100000 : 20000);
        this.population = Math.floor(base * (0.8 + Math.random() * 0.4));

        // --- 3. DEMOGRAPHICS (Simulation) ---
        this.demographics = this.generateDemographics(this.type);
        
        // --- 4. VOTING DATA (Simulation) ---
        let lean = this.calculateLean(); 
        this.pcts = { 
            D: lean, 
            R: 100 - lean, 
            G: baseG * (Math.random() + 0.5), 
            L: baseL * (Math.random() + 0.5) 
        };
        this.normalizePcts();
        this.enthusiasm = { D: 1.0, R: 1.0 };
    }

    generateDemographics(type) {
        let demos = {};
        if (type === 'Urban') { demos.white_col=30; demos.aa=25; demos.his=20; demos.youth=15; demos.white_wc=10; }
        else if (type === 'Suburb') { demos.white_col=45; demos.white_wc=25; demos.his=15; demos.youth=10; demos.aa=5; }
        else { demos.white_wc=60; demos.evang=30; demos.rural=50; } 
        for(let k in demos) demos[k] = Math.max(0, demos[k] + (Math.random()*10 - 5));
        return demos;
    }

    calculateLean() {
        let dScore = 0, rScore = 0;
        if(this.type === 'Urban') dScore += 25;
        if(this.type === 'Rural') rScore += 25;
        // Group Influence
        if(this.demographics.aa) dScore += this.demographics.aa * 0.9;
        if(this.demographics.evang) rScore += this.demographics.evang * 0.8;
        if(this.demographics.youth) dScore += this.demographics.youth * 0.6;
        
        let total = dScore + rScore;
        let dPct = (dScore / total) * 100;
        return Math.max(10, Math.min(90, dPct + (Math.random()*10 - 5)));
    }

    normalizePcts() {
        let total = this.pcts.D + this.pcts.R + this.pcts.G + this.pcts.L;
        for(let k in this.pcts) this.pcts[k] = (this.pcts[k] / total) * 100;
    }

    getVotes() {
        return {
            D: this.population * (this.pcts.D/100) * this.enthusiasm.D,
            R: this.population * (this.pcts.R/100) * this.enthusiasm.R,
            G: this.population * (this.pcts.G/100),
            L: this.population * (this.pcts.L/100)
        };
    }
}

/* --- MAIN APP --- */
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
        
        for(let sCode in this.data.states) {
            let s = this.data.states[sCode];
            s.moe = (Math.random()*2 + 1.5).toFixed(1);
            s.donorFatigue = 0;
            s.priorities = {}; ISSUES.forEach(i => s.priorities[i.id] = Math.floor(Math.random()*10)+1);
            s.counties = []; // Will be populated dynamically by the SVG parser
            
            // Format Names for Wikipedia URLs (Spaces to Underscores)
            let safeName = s.name.replace(/ /g, "_");
            
            // Special:FilePath URL for Flags
            s.flagUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_${safeName}.svg`;

            // Initial Pcts (Will be overwritten if counties load, else this is placeholder)
            s.pcts = { D: 48, R: 48, G: 2, L: 2 };
            s.totalPop = 0;
        }
        
        this.renderParties();
        this.initIssues();
    },

    /* --- MAP SYSTEM (WIKIPEDIA LOADER) --- */
    enterStateView: function() {
        const s = this.data.states[this.data.selectedState];
        if(!s) return;
        this.data.activeCountyState = s;
        document.getElementById('cv-title').innerText = s.name.toUpperCase();
        document.getElementById('cv-flag').src = s.flagUrl;
        
        const container = document.getElementById('county-map-container');
        container.innerHTML = `<p style="color:#aaa;">Downloading Map Data from Archives...</p>`;
        document.getElementById('county-modal').classList.remove('hidden');
        
        // URL Construction for Presidential Results Map (SVG)
        let safeName = s.name.replace(/ /g, "_");
        
        // Using Special:FilePath to handle redirects automatically
        let url = `https://commons.wikimedia.org/wiki/Special:FilePath/${safeName}_Presidential_Election_Results_2024.svg`;
        
        // Note: fetch() to Wikipedia often fails CORS in browser games without a backend proxy.
        // If this fails, we prompt user or show error.
        fetch(url)
            .then(res => { 
                if(!res.ok) throw new Error("Fetch Failed"); 
                return res.text(); 
            })
            .then(data => {
                // Sanitize: Check if we actually got SVG or an HTML error page
                if(data.includes("<svg")) {
                    container.innerHTML = data;
                    this.parseCountySVG(container.querySelector('svg'), s); 
                } else {
                    throw new Error("Invalid SVG Data");
                }
            })
            .catch(err => {
                console.warn(err);
                container.innerHTML = `
                    <div style="text-align:center; color:#ccc;">
                        <h3>CONNECTION FAILED</h3>
                        <p>Could not download map from: <br><a href="${url}" target="_blank" style="color:#00AEF3">${url}</a></p>
                        <p style="font-size:0.8rem; color:#888;">(CORS policy blocks direct Wikipedia access in this environment)</p>
                        <p>To play this state, please manually save the SVG to the /counties folder or use a local server.</p>
                    </div>`;
            });
    },

    parseCountySVG: function(svg, stateObj) {
        if(!svg) return;
        svg.style.width="100%"; svg.style.height="100%";
        
        // Find paths (counties)
        // Note: The example provided uses <path id="CountyName">
        let paths = svg.querySelectorAll('path, g');
        let newCounties = [];
        
        paths.forEach((p, idx) => {
            let id = p.id;
            // Filter out non-county paths (borders, etc)
            // Valid counties usually have names as IDs in these files
            if(!id || id.length < 2) return; 

            // Initialize Data if not exists
            let existing = stateObj.counties.find(c => c.id === id);
            if(!existing) {
                // Determine base 3rd party stats based on region
                let baseG = ['California','Oregon','Vermont','Washington'].includes(stateObj.name) ? 4.0 : 1.0;
                let baseL = ['New_Hampshire','Montana','Nevada'].includes(stateObj.name.replace(/ /g,"_")) ? 4.5 : 1.5;
                
                let cObj = new County(id, id, "Rural", baseG, baseL); 
                newCounties.push(cObj);
                existing = cObj;
            }
            
            // Add Interaction
            p.onclick = (e) => { e.stopPropagation(); this.clickCounty(existing); };
            p.onmousemove = (e) => this.showCountyTooltip(e, existing);
            p.onmouseleave = () => document.getElementById('county-tooltip').classList.add('hidden');
            
            // Color it
            this.colorCountyPath(p, existing);
        });
        
        // If we successfully parsed counties, update state aggregation
        if(newCounties.length > 0) {
            stateObj.counties = newCounties;
            this.recalcStatePoll(stateObj);
            this.clickState(this.data.selectedState); // Refresh sidebar numbers
        }
    },

    recalcStatePoll: function(state) {
        if(state.counties.length === 0) return;
        
        let totals = { D:0, R:0, G:0, L:0 };
        let totalPop = 0;
        state.counties.forEach(c => {
            let v = c.getVotes();
            totals.D += v.D; totals.R += v.R; totals.G += v.G; totals.L += v.L;
            totalPop += (v.D+v.R+v.G+v.L);
        });
        
        if (totalPop > 0) {
            state.pcts = {
                D: (totals.D / totalPop) * 100, R: (totals.R / totalPop) * 100,
                G: (totals.G / totalPop) * 100, L: (totals.L / totalPop) * 100
            };
            state.totalPop = totalPop;
        }
    },

    colorCountyPath: function(path, c) {
        let fill = "#333";
        if(this.data.mapMode === 'political') {
            let m = c.pcts.D - c.pcts.R;
            fill = this.getMarginColor({ margin: m, party: m > 0 ? 'D':'R' });
        } else if(this.data.mapMode === 'fundraising') {
            let intensity = Math.min(c.population / 200000, 1);
            fill = `rgba(74, 222, 128, ${intensity})`;
        } else {
            // Demographics map mode (simplified)
            fill = `rgba(255, 215, 0, ${c.population/300000})`;
        }
        path.style.fill = fill; 
        path.style.stroke = "#555";
        path.style.strokeWidth = "0.5px";
        path.style.cursor = "pointer";
    },

    clickCounty: function(c) {
        if(confirm(`Hold Rally in ${c.name}? (1 Energy)`)) {
            if(this.data.energy > 0) {
                this.data.energy--;
                // Boost
                if(this.data.selectedParty==='D') c.enthusiasm.D += 0.2; else c.enthusiasm.R += 0.2;
                
                this.recalcStatePoll(this.data.activeCountyState);
                this.updateHUD();
                
                // Refresh just this path
                let p = document.getElementById(c.id);
                if(p) this.colorCountyPath(p, c);
                
                this.clickState(this.data.selectedState); // Refresh sidebar
            } else {
                this.showToast("Not enough Energy!");
            }
        }
    },

    showCountyTooltip: function(e, c) {
        let tt = document.getElementById('county-tooltip');
        let m = c.pcts.D - c.pcts.R;
        let lead = m > 0 ? "D" : "R";
        let col = m > 0 ? "#00AEF3" : "#E81B23";
        
        tt.innerHTML = `
            <div style="font-size:0.8rem; color:#aaa; margin-bottom:2px;">${c.name} (${c.type})</div>
            <div class="tooltip-leader" style="color:${col}; font-size:1.2rem;">${lead}+${Math.abs(m).toFixed(1)}</div>
            <div style="font-size:0.8rem;">
                D: ${c.pcts.D.toFixed(1)}%<br>
                R: ${c.pcts.R.toFixed(1)}%
            </div>
        `;
        tt.style.left = (e.clientX+15)+"px"; tt.style.top = (e.clientY+15)+"px";
        tt.classList.remove('hidden');
    },

    closeCountyView: function() {
        document.getElementById('county-modal').classList.add('hidden');
        this.data.activeCountyState = null;
        this.colorMap(); // Refresh national map
    },

    /* --- NATIONAL MAP --- */
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
        
        // 4-Way Bar
        let wrap = document.querySelector('.poll-bar-wrap');
        wrap.innerHTML = `
            <div style="width:${s.pcts.D}%; background:#00AEF3;"></div>
            <div style="width:${s.pcts.G}%; background:#198754;"></div>
            <div style="width:${s.pcts.L}%; background:#fd7e14;"></div>
            <div style="width:${s.pcts.R}%; background:#E81B23;"></div>
        `;
        document.getElementById('poll-dem-val').innerText = s.pcts.D.toFixed(1)+"%";
        document.getElementById('poll-rep-val').innerText = s.pcts.R.toFixed(1)+"%";
        
        const l = document.getElementById('sp-issues-list'); l.innerHTML="";
        ISSUES.sort((a,b)=>s.priorities[b.id]-s.priorities[a.id]).slice(0,3).forEach(x=>{
            l.innerHTML+=`<div style="display:flex; justify-content:space-between; padding:2px; border-bottom:1px solid #333"><span>${x.name}</span><span style="color:gold">${s.priorities[x.id]}</span></div>`;
        });
    },

    // ... [Keep initMap, colorMap, getMarginColor, updateHUD, updateScore, showTooltip, etc] ...
    // These functions remain standard from the previous successful version.
    
    getMarginColor: function(info) {
        let m = Math.abs(info.margin);
        if(m < 0.5) return "#FFFFFF";
        let i = Math.min(m/15, 1);
        if(info.party === 'D') return `rgb(${Math.round(255-(255*i))}, ${Math.round(255-(81*i))}, ${Math.round(255-(12*i))})`;
        else return `rgb(${Math.round(255-(23*i))}, ${Math.round(255-(228*i))}, ${Math.round(255-(220*i))})`;
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
                let m = s.pcts.D - s.pcts.R;
                p.style.fill = this.getMarginColor({margin: m, party: m>0?'D':'R'});
                p.style.stroke = "#555";
            }
        }
        this.updateScore();
    },
    showTooltip: function(e, code) {
        const tt = document.getElementById('map-tooltip');
        const s = this.data.states[code];
        let m = s.pcts.D - s.pcts.R;
        let name = m > 0 ? "Harris" : "Trump"; 
        let col = m > 0 ? "#00AEF3" : "#E81B23";
        tt.innerHTML = `<span class="tooltip-leader" style="color:${col}">${name} +${Math.abs(m).toFixed(1)}</span>
                        <div class="tip-row"><span class="blue">DEM ${s.pcts.D.toFixed(1)}%</span> <span class="red">REP ${s.pcts.R.toFixed(1)}%</span></div>`;
        tt.style.display='block'; tt.style.left=(e.clientX+15)+'px'; tt.style.top=(e.clientY+15)+'px';
    },
    
    // UI Helpers
    initIssues: function(){ const s=document.getElementById('issue-select'); if(s) ISSUES.forEach(i=>s.innerHTML+=`<option value="${i.id}">${i.name}</option>`); },
    fundraise: function(){ if(this.data.energy<1)return; this.data.energy--; this.data.funds+=0.5; this.updateHUD(); },
    runStateAd: function(){ this.data.funds-=0.5; this.updateHUD(); },
    openStateBio: function(){ document.getElementById('bio-modal').classList.remove('hidden'); },
    nextWeek: function(){ this.data.currentDate.setDate(this.data.currentDate.getDate()+7); this.updateHUD(); },
    undoLastAction: function(){},
    updateHUD: function() {
        document.getElementById('hud-funds').innerText = `$${this.data.funds.toFixed(1)}M`;
        const ec = document.getElementById('hud-energy'); ec.innerHTML="";
        for(let i=0; i<this.data.maxEnergy; i++) ec.innerHTML += `<div class="energy-pip ${i<this.data.energy?'active':''}"></div>`;
    },
    updateScore: function() {
        let d=0, r=0;
        for(let k in this.data.states) { if(this.data.states[k].pcts.D > this.data.states[k].pcts.R) d+=this.data.states[k].ev; else r+=this.data.states[k].ev; }
        document.getElementById('score-dem').innerText = d; document.getElementById('score-rep').innerText = r;
        let dp = (d/538)*100, rp = (r/538)*100;
        document.getElementById('ev-bar').style.background = `linear-gradient(90deg, #00AEF3 ${dp}%, #333 ${dp}%, #333 ${100-rp}%, #E81B23 ${100-rp}%)`;
    },
    setMapMode: function(mode, isCounty=false) {
        this.data.mapMode = mode;
        if(isCounty && this.data.activeCountyState) {
            let container = document.getElementById('county-map-container');
            // If SVG exists, recolor its paths
            let paths = container.querySelectorAll('path, rect, g');
            let s = this.data.activeCountyState;
            paths.forEach(p => {
                let c = s.counties.find(county => county.id === p.id);
                if(c) this.colorCountyPath(p, c);
            });
        } else {
            this.colorMap();
        }
    },
    showToast: function(msg) {
        const t = document.getElementById('toast');
        t.innerText = msg; t.style.opacity = 1; setTimeout(()=>t.style.opacity=0, 2000);
    },
    toggleThirdParties: function() {
        this.data.thirdPartiesEnabled = document.getElementById('third-party-toggle').checked;
        if(!this.data.thirdPartiesEnabled) {
            for(let s in this.data.states) { this.data.states[s].pcts.G=0; this.data.states[s].pcts.L=0; }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
