This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
#   z u m a c 
 
 #   z u m a 
 
 
1. Introduction
    i. What we will build
    ii. What we will learn
    iii. What are requirements
    iv. What is CommerceJS
    v. What is NextJS
    vi. Conclusion
2. Create NextJS App and Deploy on Vercel
    run npx create-next-app
    answer questions
    create github repo
    push to github
    create vercel account
    connect to vercel
    deploy on vercel
3. Create Products On CommerceJS
    Create CommerceJS account
    Create a merchant
    Create a product
    Enter image, name, price, shipping, ...
    Create 2 more products
4. List Products
    Create utils/commerce.js
    Edit pages/index.js
    commerce.products.list()
    Show products in divs
5. Create React Context
    Create Store.js
    Create _app.js
    set publicKey in page props
6. Design MaterialUI Layout
    Install MaterialUI packages
    Create _document.js
    Create Layout.js
7. Style Product List Screen
    Use Layout
    Show alert on no product found
    Create Grid, Slide, ...
8. Create Product Details Screen
    create products/[id].js
    create 2 columns
9. Implement Add To Cart action
    check cart line items
    add or update item in the cart
    redirect to /cart
    Show Cart Menu on Header
    Create CART_RETRIEVE actions
    show cart items in header
10. Create Cart Screen
    add cart items columns
    add cart summary columns
    update cart item
    remove cart item
    proceed to checkout
    Create Checkout Screen
11. Create checkout form and order summary columns
    create steppers to make a wizard
    add customer details inputs
    add Shipping details inputs
    add Payment information inputs
12. Implement Checkout Actions
    Create order
    Show error on creating order
    Set order in Context
    redirect user to confirmation screen on success
13. Create order confirmation screen
    i. Show order summary
    ii. Show order details