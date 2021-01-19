Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `
        <div class="product">

            <div class="product-image">
                <img v-bind:src="image">
            </div>

            <div class="product-info">
                <h1> {{title}} </h1>
                <p v-if="inventory > 10">In stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
                <p v-else>Out of stock</p>
                <p>User is premium: {{ shipping }} </p>
                
                <h3>Detail</h3>
                <ul>
                    <li v-for="detail in datails">{{ detail }}</li>                    
                </ul>

                <div>
                    <h3>Color</h3>                    
                <ul  v-for="(color,index) in colors" :key="color.variantId">
                    <li class="color-box" :style="{ backgroundColor:color.variantColor } " @mouseover="updateProduct(index)">{{  }}</li>
                </ul>
                </div>

                <button v-on:click="addToCart" v-bind:disabled="!inStuck" :class="{ disabledButton: !inStuck }" >Add to cart</button>
            </div>

            <product-review @review-submit="addReview"/>

        </div>
    `,
    data: () => {
        return ({
            brand: 'Vue Mastery',
            select: 0,
            product: 'Socks',
            selectVariant: 0,
            inventory: 10,
            datails: ['80% Cotton', '20% Polyester', 'Gender-neutral'],
            colors: [
                {
                    variantId: 1,
                    variantColor: 'Green',
                    src: './1.jpg',
                    quantity: 10
                },
                {
                    variantId: 2,
                    variantColor: 'Blue',
                    src: './2.jpg',
                    quantity: 0
                }
            ],
            reviews:[]

        })
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.colors[this.select].variantId)
        },
        updateProduct(value) {
            this.select = value
        }
    },
    computed: {
        title() {
            return this.brand + ' | ' + this.product
        },
        image() {
            return this.colors[this.select].src
        },
        inStuck() {
            return this.colors[this.select].quantity
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        },
        addReview(productReview){
            this.reviews.push(productReview)
        }
    }
})

Vue.component('product-review',{
    template:`
        <form class="review-form" @submit.prevent="onSubmit">
            <p>
                <label for="name">Name: </label>
                <input id="name" v-model="name">  
            </p>
            <p>
                <label for="review">Review: </label>
                <textarea id="review" v-model="review"> </textarea>
            </p>
            <p>
                <label for="rating">Rating: </label>
                <select id="rating" v-model.number="rating">         
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            <p>
                <input type="submit" value="Submit"> 
            </p>
        </form>
    `,
    data(){
        return{
            name:null,
            review:null,
            rating:null
        }
    },
    methods:{
        onSubmit(){
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            this.$emit('review-submit',productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
    }
})

var app = new Vue({
    el: '#app',
    data(){
        return({
            premium: true,
            cart: []
        })
    },
    methods: {
        apdateCart(id) {
            this.cart.push(id)
        }
    }

})