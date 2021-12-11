import React from "react";
import styled from 'styled-components';
import { INFTCard, NFTPhoto } from "../NFTCard/NFTCard";
import NFTProgressBar from "../NFTProgressBar/NFTProgressBar";


const Modal = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);
`;

const ModalContent = styled.div`
    position: relative;
    width: 900px;
    margin: auto;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    @media(max-width: 900px){
        width: 400px;
    }
`;

const ModalTitle = styled.h1`
    margin: 0;
`;

const Paragraph = styled.p`
    margin: 0 0 15px 0;
`;

const SectionText = styled.h3`
    margin: 5px 0 5px 0;
`;

const ModalGrid = styled.div`
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;

    @media(max-width: 900px){
        grid-template-columns: 1fr;
    }
`;

const CloseButton = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    padding: 20px 25px 0 0;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
`;

const AttributeText = styled.h4`
    color: gray;
    margin: 0;
    display: inline;
`;

export interface INFTAttribute {
    trait_type: string;
    value: string;
}

const NFTModal = (nft: INFTCard): JSX.Element => {
    return (
        <Modal >
            <ModalContent >
                <ModalGrid>
                    <NFTPhoto style={{ backgroundImage: `url(${nft && nft.image})`, height: 400, width: 400 }}></NFTPhoto>
                    <div>
                        <ModalTitle>{nft.name}</ModalTitle>
                        <Paragraph>{`You own ${nft.copies} copies`}</Paragraph>
                        <SectionText>Description</SectionText>
                        <Paragraph style={{ width: 400 }}>{nft.description}</Paragraph>
                        <SectionText>Attributes</SectionText>
                        {
                            nft.attributes &&
                            nft.attributes.map((attribute: INFTAttribute, index: number) =>
                                <div key={index}>
                                    <div style={{ margin: "10px 0px 5px 0px" }}>
                                        <AttributeText>{attribute.trait_type}</AttributeText>
                                        <AttributeText style={{ float: "right" }}>{attribute.value}</AttributeText>
                                    </div>
                                    <NFTProgressBar percent={Number(attribute.value) * 10}></NFTProgressBar>
                                </div>
                            )
                        }
                    </div>
                </ModalGrid>
                <CloseButton onClick={() => nft.toggleModal()}>
                    &times;
                </CloseButton>
            </ModalContent>
        </Modal>
    );
}

export default NFTModal;