import styles from "../../styles/Header.module.css";
import Link from "next/link";

export default function Header() {
	return (
		<>
			<div className={styles.header}>
				<div className={styles.inner_div}>
					<Link href="/">
						<a className={styles.home_link}>Home</a>
					</Link>
				</div>
				<h2>Google University</h2>
				<div className={styles.inner_down_div}>
					<Link href="/admin">
						<a className={styles.home_link}>Admin</a>
					</Link>
				</div>
			</div>
		</>
	);
}
