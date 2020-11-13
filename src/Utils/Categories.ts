export type Category = {
    name: string
    type: string
    imgSrc: string
}
export const Categories: Category[] = [
    {
        name: 'Drinks',
        type: 'drink',
        imgSrc: 'cocaCola.jpg',
    },
    {
        name: 'Burgers',
        type: 'burger',
        imgSrc: 'mcTower.jpg',
    },
    {
        name: 'Sides',
        type: 'side',
        imgSrc: 'frenchFries.jpg',
    },
    {
        name: 'Desserts',
        type: 'dessert',
        imgSrc: 'iceCreamCone.jpg',
    },
    {
        name: 'Chicken',
        type: 'chicken',
        imgSrc: 'hotWings.jpg',
    },
]
