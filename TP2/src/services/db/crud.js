const { getCollection } = require('./connection');

async  function  findOne(collectionName, query, options = {}) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.findOne(query, options);
		return  result;
	} catch (e) {
		console.log(`Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

// async  function  find(collectionName, query, options = {}) {
// }

// async  function  insertOne(collectionName, query, options = {}) {
// }

// async  function  insertMany(collectionName, query, options = {}) {
// }

// async  function  updateOne(collectionName, query, options = {}) {
// }

// async  function  updateMany(collectionName, query, options = {}) {
// }

// async  function  replace(collectionName, query, options = {}) {
// }

// async  function  deleteOne(collectionName, query, options = {}) {
// }

// async  function  deleteMany(collectionName, query, options = {}) {
// }



