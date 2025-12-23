// --- MAP LOGIC ---
    async renderMapStructure() {
        const container = document.getElementById('map-container');
        try {
            // Fetch external SVG
            const response = await fetch('map.svg');
            if(!response.ok) throw new Error("Map file not found");
            const svgText = await response.text();
            container.innerHTML = svgText;

            // Wait for DOM to parse the SVG
            setTimeout(() => {
                this.initMapInteractions();
                this.colorMap();
            }, 50);

        } catch (e) {
            console.error(e);
            container.innerHTML = "<h3 style='color:red; text-align:center; padding-top:100px'>Error: map.svg not found.<br>Make sure the file is named map.svg</h3>";
        }
    }

    initMapInteractions() {
        // The Map uses classes (class="tx") but we need IDs (id="TX")
        // We loop through every state in our data and find the matching path in the SVG
        const svg = document.querySelector('svg');

        for(const stateId of Object.keys(this.states)) {
            const lowercaseCode = stateId.toLowerCase();
            
            // We look for a path with that class name (e.g. .tx, .ca, .ny)
            // We use [class~=] to find the exact class word
            let path = svg.querySelector(`.${lowercaseCode}`);
            
            if(path) {
                // We force the ID onto the path so the rest of the game works
                path.id = stateId; 
                
                // Add Clicks
                path.onclick = () => this.clickState(stateId);
                path.onmouseenter = (e) => this.showTooltip(e, stateId);
                path.onmouseleave = () => this.hideTooltip();
                
                // Visual Settings to override the SVG defaults
                path.style.cursor = "pointer";
                path.style.stroke = "#ffffff";
                path.style.strokeWidth = "1px";
                path.style.transition = "fill 0.2s";
                
                // Store reference ID for coloring later
                this.states[stateId].domId = stateId; 
            }
        }
    }
