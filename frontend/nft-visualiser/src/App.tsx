import React from 'react';
import styled from 'styled-components';
import NFTCard, { INFTCard } from './components/NFTCard/NFTCard';

const Title = styled.h1`
  margin: 0;
  text-align: center;
`;

const SubTitle = styled.h4`
  color: gray;
  margin-top: 0;
  text-align: center;
`;

const Container = styled.div`
  width: 70%auto;
  max-width: 1200px;
  margin: auto;
  margin-top: 100px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 10%;
`;

function App() {

  let nfts: INFTCard[] = [
    { name: "Super Mario", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Super Mario 1", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Super Mario 2", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Super Mario 3", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Super Mario", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Super Mario 1", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Super Mario 2", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
    { name: "Super Mario 3", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="App">
      <Container>
        <Title>Super Mario World Collection</Title>
        <SubTitle>The rarest and best of Super Mario World</SubTitle>
        <Grid>
          {nfts.map((nft: INFTCard, index: number) =>
            <NFTCard name={nft.name} symbol={nft.symbol} copies={nft.copies} image={nft.image} key={index} />
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
