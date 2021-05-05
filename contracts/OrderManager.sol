pragma solidity ^0.8.3;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Order.sol";

// Ownable comes from OpenZeppelin
contract OrderManager is Ownable {
    enum SupplyChainState {Created, Paid, Delivered}
    struct S_Order {
        Order _order;
        string _identifier;
        uint256 _orderTotal;
        OrderManager.SupplyChainState _state;
    }

    mapping(uint256 => S_Order) public orders;
    uint256 orderIndex;
    event SupplyChainStep(
        uint256 _orderIndex,
        uint256 _step,
        address _itemAddress
    );

    function createOrder(string memory _identifier, uint256 _orderTotal)
        public
        onlyOwner
    {
        Order order = new Order(this, _orderTotal, orderIndex);
        orders[orderIndex]._order = order;
        orders[orderIndex]._identifier = _identifier;
        orders[orderIndex]._orderTotal = _orderTotal;
        orders[orderIndex]._state = SupplyChainState.Created;
        emit SupplyChainStep(
            orderIndex,
            uint256(orders[orderIndex]._state),
            address(order)
        );
        orderIndex++;
    }

    function triggerPayment(uint256 _orderIndex) public payable {
        require(
            orders[_orderIndex]._orderTotal == msg.value,
            "Only full payments accepted"
        );
        require(
            orders[_orderIndex]._state == SupplyChainState.Created,
            "Order is further in the chain"
        );

        orders[_orderIndex]._state = SupplyChainState.Paid;
        emit SupplyChainStep(
            _orderIndex,
            uint256(orders[_orderIndex]._state),
            address(orders[_orderIndex]._order)
        );
    }

    function triggerDelivery(uint256 _orderIndex) public onlyOwner {
        require(
            orders[_orderIndex]._state == SupplyChainState.Paid,
            "Order is further in the chain"
        );
        orders[_orderIndex]._state = SupplyChainState.Delivered;
        emit SupplyChainStep(
            _orderIndex,
            uint256(orders[_orderIndex]._state),
            address(orders[_orderIndex]._order)
        );
    }
}
