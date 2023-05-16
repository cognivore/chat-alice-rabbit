import React from 'react';
import Transcript from './Transcript';
import ChatApp from './ChatApp';

const Index: React.FC = () => {
    return <h1>Check
        <ul>
            <li><a href="/sayas/Rabbit">Rabbit</a>,</li>
            <li><a href="/sayas/Alice">Alice</a>, or</li>
            <li><a href="/Transcript">Transcript</a></li>
        </ul>
    </h1>;
}

const Nope: React.FC<{ expected: string, got: string }> = ({ expected, got }) => {
    return <h1>Expected: <span>{expected}</span>, got: <span>{got}</span></h1>;
}

// This probably should be using react Router
// https://github.com/doma-engineering/megalith/blob/f19776a2d27a721a4698c815ff39e7e57340d05b/priv/megaui/src/Router.tsx#L30
const SimpleRouter: React.FC<{ path: string[] }> = ({ path }) => {
    const [, verb, noun] = path;
    // If we're in "/sayas/:user", create <ChatApp title="{{user}'s Chat" sender={user} />
    switch (verb.toLowerCase()) {
        case 'sayas':
            return (noun ? <ChatApp title={noun + "'s Chat"} sender={noun} /> : <Nope expected="a nickname in second part of the url path" got="nothing" />);
        case 'transcript':
            return <Transcript />
        default:
            return <Index />
    }
}

const App: React.FC = () => {
    return <div>
        <SimpleRouter path={window.location.pathname.split('/')} />
    </div>;
};

export default App;
