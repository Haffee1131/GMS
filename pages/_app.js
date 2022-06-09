import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Header from "../Components/Header/Header";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
