import React from 'react';
import styled from 'styled-components';
import NFTCard from './components/NFTCard/NFTCard';
import NFTModal from './components/NFTModal/NFTModal';
import { INFTData, useAppState } from "./containers/useAppState";

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
  row-gap: 40px;

  @media(max-width: 1200px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media(max-width: 900px){
    grid-template-columns: 1fr 1fr;
  }

  @media(max-width: 600px){
    grid-template-columns: 1fr;
  }
`;

function App() {

  const { nfts, showModal, selectedNft, toggleModal } = useAppState();

  return (
    <div className="App">
      <Container>
        <Title>Super Mario World Collection</Title>
        <SubTitle>The rarest and best of Super Mario World</SubTitle>
        <Grid>
          {nfts.map((nft: INFTData, index: number) =>
            <NFTCard
              name={nft.name}
              symbol={nft.symbol}
              copies={nft.copies}
              image={nft.image}
              description={nft.description}
              attributes={nft.attributes}
              key={index}
              toggleModal={() => toggleModal(index)}
            />
          )}
        </Grid>
        {
          showModal && (
            <NFTModal
              name={selectedNft?.name}
              symbol={selectedNft?.symbol}
              copies={selectedNft?.copies}
              image={selectedNft?.image}
              description={selectedNft.description}
              attributes={selectedNft.attributes}
              toggleModal={() => toggleModal(-1)}
            />
          )
        }
      </Container>
    </div>
  );
}

export default App;
