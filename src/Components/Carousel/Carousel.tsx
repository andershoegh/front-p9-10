import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import ItemCard from '../ItemCard'
import './Carousel.scss'
import { Categories } from '../../Utils/Categories'

export interface CarouselProps {
    horizontal?: boolean
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {

    const [counter, setCounter] = useState<number>(
        Math.round(Categories.length)+2
    )
    const carouselSlide = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const allCards: NodeListOf<HTMLDivElement> = document.querySelectorAll(
            '.card'
        )
        const size = allCards[0].offsetHeight
        if (carouselSlide.current) {
            carouselSlide.current.style.transform = 'translateY(' + -(size + 40) * (counter-2) + 'px)';

            carouselSlide.current.style.transition = '.5s';
            // carouselSlide.current.classList.remove('no-trans');
            //Increment en med trans
            
            styleCarousel(counter, allCards)
            onTransitionEnd(counter, carouselSlide.current)
            styleCarousel(counter, allCards)
        }
    }, [counter, carouselSlide]);

    // const onEndTransition = React.useMemo(()=>{
    //     if(carouselSlide.current){
    //         carouselSlide.current.style.transition = 'none';
    //     }
    //     const classList = carouselSlide.current?.children[oldCount].classList;
    //     if(classList !== undefined && classList.contains('clone') && carouselSlide.current){
    //         return oldCount += classList.contains('last-clone') ? Categories.length : -Categories.length;
            
    //     }else{
    //         return oldCount;
    //     }          
      
    // }, [counter])

    useEffect(()=>{
        const onTransEnd = (e: Event) =>{
            if(e.target === carouselSlide.current){ 
                if(carouselSlide.current){
                    carouselSlide.current.style.transition = 'none';
                }
                const classList = carouselSlide.current?.children[counter].classList;
                if(classList !== undefined && classList.contains('clone') && carouselSlide.current){
                    const newCount = classList.contains('last-clone') ? counter + Categories.length : counter - Categories.length;
                    setCounter(newCount);
                }
            }
        };
        if(carouselSlide.current){
            carouselSlide.current.addEventListener('transitionend', onTransEnd);
        }
        return ()=>{
            if(carouselSlide.current){
                carouselSlide.current.removeEventListener('transitionend', onTransEnd);
            }
        }
    }, [carouselSlide, counter]);

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
            className="carousel-slide no-trans"
            ref={carouselSlide}
            style={{ flexDirection: props.horizontal ? 'row' : 'column' }}
        >
            {Categories.length && (
                <>
                    {['last-clone clone', '', 'first-clone clone'].map((cloneString: string, i: number) =>{
                        
                        return Categories.map((item, y) => {
                            const itemIndex = y + i*(Categories.length);
                            return (
                                <ItemCard
                                    key={y + cloneString}
                                    className={cloneString}
                                    type={'category'}
                                    name={item.name}
                                    imgSrc={item.imgSrc}
                                    onClick={()=>{setCounter(itemIndex)}}
                                />
                            )
                        })
                    })}
                </>
            )}
        </div>
    )
}

export default Carousel
