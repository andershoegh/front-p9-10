import {Burgers, Drinks, Desserts, Sides} from './ProductItems';

export const DummyOrder = {
    burgers:[
        {
            ...Burgers[0],
            amount: 1
        }
    ],
    menus:[
        {
            burger: Burgers[3],
            drink:  Drinks[0],
            side: Sides[0],
            amount: 1,
            size: 'medium' as const,
            itemType: 'menu' as const
        }
    ],
    sides:[
        {
            ...Sides[4],
            size:'small' as const,
            amount: 2
        }
    ],
    drinks:[
        {...Drinks[2], amount: 3, size: 'large' as const}
    ],
    desserts:[
        {...Desserts[2], amount: 1 },
        {...Desserts[6], amount: 3 }
    ]  
}