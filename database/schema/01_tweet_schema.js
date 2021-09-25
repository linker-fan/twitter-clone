conn = Mongo();
db = conn.getDB("twitter-clone");

db.createCollection("tweets", {
    validator: {
        $jsonSchema: {

        },
    },
});