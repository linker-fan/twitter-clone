conn = Mongo();
db = conn.getDB("twitter-clone");

db.createCollection("users", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			properties: {
				username: {
					bsonType: "string"
				},
				email: {
					bsonType: "string"
				},
				passwordHash: {
					bsonType: "string"
				},
				created: {
					bsonType: "timestamp"
				},
				updated: {
					bsonType: "timestamp"
				},
			},
		},
	},
});
