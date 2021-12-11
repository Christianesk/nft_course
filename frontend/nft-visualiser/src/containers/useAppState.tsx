import { useState, useEffect } from 'react';
import { INFTAttribute } from '../components/NFTModal/NFTModal';
import { environments } from "../environments/environments";
import { ethers } from 'ethers';
import { connect } from '../helpers';
const axios = require('axios');

export interface IAppState {
    nfts: INFTData[];
    showModal: boolean;
    selectedNft: INFTData;
    toggleModal: (i: number) => void;
}

export interface INFTData {
    name: string;
    symbol: string;
    copies: number;
    image: string;
    description: string;
    attributes: INFTAttribute[];
}

export const useAppState = (): IAppState => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedNft, setselectedNft] = useState<INFTData>({
        name: "",
        copies: 0,
        symbol: "",
        image: "https://via.placeholder.com/400",
        description: "",
        attributes: [{ trait_type: "", value: "" }]
    });
    let initialNfts: INFTData[] = [
        { attributes: [{ trait_type: "t", value: "2" }, { trait_type: "2", value: "3" }], name: "Super Mario", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150", description: "test" },
        { attributes: [{ trait_type: "t", value: "2" }], name: "Super Mario 1", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150", description: "test" },
        { attributes: [{ trait_type: "t", value: "2" }], name: "Super Mario 2", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150", description: "test" },
        { attributes: [{ trait_type: "t", value: "2" }], name: "Super Mario 3", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150", description: "test" },
        { attributes: [{ trait_type: "t", value: "2" }], name: "Super Mario", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150", description: "test" },
        { attributes: [{ trait_type: "t", value: "2" }], name: "Super Mario 1", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150", description: "test" },
        { attributes: [{ trait_type: "t", value: "2" }], name: "Super Mario 2", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150", description: "test" },
        { attributes: [{ trait_type: "t", value: "2" }], name: "Super Mario 3", symbol: "SMWC", copies: 10, image: "https://via.placeholder.com/150", description: "test" },
    ];
    const [nfts, setNfts] = useState<INFTData[]>(initialNfts);

    useEffect(() => {
        (async () => {
            const address = await connect();
            if (address) {
                getNfts(address)
            }
        })()
    }, []);

    const toggleModal = (i: number): void => {
        if (i >= 0) {
            setselectedNft(nfts[i]);
        }

        setShowModal(!showModal);
    }

    const getMetadataFromIpfs = async (tokeURI: string) => {
        let metadata = await axios.get(tokeURI);
        return metadata.data;
    }

    const getNfts = async (address: string): Promise<void> => {
        const rpc = environments.MUMBAI_RPC;
        const ethersProvider = new ethers.providers.JsonRpcProvider(rpc);

        let abi: string[] = [
            "function symbol() public view returns(string memory)",
            "function tokenCount() public view returns(uint256)",
            "function uri(uint256 _tokenId) public view returns(string memory)",
            "function balanceOfBatch(address[] accounts,uint256[] ids) public view returns(uint256[])"
        ];



        let nftCollection: ethers.Contract = new ethers.Contract(
            environments.CONTRACT_ADDRESS,
            abi,
            ethersProvider
        );

        let numberOfNfts = (await nftCollection.tokenCount()).toNumber();
        let collectionSymbol = await nftCollection.symbol();

        let accounts = Array(numberOfNfts).fill(address);
        let ids = Array.from({ length: numberOfNfts }, (_, i) => i + 1);
        let copies = await nftCollection.balanceOfBatch(accounts, ids);

        let tempArray = [];
        let baseUrl = "";

        for (let i = 1; i <= numberOfNfts; i++) {
            if (i === 1) {
                let tokenURI = await nftCollection.uri(i);
                baseUrl = tokenURI.replace(/\d+.json/, "");
                let metadata = await getMetadataFromIpfs(tokenURI);
                metadata.symbol = collectionSymbol;
                metadata.copies = copies[i - 1];
                tempArray.push(metadata);
            } else {
                let metadata = await getMetadataFromIpfs(baseUrl + `${i}.json`);
                metadata.symbol = collectionSymbol;
                metadata.copies = copies[i - 1];
                tempArray.push(metadata);
            }
        }
        setNfts(tempArray);
    }

    return {
        nfts,
        showModal,
        selectedNft,
        toggleModal
    }
}