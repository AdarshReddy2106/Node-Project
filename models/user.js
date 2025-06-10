const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    cart:{
        items: [
            {productId: {type: Schema.Types.ObjectId, required:true}, 
            quantity: { type: Number, required: true}
        }]
    }
})


module.exports = mongoose.model('User', userSchema)


/* const mongodb = require('mongodb')
const getDb = require('../helper/database').getDb  

const ObjectId = mongodb.ObjectId

class User {
    constructor(username, email, cart, id) {
        this.name = username
        this.email = email
        this.cart = cart; //{items:[]}
        this._id = id;
    }

    save () {
        const db = getDb()
        return db.collection('users').insertOne(this)
    }

    addToCart(product) {
        // Initialize cart if it doesn't exist
        if (!this.cart || !this.cart.items) {
            this.cart = { items: [] };
        }
        
        // Fix corrupted cart data structure if it exists
        if (this.cart.items.length > 0 && Array.isArray(this.cart.items[0])) {
            this.cart.items = this.cart.items[0];
        }
        
        const cartProductIndex = this.cart.items.findIndex(cp =>{
            return cp.productId.toString() === product._id.toString();
        })

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items]
        
        if (cartProductIndex>=0){
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity})
        }

        // FIX: Remove the extra array brackets
        const updatedCart = {items: updatedCartItems}
        const db =getDb();

        return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {cart : updatedCart}})
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });
        
        return db.collection('products')
            .find({_id: {$in: productIds}})
            .toArray()
            .then(products => {
                return products.map(p => {
                    // Find the corresponding cart item for this product
                    const cartItem = this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    });
                    
                    // Return product with cartItem quantity attached
                    return {
                        ...p,
                        quantity: cartItem.quantity
                    };
                });
            });
    }

    deleteItemFromCart(productId){
        const updateCartItems = this.cart.items.filter(item=>{
            return item.productId.toString() !== productId.toString();
        })
        const db =getDb();

        return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {cart : {items: updateCartItems}}})
    }

    addOrder() {
        const db = getDb();
        return this.getCart().then(products =>{
            const order = {
            items : products,
            user : {
                _id : new ObjectId(this._id),
                name : this.name,
                // email : this.email
            }}
            return db.collection('orders').insertOne(order)
        }).then(result=>{
            this.cart = {items:[]};
             return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {cart : {items: []}}})
        });
    }

    getOrders(){
        const db = getDb();
        return db.collection('orders').find({
            'user._id': new ObjectId(this._id)
        }).toArray()
    }

    static findById(userId) {
        const db = getDb();
        console.log('Searching for user with ID:', userId);
        return db.collection('users').findOne({_id: new ObjectId(userId)})
            .then(user=>{
                console.log('Found user:', user)
                return user
            })
            .catch(err=>{
                console.log('Error finding user:', err)
                return null;
            })
    }
}

module.exports = User; // export the User model so it can be used in other files */