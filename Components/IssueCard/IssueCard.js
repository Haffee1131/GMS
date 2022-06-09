import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";

import styles from "../../styles/issueCard.module.css";

export default function IssueCard({ id, name, email, category, issue }) {
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		if (isDeleting) {
			deleteIssue();
		}
	}, [isDeleting]);

	async function deleteIssue() {
		try {
			const deleted = await fetch("http://localhost:3000/api/issues", {
				method: "DELETE",
				body: JSON.stringify(id),
			});
			setIsDeleting(false);
			location.reload();
		} catch (error) {
			console.log(error);
		}
	}

	async function handleDelete() {
		setIsDeleting(true);
	}

	return (
		<>
			{!isDeleting ? (
				<div className={styles.main}>
					<div className="ui card">
						<div className="content">
							<span className="header">{name}</span>
							<div className="meta">
								<span className="email">{email}</span>
							</div>

							<h4>{category}</h4>

							<div className="description">{issue}</div>
						</div>
						<div className="extra content">
							<a onClick={handleDelete}>
								<i className="trash icon"></i>
								Delete Issue
							</a>
						</div>
					</div>
				</div>
			) : (
				<div>
					<center>
						<h3> Deleting...</h3>
					</center>
					<br />
					<br />
					<Loader active inline="centered" />
				</div>
			)}
		</>
	);
}
