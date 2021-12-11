# NFT Visualizer

## Config environments

Creates `environments.ts` file in environments folder and insert this:

``` typescript
export const environments: {
    MUMBAI_RPC: string;
    CONTRACT_ADDRESS: string;
} = {
    MUMBAI_RPC: 'https://rpc-mumbai.maticvigil.com/',
    CONTRACT_ADDRESS: 'your address contract',
}
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
