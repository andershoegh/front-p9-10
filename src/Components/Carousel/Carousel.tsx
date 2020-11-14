import * as React from 'react'
import { useMemo, useState, useRef } from 'react'
import ItemCard from '../ItemCard'
import './Carousel.scss'
import { Categories } from '../../Utils/Categories'

export interface CarouselProps {
    horizontal?: boolean
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
    const [displayArray, setDisplayArray] = useState(
        Math.round(Categories.length / 2)
    )
    const [counter, setCounter] = useState<number>(
        Math.round(Categories.length / 2)
    )
    const carouselSlide = useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        const allCards: NodeListOf<HTMLDivElement> = document.querySelectorAll(
            '.card'
        )
        const size = allCards[0].offsetHeight
        if (carouselSlide.current) {
            console.log(
                carouselSlide.current,
                size,
                -Categories.length * size,
                allCards[0]
            )
            carouselSlide.current.style.transform =
                'translateY(' + -Categories.length * (size + 40) + 'px)'
            //Increment en med trans
            styleCarousel(counter, allCards)
            onTransitionEnd(counter, carouselSlide.current)
            styleCarousel(counter, allCards)
        }
    }, [counter, carouselSlide])
    const onTransitionEnd = (index: number, el: HTMLDivElement) => {
        //sæt tilbage uden trans
    }
    const styleCarousel = (
        index: number,
        Elements: NodeListOf<HTMLDivElement>
    ) => {
        //styles center kort og de omkring liggende
    }
    return (
        <div
            className="carousel-slide"
            ref={carouselSlide}
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
