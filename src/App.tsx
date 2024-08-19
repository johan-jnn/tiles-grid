import Grid from "./components/Grid";
import Stats from "./components/tiles/Stats";
import Content from "./components/tiles/Content";
import LogoTile from "./components/tiles/Logo";
import MainHeader from "./components/tiles/MainHeader";
import QRCodes from "./components/tiles/QRCodes";

function App() {
	return (
		<Grid
			tiles={[LogoTile, MainHeader, Content, QRCodes, Stats]}
			behavior={{
				auto_size: "height",
			}}
		/>
	);
}

export default App;
