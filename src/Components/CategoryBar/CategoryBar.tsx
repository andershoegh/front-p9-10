import React, { useState, useMemo, useEffect, useContext } from 'react'
import ItemCard from '../ItemCard/ItemCard'
import './CategoryBar.scss'
import { Categories } from '../../Utils/Categories'
import { ControlledComponentContext } from '../../Contexts/ControlledComponentContext'

export interface CategoryBarProps {
    setCategory: CallableFunction;
    category: string;
}

const CategoryBar: React.FC<CategoryBarProps> = (props: CategoryBarProps) => {
    const [highlightedNumber, setHighlightedNumber] = useState(2);
    const [enterPress, setEnterPress] = useState(false);
    const highlightedItem = useMemo(()=> Categories[highlightedNumber].name
    , [ highlightedNumber ] );
    const { controlled, setControlled } = useContext(ControlledComponentContext);
    useEffect(()=>{
        const handleKeyDown = (e: KeyboardEvent)=>{
            switch(e.key){
                case 'ArrowUp':
                    if(highlightedNumber > 0){
                        setHighlightedNumber(highlightedNumber-1);
                    }
                    break;
                case 'ArrowDown':
                    if(highlightedNumber < Categories.length-1){
                        setHighlightedNumber(highlightedNumber+1);
                    }else if(highlightedNumber >= Categories.length-1) {
                        setControlled('orderDetails');
                    }   
                    break;
                case 'ArrowRight':
                    setHighlightedNumber(Categories.findIndex(el => el.name === props.category))
                    setControlled('itemGrid');
                    break;
                case 'Enter':
                    setEnterPress(true);
            }
        }
        if(controlled === 'category'){
            window.addEventListener('keydown', handleKeyDown);
        }

        return ()=>{
            window.removeEventListener('keydown', handleKeyDown);
        }

    }, [highlightedNumber, setHighlightedNumber, props, controlled, setControlled, enterPress, setEnterPress])

    return (
        <div className="category-bar">
            {Categories.length && (
                <>
                    { Categories.map((item, index) => {
                            return (
                                <ItemCard
                                    key={index}
                                    scale={150}
                                    selectedItem={props.category}
                                    parentComponent={'category'}
                                    type={'category'}
                                    name={item.name}
                                    highlightedItem={highlightedItem}
                                    imgSrc={item.imgSrc}
                                    onClick={()=>{props.setCategory(item.name)}}
                                    enterPress={enterPress}
                                    setEnterPress={setEnterPress} 
                                />
                            )
                        })
                    }
                </>
            )}
        </div>
    ) 
}


export default CategoryBar
