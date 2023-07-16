[Russian version](https://github.com/Vasily257/sborka-test-task/blob/master/README-RU.md)

# SB Shop
This project is a test task for the "layout designer-perfectionist" position at [Sborka Project](https://sborkaproject.com/).
  
## Functionality  
The project is a single-page website with responsive layout built using flexbox and grid layout. 
The website user can:
- change the items quantity
- enter saved card data
- receive hints after each card input

## Features 
The project has several features:
1. The project was developed with pixel-perfect precision, but there are two discrepancies with the [design](https://www.figma.com/file/dc1fCaC8ctLXSSTPZXyAJR/HTML-Test-%7C-16.07.2023?type=design&node-id=0%3A1&mode=design&t=13A0iLcVnBtP9WsU-1):
- the same distance between digits is used in the payment steps
- a typo in the word "conditions" has been corrected
3. The project is divided into simple components (includes) and complex components (macro components).
4. All component parameters are passed as separate arguments and have default values.
5. Images are connected in PNG/JPEG and WEBP formats and in 2X resolution for retina screens.
6. Images are not added to sprites to be cached in the browser.
7. The user can change the screen zoom.
8. The user can use the mouse and keyboard to interact with the interface.
9. The JS code is divided into classes and commented using JSDoc.
10. Inheritance is used within the Observer pattern to link the `Basket` instance data with the `TotalCost` and `Header` instance data.
11. Loose coupling is used for the `Basket` and `CreditCard` instances. They are passed to linked class instances as parameters.
12. Composition is used for the `Validator`, `Tooltip`, and `Badge` instances to avoid passing unnecessary parameters to linked class instances.


## Technology stack  
`Nunjucks`, `SCSS`, `JS`, `Gulp`, `Webpack`  
  
## Links  
A website: https://v1364358.hosted-by-vdsina.ru/sb-shop/ 
   
## Usage  
To clone a project, you need to open desired directory and use the command:  
**HTTPS**: `git clone https://github.com/Vasily257/movies-explorer-api.git`  
**SSH**: `git clone git@github.com:Vasily257/movies-explorer-api.git`  

To start a project, you need to open the project folder in the terminal and use the command `npm run start`.
  
## Status
The project is closed, there are no plans for completion.
