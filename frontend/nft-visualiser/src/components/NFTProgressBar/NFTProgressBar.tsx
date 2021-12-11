import React from "react";
import styled from 'styled-components';

const ProgressBarOuter = styled.div`
    background-color: lightgray;
    border-radius: 13px;
    padding: 3px;
`;

const ProgressBarInner = styled.div`
    background-color: #0077ff;
    width: 40%;
    height: 10px;
    border-radius: 7px;
`;

export interface IProgressBar {
    percent: number
}

const NFTProgressBar = (props: IProgressBar): JSX.Element => {
    return (
        <ProgressBarOuter>
            <ProgressBarInner style={{ width: `${props.percent}%` }} />
        </ProgressBarOuter>
    );
}

export default NFTProgressBar;