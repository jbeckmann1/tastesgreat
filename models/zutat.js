const mongoose = require('mongoose');
const zutatSchema = new mongoose.Schema({
// name: {
// type: String,
// required: true
// },
// nährwerte: {
// kcal: String,
// 		kohlenhydrate: String,
// 		proteine: String,
// 		fette: String,
// 		ballaststoffe: String,
// },
// bild: String,
// 	kategorie: String,
// 	saison: String,
// })

content: {
type: String,
required: true
},
date: {
type: Date,
default: Date.now
}
})
module.exports = mongoose.model('Zutat',zutatSchema);