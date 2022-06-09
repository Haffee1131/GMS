import IssueCard from "../Components/IssueCard/IssueCard";

import styles from "../styles/admin.module.css";

export default function Admin({ issues }) {
	return (
		<>
			<div className={styles.issues_cards_container}>
				{issues.data.map((issue) => {
					return (
						<IssueCard
							key={issue._id}
							id={issue._id}
							name={issue.name}
							email={issue.email}
							category={issue.category}
							issue={issue.issue}
						/>
					);
				})}
			</div>
		</>
	);
}

export async function getServerSideProps(ctx) {
	// get the current environment
	let dev = process.env.NODE_ENV !== "production";
	let DEV_URL = process.env.DEV_URL;
	let PROD_URL = process.env.PROD_URL;

	// request posts from api
	let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/issues`, {
		headers: {
			Accept: "application/json, text/plain, */*",
			"User-Agent": "*",
		},
	});
	// extract the data
	let data = await res.json();

	return {
		props: {
			issues: data,
		},
	};
}
