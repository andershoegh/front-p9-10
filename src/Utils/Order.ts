import { Burgers, Drinks, Desserts, Sides } from './ProductItems'

export const DummyOrder = {
    burgers: [
        {
            ...Burgers[0],
        },
    ],
    menus: [
        {
            burger: Burgers[3],
            drink: Drinks[0],
            side: Sides[0],
            type: 'menu' as const,
            amount: 1,
        },
    ],
    sides: [
        {
            ...Sides[4],
        },
    ],
    drinks: [{ ...Drinks[2] }],
    desserts: [{ ...Desserts[2] }, { ...Desserts[6] }],
}
