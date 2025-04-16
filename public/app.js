// PARTNER ACTIVITY
// Initialize Firebase (if not already initialized elsewhere)
// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmimrJIZl-E3KtMB3Duw81POO2Qn_AaxU",
  authDomain: "fir-query-a73a5.firebaseapp.com",
  projectId: "fir-query-a73a5",
  storageBucket: "fir-query-a73a5.appspot.com",
  messagingSenderId: "1032158946524",
  appId: "1:1032158946524:web:e42bdda5d3df8358dd4019",
  measurementId: "G-3D19RJ0NH8",
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const db = firebase.firestore();
// let rm = {
//   name: "real madrid",
//   city: "madrid",
//   country: "spain",
//   top_scorers: ["ronaldo", "benzema", "hazard"],
//   fans_count: 798,
// };

// let b = {
//   name: "barcelona",
//   city: "barcelona",
//   country: "spain",
//   top_scorers: ["messi", "suarez", "puyol"],
//   fans_count: 738,
// };

// let mu = {
//   name: "manchester united",
//   city: "manchester",
//   country: "england",
//   top_scorers: ["cantona", "rooney", "ronaldo"],
//   fans_count: 755,
// };

// let mc = {
//   name: "manchester city",
//   city: "manchester",
//   country: "england",
//   top_scorers: ["sterling", "aguero", "haaland"],
//   fans_count: 537,
// };

// let bzt = {
//   name: "brazillian national team",
//   city: "not applicable",
//   country: "brazil",
//   top_scorers: ["ronaldhino", "cafu", "bebeto"],
//   fans_count: 950,
// };

// let ant = {
//   name: "argentina national team",
//   city: "not applicable",
//   country: "argentina",
//   top_scorers: ["messi", "batistuta", "maradona"],
//   fans_count: 888,
// };

// let am = {
//   name: "atletico madrid",
//   city: "madrid",
//   country: "spain",
//   top_scorers: ["aragones", "griezmann", "torez"],
//   fans_count: 400,
// };
// // add to the database

// db.collection("teams").add(rm);
// db.collection("teams").add(b);
// db.collection("teams").add(mu);
// db.collection("teams").add(mc);
// db.collection("teams").add(bzt);
// db.collection("teams").add(ant);
// db.collection("teams").add(am);

// Display helper
function displayToHTML(title, docs) {
  const container = document.getElementById("results");
  const section = document.createElement("div");
  section.innerHTML = `<h3>${title}</h3>`;

  if (docs.length === 0) {
    section.innerHTML += "<p>No data returned.</p>";
  } else {
    docs.forEach((doc) => {
      const div = document.createElement("div");
      div.textContent = JSON.stringify(doc.data(), null, 2);
      div.style.border = "1px solid #ccc";
      div.style.margin = "5px 0";
      div.style.padding = "5px";
      section.appendChild(div);
    });
  }

  container.appendChild(section);
}

// 2.1 – Teams in Spain
function runQuery21() {
  db.collection("teams")
    .where("country", "==", "spain")
    .get()
    .then((data) => displayToHTML("2.1 - Teams in Spain", data.docs));
}

// 2.2 – Madrid, Spain
function runQuery22() {
  db.collection("teams")
    .where("country", "==", "spain")
    .where("city", "==", "madrid")
    .get()
    .then((data) => displayToHTML("2.2 - Teams in Madrid, Spain", data.docs));
}

// 2.3 – National Teams
function runQuery23() {
  db.collection("teams")
    .where("city", "==", "not applicable")
    .get()
    .then((data) => displayToHTML("2.3 - National Teams", data.docs));
}

// 2.4 – Not in Spain
function runQuery24() {
  db.collection("teams")
    .get()
    .then((data) => {
      const filtered = data.docs.filter(
        (doc) => doc.data().country !== "spain"
      );
      displayToHTML("2.4 - Teams not in Spain", filtered);
    });
}

// 2.5 – Not in Spain or England
function runQuery25() {
  db.collection("teams")
    .get()
    .then((data) => {
      const filtered = data.docs.filter((doc) => {
        const c = doc.data().country;
        return c !== "spain" && c !== "england";
      });
      displayToHTML("2.5 - Teams not in Spain or England", filtered);
    });
}

// 2.6 – Spain + fans > 700M
function runQuery26() {
  db.collection("teams")
    .where("country", "==", "spain")
    .where("fans_count", ">", 700)
    .get()
    .then((data) =>
      displayToHTML("2.6 - Spanish teams with >700M fans", data.docs)
    );
}

// 2.7 – Fans between 500M and 600M
function runQuery27() {
  db.collection("teams")
    .where("fans_count", ">", 500)
    .where("fans_count", "<", 600)
    .get()
    .then((data) =>
      displayToHTML("2.7 - Teams with 500M–600M fans", data.docs)
    );
}

// 2.8 – Ronaldo top scorer
function runQuery28() {
  db.collection("teams")
    .where("top_scorers", "array-contains", "ronaldo")
    .get()
    .then((data) => displayToHTML("2.8 - Teams with Ronaldo", data.docs));
}

// 2.9 – Ronaldo, Messi, or Maradona top scorers
function runQuery29() {
  db.collection("teams")
    .where("top_scorers", "array-contains-any", [
      "ronaldo",
      "messi",
      "maradona",
    ])
    .get()
    .then((data) =>
      displayToHTML("2.9 - Teams with Ronaldo, Messi, or Maradona", data.docs)
    );
}

// Auto-run all Task 2 queries when page loads
window.onload = () => {
  runQuery21();
  runQuery22();
  runQuery23();
  runQuery24();
  runQuery25();
  runQuery26();
  runQuery27();
  runQuery28();
  runQuery29();
};
//Task 3, Updates

// Real Madrid: Update team name + fans
db.collection("teams")
  .where("name", "==", "real madrid")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      db.collection("teams").doc(doc.id).update({
        name: "real madrid fc",
        fans_count: 811,
      });
    });
  });

// Barcelona: Update team name + fans
db.collection("teams")
  .where("name", "==", "barcelona")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      db.collection("teams").doc(doc.id).update({
        name: "fc barcelona",
        fans_count: 747,
      });
    });
  });
// Real Madrid
db.collection("teams")
  .where("name", "==", "real madrid fc")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const ref = db.collection("teams").doc(doc.id);

      // Remove Hazard
      ref.update({
        top_scorers: firebase.firestore.FieldValue.arrayRemove("hazard"),
      });

      // Add Crispo
      ref.update({
        top_scorers: firebase.firestore.FieldValue.arrayUnion("crispo"),
      });
    });
  });

// Barcelona
db.collection("teams")
  .where("name", "==", "fc barcelona")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      const ref = db.collection("teams").doc(doc.id);

      ref.update({
        top_scorers: firebase.firestore.FieldValue.arrayRemove("puyol"),
      });

      ref.update({
        top_scorers: firebase.firestore.FieldValue.arrayUnion("deco"),
      });
    });
  });
// Add jersey color
db.collection("teams")
  .where("name", "==", "real madrid fc")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      db.collection("teams")
        .doc(doc.id)
        .update({
          color: {
            home: "white",
            away: "black",
          },
        });
    });
  });

// Add jersey color
db.collection("teams")
  .where("name", "==", "fc barcelona")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      db.collection("teams")
        .doc(doc.id)
        .update({
          color: {
            home: "red",
            away: "gold",
          },
        });
    });
  });
// Update away color to purple
db.collection("teams")
  .where("name", "==", "real madrid fc")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      db.collection("teams").doc(doc.id).update({
        "color.away": "purple",
      });
    });
  });

// Update away color to pink
db.collection("teams")
  .where("name", "==", "fc barcelona")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      db.collection("teams").doc(doc.id).update({
        "color.away": "pink",
      });
    });
  });
