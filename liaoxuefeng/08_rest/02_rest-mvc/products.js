// database simulation
let id = 0;

const nextId = () => {
    return `p${ id++ }`;
};

class Product {
    constructor ( name, manufacturer, price ) {
        this.id = nextId();
        this.name = name;
        this.manufacturer = manufacturer;
        this.price = price;
    }
}

const products = [
    new Product( "iPhone", "apple", 299 ),
    new Product( "iPad", "apple", 399 ),
    new Product( "iWatch", "apple", 199 )
];

// manager
const manager = {
    getProducts () {
        return products;
    },
    getProduct ( id ) {
        const res = products.filter( product => product.id === id );
        return res[0];
    },
    createProduct ( data ) {
        const product = new Product( data.name, data.manufacturer, data.price );
        products.unshift( product );
    },
    alterProduct ( data ) {
        const product = this.getProduct( data.id );
        Object.assign( product, data );
    },
    deleteProduct ( id ) {
        products = products.filter( product => product.id !== id );
    }
};

module.exports = manager;