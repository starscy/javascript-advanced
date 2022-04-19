Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: '/img/products/',
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
    <ul class="products__list">
            <product v-for="item of filtered" :key="item.id_product" :imgCatalog="imgCatalog" :product="item"></product>
        </ul>
    `
});

Vue.component('product', {
    props: ['product', 'imgCatalog'],

    data() {
        let product_img = this.imgCatalog +"product_"+ this.product.id_product + ".jpg"
        return {
            product_img,
        }
    },


    template: `
    <li class="products__item ">
    <div class="products__wrapper">
        <img :src="this.product_img"  alt="Some img" class="products__img" :width='360' :height='420'>
        <div class="products__overlay">
            <button class="products__addcart" @click="$root.$refs.cart.addProduct(product)"> 
            <span class="products__addcart-text">Add to Cart
            </span>
            </button>
        </div>  
        <div class ="products__card-about">
            <h3 class="text products__card-title">{{product.product_name}}</h3>
            <p class="text products__text">{{product.product_cat}}</p>
            <p class="text products__price">{{product.price}}</p>
         </div>
     </div>
     </li>    

    
    `
})