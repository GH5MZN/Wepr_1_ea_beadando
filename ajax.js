const API_URL = "http://gamf.nhely.hu/ajax2/";
 const CODE = "GH5MZNefg456"; // Saját azonosító kód
 
 // Adatok lekérdezése
 document.getElementById("readButton").addEventListener("click", () => {
     fetch(API_URL, {
         method: "POST",
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: `op=read&code=${CODE}`
     })
     .then(response => response.json())
     .then(data => {
         const output = document.getElementById("dataOutput");
         output.innerHTML = ""; // Korábbi adatok törlése
         if (data.list) {
             data.list.forEach(record => {
                 const div = document.createElement("div");
                 div.textContent = `ID: ${record.id}, Név: ${record.name}, Magasság: ${record.height}, Súly: ${record.weight}`;
                 output.appendChild(div);
             });
 
             // Magasság összeg, átlag, legnagyobb
             const heights = data.list.map(record => parseFloat(record.height));
             const sum = heights.reduce((a, b) => a + b, 0);
             const avg = (sum / heights.length).toFixed(2);
             const max = Math.max(...heights);
             const stats = document.createElement("div");
             stats.innerHTML = `<strong>Összeg:</strong> ${sum}, <strong>Átlag:</strong> ${avg}, <strong>Legnagyobb:</strong> ${max}`;
             output.appendChild(stats);
         }
     })
     .catch(error => {
         console.error("Hiba történt:", error);
         alert("Nem sikerült az adatok lekérdezése!");
     });
 });
 
 // Új rekord létrehozása
 document.getElementById("createForm").addEventListener("submit", event => {
     event.preventDefault();
     const name = document.getElementById("createName").value.trim();
     const height = document.getElementById("createHeight").value.trim();
     const weight = document.getElementById("createWeight").value.trim();
 
     // Validáció: mezők nem lehetnek üresek és max 30 karakter hosszúak
     if (!name || !height || !weight) {
         alert("Minden mezőt ki kell tölteni!");
         return;
     }
     if (name.length > 30 || height.length > 30 || weight.length > 30) {
         alert("A mezők értékei nem lehetnek hosszabbak 30 karakternél!");
         return;
     }
      // Magasság miniimum és maximum
    if (height < 50 || height > 250) {
        alert("A magasság legalább 50 cm és maximum 250 cm között lehet!");
        return;
    }

    // Súly minimum és maximum
    if (weight < 10 || weight > 300) {
        alert("A súly legalább 10 kg, maximum 300 kg között lehet!");
        return;
    }
 
     fetch(API_URL, {
         method: "POST",
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${CODE}`
     })
     .then(response => response.json())
     .then(data => alert(`Rekord létrehozva: ${data.affectedRows}`))
     .catch(error => {
         console.error("Hiba történt:", error);
         alert("Nem sikerült a rekord létrehozása!");
     });
 });
 
 // Rekord módosítása
 document.getElementById("getDataForId").addEventListener("click", () => {
     const id = parseInt(document.getElementById("updateId").value); // ID számmá alakítása
     fetch(API_URL, {
         method: "POST",
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: `op=read&code=${CODE}`
     })
     .then(response => response.json())
     .then(data => {
         console.log(data); // Ellenőrizd az API válaszát
         const record = data.list.find(r => parseInt(r.id) === id); // ID összehasonlítás
         if (record) {
             document.getElementById("updateName").value = record.name;
             document.getElementById("updateHeight").value = record.height;
             document.getElementById("updateWeight").value = record.weight;
         } else {
             alert("Rekord nem található!");
         }
     })
     .catch(error => {
         console.error("Hiba történt:", error);
         alert("Nem sikerült az adatok betöltése!");
     });
 });
 
 document.getElementById("updateForm").addEventListener("submit", event => {
     event.preventDefault();
     const id = document.getElementById("updateId").value.trim();
     const name = document.getElementById("updateName").value.trim();
     const height = document.getElementById("updateHeight").value.trim();
     const weight = document.getElementById("updateWeight").value.trim();
 
     // Validáció: mezők nem lehetnek üresek és max 30 karakter hosszúak
     if (!id || !name || !height || !weight) {
         alert("Minden mezőt ki kell tölteni!");
         return;
     }
     if (name.length > 30 || height.length > 30 || weight.length > 30) {
         alert("A mezők értékei nem lehetnek hosszabbak 30 karakternél!");
         return;
     }
 
     fetch(API_URL, {
         method: "POST",
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${CODE}`
     })
     .then(response => response.json())
     .then(data => alert(`Rekord módosítva: ${data.affectedRows}`))
     .catch(error => {
         console.error("Hiba történt:", error);
         alert("Nem sikerült a rekord módosítása!");
     });
 });
 
 // Rekord törlése
 document.getElementById("deleteForm").addEventListener("submit", event => {
     event.preventDefault();
     const id = document.getElementById("deleteId").value.trim();
 
     // Validáció: ID mező nem lehet üres
     if (!id) {
         alert("Az ID mezőt ki kell tölteni!");
         return;
     }
 
     fetch(API_URL, {
         method: "POST",
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: `op=delete&id=${id}&code=${CODE}`
     })
     .then(response => response.json())
     .then(data => alert(`Rekord törölve: ${data.affectedRows}`))
     .catch(error => {
         console.error("Hiba történt:", error);
         alert("Nem sikerült a rekord törlése!");
     });
 });