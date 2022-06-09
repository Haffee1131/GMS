import styles from "../../styles/Header.module.css";
import Link from "next/link";

export default function Header() {
	return (
		<>
			<div className={styles.header}>
				<div className={styles.inner_div}>
					<Link href="http://localhost:3000">
						<a className={styles.home_link}>Home</a>
					</Link>
				</div>
				<pre>Google University</pre>
				<div className={styles.inner_down_div}>
					<Link href="http://localhost:3000/admin">
						<a className={styles.home_link}>Admin</a>
					</Link>
				</div>
			</div>
		</>
	);
}
