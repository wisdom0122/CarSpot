
import Main from './pages/main';
import Sever from './componets/Sever';
function App() {
    const position = { lat: 37.5005, lng: 127.038 };
    
    return (
        <div>
            <Main />
            <Sever position={position} />
        </div>
    );

}

export default App;
