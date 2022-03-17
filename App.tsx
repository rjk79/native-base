
import Routes from './Routes';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import { config } from './overmind';

const overmind = createOvermind(config);


export default function App() {
    return (
        <Provider value={overmind}>
            <Routes />
        </Provider>
    );
}
