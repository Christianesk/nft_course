import React from "react";
import styled from 'styled-components';
import { INFTAttribute } from "../NFTModal/NFTModal";

const NFTCardStyled = styled.div`
    width: 200px;
    height: 250px;
    margin: auto;
    border-radius: 10px;
    padding: 0px;
    cursor: pointer;
    box-shadow: 8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff;

`;

export const NFTPhoto = styled.div`
    display: block;
    width: 200px;
    height: 200px;
    background-position: center center;
    background-size: cover;
    margin: auto;
    border-radius: 10px;
`;

const NFTCollectionText = styled.div`
    font-size:12px;
    color: gray;
`;

const NFTName = styled.div`
    font-size:12px;
    font-weight: bold;
    display: inline;
`;



export interface INFTCard {
    name: string;
    symbol: string;
    copies: number;
    image: string;
    description: string;
    attributes: INFTAttribute[];
    toggleModal: () => void;
}

const NFTCard = (nft: INFTCard): JSX.Element => {
    return (
        <NFTCardStyled onClick={() => nft.toggleModal()} >
            <NFTPhoto style={{ backgroundImage: `url(${nft && nft.image})` }} />
            <div style={{ margin: 5 }}>
                <NFTCollectionText>{nft && nft.symbol}</NFTCollectionText>
                <NFTName>{nft && nft.name}</NFTName>
                <NFTName style={{ float: "right" }}>{`x${nft && nft.copies}`}</NFTName>
            </div>
        </NFTCardStyled>
    );
}

export default NFTCard;