import * as React from 'react'
import { useMemo, useState } from 'react'
import ItemCard from '../ItemCard'
import { Categories } from '../../Utils/Categories'

export interface CarouselProps {
    horizontal?: boolean
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
    const [displayArray, setDisplayArray] = useState(
        Math.round(Categories.length / 2)
    )

    return (
        <div
            className="carousel-slide"
            style={{ flexDirection: props.horizontal ? 'row' : 'column' }}
        >
            {Categories.length && (
                <>
                    {['last-clone', '', 'first-clone'].map((cloneString) =>
                        Categories.map((item, index) => {
                            return (
                                <ItemCard
                                    key={index + cloneString}
                                    className={cloneString}
                                    type={'category'}
                                    name={item.name}
                                    imgSrc={item.imgSrc}
                                />
                            )
                        })
                    )}
                </>
            )}
        </div>
    )
}

export default Carousel
