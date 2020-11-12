import * as React from 'react';
import { useMemo } from 'react';
import ItemCard from '../ItemCard';

export interface CarouselProps {
    horizontal?: boolean
}
 
const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
    const dummy = [
        {
            name:'Burger 1',
            imgSrc:'cheeseburger.jpg'
        },
        {
            name:'Burger 2',
            imgSrc:'cheeseburger.jpg'
        },
        {
            name:'Burger 3 ',
            imgSrc:'cheeseburger.jpg'
        },
        {
            name:'Burger 4',
            imgSrc:'cheeseburger.jpg'
        },
        {
            name:'Burger 5',
            imgSrc:'cheeseburger.jpg'
        },
        {
            name:'Burger 6',
            imgSrc:'cheeseburger.jpg'
        },
        {
            name:'Burger 7',
            imgSrc:'cheeseburger.jpg'
        }
    ];

    return ( 
        <div className="carousel-slide" style={{flexDirection: props.horizontal ? 'row' : 'column'}}>
            {dummy.map((item, index )=>{
                console.log('test')
                return <ItemCard  key={index} type={'category'} name={item.name} imgSrc={item.imgSrc} />
            })}
        </div>
     );
}
 
export default Carousel;