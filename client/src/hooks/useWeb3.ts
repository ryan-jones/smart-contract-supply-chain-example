/** @format */

import { useContext } from "react";
import { Web3Context } from "../App";

const useWeb3 = () => {
  const { web3, owner = "", orderManager } = useContext(Web3Context);

  const createContract = async (contract: any) => {
    try {
      const networkId: string = await web3.eth.net.getId();

      return new web3.eth.Contract(
        contract.abi,
        contract.networks[networkId] && contract.networks[networkId].address
      );
    } catch (err) {
      alert("Error occurred when generating new contract");
      console.error(err);
    }
  };

  return {
    web3,
    owner,
    orderManager,
    createContract,
  };
};

export default useWeb3;
