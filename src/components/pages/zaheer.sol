// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SupplyChain {
    address public manufacturer;
    mapping(uint256 => Product) public products;

    struct Product {
        string qrCode;
        address owner;
        string location;
        uint256 quantity;
    }

    event ProductManufactured(
        uint256 indexed productId,
        string qrCode,
        address indexed owner,
        string location,
        uint256 quantity
    );
    event ProductTransferred(
        uint256 indexed productId,
        address indexed from,
        address indexed to,
        uint256 quantity
    );
    event ProductSold(
        uint256 indexed productId,
        address indexed retailer,
        address indexed customer,
        uint256 quantity
    );

    constructor() {
        manufacturer = msg.sender;
    }

    modifier onlyManufacturer() {
        require(
            msg.sender == manufacturer,
            "Only the manufacturer can call this function"
        );
        _;
    }

    function manufactureProduct(
        uint256 productId,
        string memory _qrCode,
        string memory _location,
        uint256 _quantity
    ) external onlyManufacturer {
        products[productId] = Product(
            _qrCode,
            msg.sender,
            _location,
            _quantity
        );
        emit ProductManufactured(
            productId,
            _qrCode,
            msg.sender,
            _location,
            _quantity
        );
    }

    function transferProduct(
        uint256 productId,
        address _to,
        uint256 _quantity
    ) external {
        require(
            products[productId].owner == msg.sender,
            "You are not the owner of this product"
        );
        require(
            products[productId].quantity >= _quantity,
            "Insufficient quantity"
        );

        products[productId].quantity -= _quantity;

        products[productId].owner = _to;

        emit ProductTransferred(productId, msg.sender, _to, _quantity);
    }

    function sellProduct(
        uint256 productId,
        address _customer,
        uint256 _quantity
    ) external {
        require(
            products[productId].owner == msg.sender,
            "You are not the owner of this product"
        );
        require(
            products[productId].quantity >= _quantity,
            "Insufficient quantity"
        );

        products[productId].quantity -= _quantity;

        emit ProductSold(productId, msg.sender, _customer, _quantity);
    }
}
