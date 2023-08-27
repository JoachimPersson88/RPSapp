//App.tsx
import './App.css'
import Token from "./components/TokenComponent";

function App() {
    return (
        <div style={{
            backgroundImage: "url('../src/components/img/background.png')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        }}>
            <Token />
        </div>
    );
}

export default App;
