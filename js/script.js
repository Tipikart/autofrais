function startRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'fr-FR';
    recognition.start();

    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript;
        document.getElementById('transcript').innerText = speechResult;
        const output = parseSpeech(speechResult);
        document.getElementById('output').innerText = JSON.stringify(output, null, 2);
        if (output.montant) {
            addToTable(output);
        }
    };

    recognition.onerror = function(event) {
        document.getElementById('transcript').innerText = "Erreur : " + event.error;
    };
}

function parseSpeech(text) {
    const montant = text.match(/(?:\b|\D)(\d+(?:[\.,]\d{1,2})?)\s*(?:euros?|€)/i);
    const type = text.match(/\b(d'|de |du |des )?(essence|repas|logement|avion|train|restaurant|carburant|hôtel|location)/i);
    const mission = text.match(/mission\s+([\w\d]+)/i);
    const fournisseur = text.match(/(?:chez|à|au|aux)\s+(\w+)/i);

    return {
        montant: montant ? montant[1].replace(',', '.') : null,
        fournisseur: fournisseur ? fournisseur[1] : null,
        type_depense: type ? type[2] : null,
        mission: mission ? mission[1] : null,
        ligne_comptable: montant
            ? `DEP-${(type ? type[2] : "XXX").toUpperCase()}-${(fournisseur ? fournisseur[1] : "FOU").toUpperCase()}-${(mission ? mission[1] : "MISS").toUpperCase()}`
            : "N/A"
    };
}

function addToTable(data) {
    const table = document.getElementById('expense-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.insertCell(0).innerText = data.montant;
    row.insertCell(1).innerText = data.fournisseur;
    row.insertCell(2).innerText = data.type_depense;
    row.insertCell(3).innerText = data.mission;
    row.insertCell(4).innerText = data.ligne_comptable;
}

function exportCSV() {
    const table = document.getElementById('expense-table');
    let csv = [];
    for (let row of table.rows) {
        let cells = Array.from(row.cells).map(cell => `"${cell.innerText}"`);
        csv.push(cells.join(','));
    }
    const blob = new Blob([csv.join("\n")], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes-de-frais.csv';
    a.click();
    URL.revokeObjectURL(url);
}