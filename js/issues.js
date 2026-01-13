/* ============================================
   DECISION 2028 - ISSUES PANEL UI (enhanced)
   - Render issues list & detail
   - Give speeches
   - Shift positions (slider)
   - Request PAC endorsements (offers)
   ============================================ */

var IssuesPanel = (function() {
    var selectedIssue = null;
    var modal = null;

    function open() {
        modal = document.getElementById('issues-modal');
        if (!modal) return Utils.showToast("Issues UI not found.");
        if (!gameData.pacLocks) gameData.pacLocks = {}; // ensure persistence container
        renderList();
        showDetailForFirst();
        modal.classList.remove('hidden');
    }

    function close() {
        if (modal) modal.classList.add('hidden');
    }

    function renderList() {
        var container = document.getElementById('issues-list');
        container.innerHTML = '';
        var issues = (typeof CORE_ISSUES !== 'undefined') ? CORE_ISSUES : [];
        for (var i = 0; i < issues.length; i++) {
            (function(issue) {
                var el = document.createElement('div');
                el.className = 'issue-item';
                el.setAttribute('data-id', issue.id);
                el.innerHTML = '<strong>' + issue.name + '</strong><div class="issue-cat">' + issue.category + '</div>';
                el.onclick = function() { selectIssue(issue.id); };
                container.appendChild(el);
            })(issues[i]);
        }
    }

    function selectIssue(issueId) {
        selectedIssue = issueId;
        var items = document.querySelectorAll('#issues-list .issue-item');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.toggle('selected', items[i].getAttribute('data-id') === issueId);
        }
        renderDetail(issueId);
    }

    function showDetailForFirst() {
        var issues = (typeof CORE_ISSUES !== 'undefined') ? CORE_ISSUES : [];
        if (issues.length) selectIssue(issues[0].id);
    }

    function renderDetail(issueId) {
        var detail = document.getElementById('issues-detail');
        if (!detail) return;
        var issue = CORE_ISSUES.find(function(i) { return i.id === issueId; }) || { id: issueId, name: issueId, category: '' };
        var stateCode = gameData.selectedState || 'NATIONAL';
        var statePos = (gameData.selectedState && STATE_ISSUE_POSITIONS[gameData.selectedState] && (typeof STATE_ISSUE_POSITIONS[gameData.selectedState][issueId] !== 'undefined')) ? STATE_ISSUE_POSITIONS[gameData.selectedState][issueId] : 'N/A';
        var candPos = 'N/A';
        if (gameData.candidate && CANDIDATE_POSITIONS[gameData.candidate.id]) {
            candPos = (typeof CANDIDATE_POSITIONS[gameData.candidate.id][issueId] !== 'undefined') ? CANDIDATE_POSITIONS[gameData.candidate.id][issueId] : 0;
        } else {
            candPos = 0;
        }
        var salience = (gameData.selectedState && ISSUE_SALIENCE[gameData.selectedState] && ISSUE_SALIENCE[gameData.selectedState][issueId]) || ISSUE_SALIENCE['default'][issueId] || 5;

        // PAC lock info from gameData.pacLocks
        var pacLocked = false;
        var pacInfo = '';
        if (gameData.pacLocks && gameData.pacLocks[issueId]) {
            pacLocked = gameData.pacLocks[issueId].locked === true;
            pacInfo = gameData.pacLocks[issueId].lockedBy ? ('Locked by ' + gameData.pacLocks[issueId].lockedBy) : 'Locked';
        }

        // Render detail with slider for shifting
        detail.innerHTML =
            '<div><strong>' + (issue.name || issueId) + '</strong> <span class="issue-cat">(' + issue.category + ')</span></div>' +
            '<div style="margin-top:8px;">Selected State: <strong>' + (stateCode === 'NATIONAL' ? 'None' : stateCode) + '</strong></div>' +
            '<div>State position (avg voters): <strong>' + statePos + '</strong></div>' +
            '<div>Candidate position: <strong id="issue-cand-pos">' + candPos + '</strong></div>' +
            '<div>Issue salience in state: <strong>' + salience + '</strong></div>' +
            '<div style="margin-top:10px; color:#666; font-size:0.9rem;">Give a campaign speech on this issue to adjust alignment and turnout.<br/>Speeches cost 1 energy and $0.5M.</div>' +
            '<hr/>' +
            '<div style="margin-top:8px;"><strong>Shift Position</strong> <span style="color:#666; font-size:0.9rem;">(Move your candidate on this issue)</span></div>' +
            (pacLocked ? ('<div style="color:#a33; margin-top:6px;">PAC LOCK: ' + pacInfo + '</div>') : '') +
            '<div style="margin-top:8px;">' +
                '<input id="issue-shift-range" type="range" min="-10" max="10" value="0" step="1" style="width:100%;">' +
                '<div style="display:flex; justify-content:space-between; margin-top:6px;">' +
                    '<span>-10</span><span id="issue-shift-val">0</span><span>+10</span>' +
                '</div>' +
                '<div style="margin-top:8px; color:#666; font-size:0.9rem;">Applying a large shift costs more funds and may cause temporary credibility/turnout penalties. Shifts consume 2 energy and base funds.</div>' +
                '<div style="margin-top:10px;">' +
                    '<button id="apply-shift-btn" class="start-btn">APPLY SHIFT</button>' +
                '</div>' +
            '</div>';

        // Wire up slider and apply button asynchronously
        setTimeout(function() {
            var range = document.getElementById('issue-shift-range');
            var val = document.getElementById('issue-shift-val');
            if (!range || !val) return;
            range.oninput = function() { val.innerText = range.value; };
            var applyBtn = document.getElementById('apply-shift-btn');
            applyBtn.onclick = function() {
                var shift = parseInt(range.value, 10);
                if (shift === 0) return Utils.showToast("Choose a non-zero shift amount.");
                // Check PAC lock
                if (gameData.pacLocks && gameData.pacLocks[issueId] && gameData.pacLocks[issueId].locked) {
                    if (gameData.pacLocks[issueId].lockedBy && gameData.pacLocks[issueId].lockedBy !== gameData.selectedParty) {
                        return Utils.showToast("Cannot shift this issue: PAC has locked positions here.");
                    }
                }
                if (typeof Campaign !== 'undefined' && typeof Campaign.shiftIssue === 'function') {
                    Campaign.shiftIssue(issueId, shift);
                    // refresh after a brief moment
                    setTimeout(function() { renderDetail(issueId); }, 150);
                } else {
                    Utils.showToast("Issue shift mechanic not available.");
                }
            };
        }, 0);
    }

    function giveSpeech() {
        if (!selectedIssue) return Utils.showToast("Choose an issue first.");
        if (typeof Campaign !== 'undefined' && typeof Campaign.giveSpeech === 'function') {
            Campaign.giveSpeech(selectedIssue);
            close();
        } else {
            Utils.showToast("Speech mechanic not available.");
        }
    }

    // Request a PAC endorsement for the selected issue (triggers a simulated PAC offer)
    function requestPac() {
        if (!selectedIssue) return Utils.showToast("Choose an issue first.");
        // Use interestGroups to generate an offer if available; fallback to basic simulated offer
        var offer = null;
        if (typeof InterestGroups !== 'undefined' && InterestGroups.generatePacOffer) {
            offer = InterestGroups.generatePacOffer(selectedIssue, gameData.selectedParty);
        } else {
            // Fallback: basic offer
            offer = {
                pacId: 'pac_generic_' + selectedIssue,
                pacName: 'Citizens for ' + selectedIssue.charAt(0).toUpperCase() + selectedIssue.slice(1),
                amount: 1.0 + Math.round(Math.random() * 4), // $1M - $5M
                lockWeeks: 6,
                preferredPosition: (CANDIDATE_POSITIONS[gameData.candidate.id] && CANDIDATE_POSITIONS[gameData.candidate.id][selectedIssue]) || 0
            };
        }
        showPacOfferModal(offer, selectedIssue);
    }

    function showPacOfferModal(offer, issueId) {
        var modal = document.getElementById('pac-offer-modal');
        var body = document.getElementById('pac-offer-body');
        if (!modal || !body) return Utils.showToast("PAC UI not available.");
        body.innerHTML = '<div><strong>' + offer.pacName + '</strong></div>' +
            '<div>Offer Amount: <strong>$' + offer.amount.toFixed(1) + 'M</strong></div>' +
            '<div>Lock (weeks): <strong>' + offer.lockWeeks + '</strong></div>' +
            '<div style="margin-top:8px;">Do you accept this endorsement? It will lock your position on this issue for the duration.</div>' +
            '<div style="margin-top:12px;">' +
                '<button id="accept-pac-btn" class="start-btn">ACCEPT</button>' +
                '<button id="decline-pac-btn" class="back-btn" style="margin-left:8px;">DECLINE</button>' +
            '</div>';

        modal.classList.remove('hidden');

        setTimeout(function() {
            document.getElementById('accept-pac-btn').onclick = function() {
                applyPacOffer(offer, issueId, true);
                modal.classList.add('hidden');
            };
            document.getElementById('decline-pac-btn').onclick = function() {
                applyPacOffer(offer, issueId, false);
                modal.classList.add('hidden');
            };
        }, 0);
    }

    // Apply PAC offer effect: if accepted, give funds and lock the issue; if declined, opponent may get endorsement
    function applyPacOffer(offer, issueId, accepted) {
        // ensure pacLocks container
        if (!gameData.pacLocks) gameData.pacLocks = {};
        if (accepted) {
            // credit funds immediately
            gameData.funds += offer.amount;
            // create lock entry
            gameData.pacLocks[issueId] = {
                locked: true,
                lockedBy: gameData.selectedParty,
                remainingWeeks: offer.lockWeeks,
                pacId: offer.pacId,
                pacName: offer.pacName
            };
            Utils.addLog('Accepted PAC endorsement from ' + offer.pacName + ' on ' + issueId + ' for $' + offer.amount.toFixed(1) + 'M. Issue locked for ' + offer.lockWeeks + ' weeks.');
            Utils.showToast('PAC endorsement accepted: $' + offer.amount.toFixed(1) + 'M');
        } else {
            // declined: simulate opponent endorsement offering (if opponent exists)
            Utils.addLog('Declined PAC offer from ' + offer.pacName + ' on ' + issueId + '.');
            Utils.showToast('PAC offer declined.');
            var opponentParty = (gameData.selectedParty === 'D') ? 'R' : 'D';
            // small chance opponent accepts automatically - simulate
            if (Math.random() < 0.6) {
                // opponent gets endorsement
                if (!gameData.pacLocks) gameData.pacLocks = {};
                gameData.pacLocks[issueId] = {
                    locked: true,
                    lockedBy: opponentParty,
                    remainingWeeks: offer.lockWeeks,
                    pacId: offer.pacId + '_to_' + opponentParty,
                    pacName: offer.pacName + ' (now endorses ' + opponentParty + ')'
                };
                Utils.addLog(offer.pacName + ' endorsed the ' + opponentParty + ' party on ' + issueId + '.');
                Utils.showToast(offer.pacName + ' endorsed ' + opponentParty + '.');
            }
        }
        // update HUD and persist
        if (typeof Campaign !== 'undefined') Campaign.updateHUD();
    }

    return {
        open: open,
        close: close,
        giveSpeech: giveSpeech,
        requestPac: requestPac,
        _selectIssue: selectIssue
    };
})();
