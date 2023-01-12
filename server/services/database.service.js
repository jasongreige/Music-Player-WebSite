const { MongoClient } = require("mongodb");
const DB_CONSTS = require("../utils/env");

class DatabaseService {
  /**
   * @param {string} collectionName nom de la collection sur MongoDB
   * @param {Array} data tableau contenant les documents à mettre dans la collection
   */
  async populateDb (collectionName, data) {
    await this.db.collection(collectionName).find({}).toArray().then(async (res) => {
        if (res.length === 0) {
            await this.db.collection(collectionName).insertMany(data);
        }
    });
  }

  // Méthode pour établir la connection entre le serveur Express et la base de données MongoDB
  async connectToServer (uri) {
    try {
      this.client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await this.client.connect();
      this.db = this.client.db(DB_CONSTS.DB_DB);
      // eslint-disable-next-line no-console
      console.log("Successfully connected to MongoDB.");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}

const dbService = new DatabaseService();

module.exports = { dbService };
