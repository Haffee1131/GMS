import { dbConnect } from "../../../utils/dbconnect";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
	const { db } = await dbConnect();
	const { method } = req;
	const issueId = req.body;

	switch (method) {
		case "GET":
			try {
				let issues = await db.collection("issues").find({}).toArray();
				res
					.status(200)
					.json({ success: true, data: JSON.parse(JSON.stringify(issues)) });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case "POST":
			try {
				const issue = await db.collection("issues").insertOne(req.body);

				res.status(201).json({ success: true, data: issue });
			} catch (error) {
				res.status(400).json({
					success: false,
					msg: "Please check field constraints",
				});
			}
			break;
		case "DELETE":
			try {
				const deletedIssue = await db
					.collection("issues")
					.deleteOne({ _id: new ObjectId(JSON.parse(issueId)) });

				if (!deletedIssue) {
					console.log("NO issue");
					return res.status(400).json({ success: false });
				}
				console.log("Deleted");
				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				console.log("EEEEEEEerrrrrooorrr: ", error);

				return res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
	}
}
