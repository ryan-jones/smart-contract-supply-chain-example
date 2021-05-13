import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import OrderManager from "src/contracts/OrderManager.json";
import getWeb3 from "./getWeb3";
import Routes from "./routes";
import store from "./store";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

interface Web3ContextProps {
  web3: any;
  owner: string;
  orderManager: any;
}
export const Web3Context = React.createContext<Partial<Web3ContextProps>>({
  web3: null,
  owner: "",
  orderManager: null,
});

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [web3, setWeb3] = useState(null);
  const [orderManager, setOrderManager] = useState(null);
  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3Instance: any = await getWeb3();
        // Use web3 to get the user's accounts.
        const userAccounts: string[] = await web3Instance.eth.getAccounts();
        const networkId: string = await web3Instance.eth.net.getId();
        const manager = new web3Instance.eth.Contract(
          OrderManager.abi,
          OrderManager.networks[networkId]?.address
        );
        setAccounts(userAccounts);
        setWeb3(web3Instance);
        setLoaded(true);
        setOrderManager(manager);
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
    <Provider store={store}>
      <Web3Context.Provider
        value={{ web3, owner: accounts[0] || "", orderManager }}
      >
        <main className="App">
          <Routes />
        </main>
        <ToastContainer
          bodyClassName="toast-body"
          className="toast-container"
        />
      </Web3Context.Provider>
    </Provider>
  );
};

export default App;
