pragma solidity ^0.6.0;

contract FoodCart{
	/* set owner of contract */
	address owner;

	/* a variable to track the most recent sku of a food item */
	uint8 skuCount; 

	/* an enum to store food item state */
	enum State {ForSale, Sold}

	/* add event to emit when a new food item is added to cart */
	event ForSale(string name, uint8 sku, uint16 price, uint8 state, bool foodItemExist);

	/* add event to emit when a new food item is sold */
	event Sold(string name, uint8 sku, uint16 price, uint8 state, bool foodItemExist);

	/* a struct to store details of a food item */
	struct FoodItem {
		string name;
		uint8 sku;
		uint16 price;
		State state;
		bool foodItemExist;
	}

	/* a map that maps sku to food item */
	mapping (uint8 => FoodItem) public foodItems;
	
	/* a modifier to check that food item exist */
	modifier doesFoodItemExist(uint8 _sku){
		require(foodItems[_sku].foodItemExist);
		_;
	}
	
	/* a modifier to check that an item is forsale */
	modifier isFoodItemForSale(uint8 _sku){
		require(foodItems[_sku].state == State.ForSale);
		_;
	}

	/* a modifier to check that the right price is paid for the food item */
	modifier hasBuyerPaidEnough(uint16 _price){
		require(msg.value >= _price);
		_;
	}

	constructor() public {
		owner = msg.sender;
		skuCount = 0;
	}

	
	function addFoodItem (string memory _name, uint16 _price) public {
		foodItems[skuCount] = FoodItem({name: _name, 
						sku: skuCount, 
						price: _price, 
						state: State.ForSale, 
						foodItemExist: true});
		emit ForSale(_name, skuCount , _price, uint8(State.ForSale), true);
		skuCount = skuCount + 1;
	}  

	function buyFoodItem (uint8 _sku)
	payable
	public
	doesFoodItemExist(_sku)
	isFoodItemForSale(_sku)
	hasBuyerPaidEnough(foodItems[_sku].price)
	{
		foodItems[_sku].state = State.Sold;
		foodItems[_sku].foodItemExist = false;
		emit Sold(foodItems[_sku].name, 
			  foodItems[_sku].sku, 
			  foodItems[_sku].price, 
			  uint8(foodItems[_sku].state), 
			  foodItems[_sku].foodItemExist);
	}

	function fetchFoodItem(uint8 _sku) 
	doesFoodItemExist(_sku)
	public 
	view 
	returns (string memory name, uint8 sku, uint16 price, uint8 state, bool foodItemExist){
		name = foodItems[_sku].name;
		sku = foodItems[_sku].sku;
		price = foodItems[_sku].price;
		state = uint8(foodItems[_sku].state);
		foodItemExist = foodItems[_sku].foodItemExist;

		return (name, sku, price, state, foodItemExist);
	}

	function () external payable {

	}
}