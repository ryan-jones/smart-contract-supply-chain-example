import React, { useEffect, useState } from "react";
import getWeb3 from "./getWeb3";

import Navigation from "./components/Navigation";
import Routes from "./routes";
import "./App.css";

interface Web3ContextProps {
  web3: any;
  owner: string;
}
export const Web3Context = React.createContext<Partial<Web3ContextProps>>(null);

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [accounts, setAccounts] = useState<string[]>(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3: any = await getWeb3();
        // Use web3 to get the user's accounts.
        const userAccounts: string[] = await web3.eth.getAccounts();
        setAccounts(userAccounts);
        setWeb3(web3);
        setLoaded(true);
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    init();
  }, []);

  if (!loaded) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <Web3Context.Provider value={{ web3, owner: accounts[0] }}>
      <main className="App">
        <Navigation />
        <Routes />
      </main>
    </Web3Context.Provider>
  );
};

export default App;
