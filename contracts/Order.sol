pragma solidity ^0.8.3;
import "./OrderManager.sol";

// By abstracting the item into a separate contract, we can instantiate a new instance of Order
// which in turn creates a unique address for each Item
contract Order {
    uint256 public priceInWei;
    uint256 public pricePaid;
    uint256 public index;
    OrderManager parentContract;

    constructor(
        OrderManager _parentContract,
        uint256 _priceInWei,
        uint256 _index
    ) {
        priceInWei = _priceInWei;
        index = _index;
        parentContract = _parentContract;
    }

    receive() external payable {
        require(pricePaid == 0, "Order already paid for");
        require(priceInWei == msg.value, "Only full payments allowed");
        pricePaid += msg.value;
        // Calls triggerPayment function in OrderManager with low-level function
        // address(parentContract).transfer(msg.value) would not provide enough gas to execute updates in OrderManager
        (bool success, ) =
            address(parentContract).call{value: msg.value}(
                abi.encodeWithSignature("triggerPayment(uint256)", index)
            );
        require(success, "Transaction wasn't successful. Canceling.");
    }

    fallback() external {}
}
