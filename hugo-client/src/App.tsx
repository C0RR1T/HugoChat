import React from 'react';
import Members from "./Members";
import Chat from "./Chat";
import styled from "styled-components";

const ParentDiv = styled.div`
  display: grid;
  grid-template-columns: auto 20%;
`;

function App() {
    return (
        <ParentDiv>
            <Chat/>
            <Members/>
        </ParentDiv>
    );
}

export default App;