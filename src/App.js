import styles from "./App.styles";
import Jokeslist from "./components/jokes/Jokeslist";
function App() {
  return (
    <div style={styles.app} >
      <Jokeslist />
    </div>
  )
}
export default App;
