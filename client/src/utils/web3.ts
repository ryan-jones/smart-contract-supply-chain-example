import Web3 from "web3";

export const formatWei = (value: string | number): number => {
  return Number(Web3.utils.fromWei(value.toString(), "ether"));
};

export const convertToWei = (value: string): string => {
  return Web3.utils.toWei(value, "ether");
};
