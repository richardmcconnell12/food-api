fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods)
        parsedFoods.forEach(food => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
            .then(response => response.json())
                .then(productInfo => {
                    console.log(productInfo)
                    let productDetails = grabInfo(productInfo.product.ingredients_text, productInfo.product.countries, productInfo.product.nutriments.energy, productInfo.product.nutriments.fat, productInfo.product.nutriments.sugars)
                    const foodAsHtml = foodFactory(food.name, food.type, food.ethnicity, productDetails);
                    addFoodToContainer(foodAsHtml)
                });
        });
    });

const h1 = (title, style) => {
    return `<h1 class="${style}">${title}</h1>`;
};

const h3 = (title, style) => {
    return `<h3 class="${style}">${title}</h3>`;
};

const p = (...items) => {
    return items;
}

const div = (name, type, ethnicity, productDetails, style) => {
    return `<div class="${style}">
            ${h1(name, "h1-style")}
            ${h3(type, "h3-style")}
            ${h3(ethnicity, "h3-style")}
            ${p(productDetails)}
            </div>`;
};

let foodFactory = (name, type, ethnicity, productDetails) => {
    let factoryOutput = div(name, type, ethnicity, productDetails, "div-style");
    console.log(factoryOutput)
    return `${factoryOutput}`;
};

let addFoodToContainer = (item) => {
    document.querySelector("#container").innerHTML += item;
}

let grabInfo = (...items) => {
    console.log(items)
    return items;
};