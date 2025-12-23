class GameEngine {
    constructor() {
        this.gameState = 'INTRO';
        this.party = null;
        this.player = null;
        this.vp = null;
        this.funds = 0;
        this.week = 1;
        this.maxWeeks = 12;
        this.states = {};
        this.init();
    }

    init() {
        document.getElementById('scenario-text').innerText = SCENARIO_TEXT;
        this.states = JSON.parse(JSON.stringify(STATE_DATA));

        // Listeners
        document.getElementById('start-btn').onclick = () => this.setScreen('screen-party');
        document.getElementById('campaign-btn').onclick = () => this.campaignInState();
        
        document.querySelectorAll('.party-card').forEach(card => {
            card.onclick = () => this.selectParty(card.dataset.party);
        });
    }

    setScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    // --- STEP 1: PARTY ---
    selectParty(partyCode) {
        this.party = partyCode;
        const pData = PARTIES[partyCode];
        
        document.getElementById('party-name').innerText = pData.name;
        document.getElementById('party-name').style.color = pData.color;
        document.getElementById('party-desc').innerText = pData.desc;
        document.getElementById('chair-name').innerText = pData.chair;
        document.getElementById('chair-img').src = pData.chair_img;
        document.getElementById('party-header-bar').style.borderLeftColor = pData.color;

        const list = document.getElementById('candidate-list');
        list.innerHTML = '';
        
        CANDIDATES.filter(c => c.party === partyCode).forEach(c => {
            const div = document.createElement('div');
            div.className = 'candidate-card';
            div.innerHTML = `
                <img src="${c.img}" onerror="this.src='https://via.placeholder.com/80?text=IMG'">
                <div class="c-info">
                    <h3>${c.name}</h3>
                    <p style="color:#aaa">${c.desc}</p>
                    <p class="c-buff">${c.buff}</p>
                </div>
            `;
            div.onclick = () => this.selectCandidate(c);
            list.appendChild(div);
        });

        // Custom Option
        const custom = document.createElement('div');
        custom.className = 'candidate-card';
        custom.style.justifyContent = 'center';
        custom.innerHTML = `<h3>+ Create Custom</h3>`;
        custom.onclick = () => this.createCustom();
        list.appendChild(custom);

        this.setScreen('screen-candidate');
    }

    createCustom() {
        const name = prompt("Candidate Name:");
        const home = prompt("Home State Code (e.g. TX):");
        if(name && home && STATE_DATA[home.toUpperCase()]) {
            const custom = { id: "custom", name: name, party: this.party, home: home.toUpperCase(), desc: "Custom Candidate", buff: "Wildcard", img: "images/scenario.jpg" };
            this.selectCandidate(custom);
        } else alert("Invalid State Code");
    }

    // --- STEP 2: VP ---
    selectCandidate(c) {
        this.player = c;
        const list = document.getElementById('vp-list');
        list.innerHTML = '';
        
        CANDIDATES.filter(vp => vp.party === this.party && vp.id !== c.id).forEach(vp => {
            const div = document.createElement('div');
            div.className = 'candidate-card';
            div.innerHTML = `
                <img src="${vp.img}" onerror="this.src='https://via.placeholder.com/80?text=IMG'">
                <div class="c-info">
                    <h3>${vp.name}</h3>
                    <p class="c-buff">Boosts ${vp.home}</p>
                </div>
            `;
            div.onclick = () => this.selectVP(vp);
            list.appendChild(div);
        });
        this.setScreen('screen-vp');
    }

    // --- STEP 3: START GAME ---
    selectVP(vp) {
        this.vp = vp;
        this.funds = 2000000;
        
        // Bonuses
        this.applyBonus(this.player.home, 10);
        this.applyBonus(this.vp.home, 6);

        this.setScreen('screen-map');
        this.renderMapStructure(); // Load the SVG
        this.updateHUD();
    }

    applyBonus(stateId, amount) {
        if(this.states[stateId]) {
            if(this.party === 'D') this.states[stateId].polling += amount;
            else if(this.party === 'R') this.states[stateId].polling -= amount;
        }
    }

    // --- MAP LOGIC ---
    async renderMapStructure() {
        const container = document.getElementById('map-container');
        try {
            // Fetch external SVG
            const response = await fetch('map.svg');
            if(!response.ok) throw new Error("Map file not found");
            const svgText = await response.text();
            container.innerHTML = svgText;

            // Wait for DOM
            setTimeout(() => {
                this.initMapInteractions();
                this.colorMap();
            }, 100);

        } catch (e) {
            console.error(e);
            container.innerHTML = "<h3 style='color:red; text-align:center; padding-top:100px'>Error: map.svg not found.<br>Please upload map.svg to your folder.</h3>";
        }
    }

    initMapInteractions() {
        // Find paths matching state IDs
        for(const id of Object.keys(this.states)) {
            // Check for "CA" or "US-CA" (Wikipedia style)
            const path = document.getElementById(id) || document.getElementById(`US-${id}`);
            if(path) {
                path.onclick = () => this.clickState(id);
                path.onmouseenter = (e) => this.showTooltip(e, id);
                path.onmouseleave = () => this.hideTooltip();
                
                // Store reference ID for coloring later
                this.states[id].domId = path.id; 
            }
        }
    }

    colorMap() {
        for(const state of Object.values(this.states)) {
            if(!state.domId) continue;
            const el = document.getElementById(state.domId);
            if(!el) continue;

            let color = "#ccc"; 
            const p = state.polling;

            if (p >= 60) color = "#003f5c";
            else if (p >= 54) color = "#00AEF3";
            else if (p >= 51) color = "#58508d";
            else if (p <= 40) color = "#bc5090";
            else if (p <= 46) color = "#E81B23";
            else if (p <= 49) color = "#ff6361";

            el.style.fill = color;
        }
    }

    // --- GAMEPLAY ---
    clickState(id) {
        this.selectedState = id;
        const s = this.states[id];
        document.getElementById('selected-state-name').innerText = `${s.name} (${s.ev} EV)`;
        document.getElementById('state-info').innerText = `Polling: ${s.polling.toFixed(1)}% Dem`;
        
        const btn = document.getElementById('campaign-btn');
        btn.disabled = false;
        btn.innerText = `CAMPAIGN ($100k)`;
    }

    campaignInState() {
        if(this.funds < 100000) { alert("Insufficient Funds!"); return; }
        this.funds -= 100000;
        
        const s = this.states[this.selectedState];
        const boost = (Math.random() * 2) + 0.5;
        
        if(this.party === 'D') s.polling += boost;
        else s.polling -= boost;
        
        this.week++;
        if(this.week > 12) this.endGame();
        
        this.updateHUD();
        this.colorMap();
        this.clickState(this.selectedState);
    }

    updateHUD() {
        document.getElementById('hud-candidate').innerText = this.player.name;
        document.getElementById('hud-turn').innerText = 12 - this.week;
        document.getElementById('hud-funds').innerText = `$${(this.funds/1000000).toFixed(1)}M`;
        
        let d_ev = 0, r_ev = 0;
        for(const s of Object.values(this.states)) {
            if(s.polling >= 50) d_ev += s.ev;
            else r_ev += s.ev;
        }
        document.getElementById('hud-ev').innerText = `${this.party === 'D' ? d_ev : r_ev} / 270`;
    }

    showTooltip(e, id) {
        const tip = document.getElementById('state-tooltip');
        const s = this.states[id];
        tip.style.display = 'block';
        tip.style.left = (e.pageX + 15) + 'px';
        tip.style.top = (e.pageY + 15) + 'px';
        tip.innerHTML = `<strong>${s.name}</strong><br>${s.polling.toFixed(1)}% Dem`;
    }

    hideTooltip() {
        document.getElementById('state-tooltip').style.display = 'none';
    }

    endGame() {
        let d_ev = 0;
        for(const s of Object.values(this.states)) if(s.polling >= 50) d_ev += s.ev;
        const win = (this.party === 'D' && d_ev >= 270) || (this.party === 'R' && d_ev < 270);
        alert(win ? "VICTORY!" : "DEFEAT");
        location.reload();
    }
}

window.onload = () => new GameEngine();
