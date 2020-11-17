import * as React from 'react'
import ItemCard from '../ItemCard'
import './CategoryBar.scss'
import { Categories } from '../../Utils/Categories'

export interface CategoryBarProps {
    setCategory: (category: string) => void;
    category: string;
}

const CategoryBar: React.FC<CategoryBarProps> = (props: CategoryBarProps) => (
        <div className="category-bar">
            {Categories.length && (
                <>
                    { Categories.map((item, index) => {
                            return (
                                <ItemCard
                                    key={index}
                                    className={item.name === props.category ? 'current-category': ''}
                                    type={'category'}
                                    name={item.name}
                                    imgSrc={item.imgSrc}
                                    onClick={()=>{props.setCategory(item.name)}}
                                />
                            )
                        })
                    }
                </>
            )}
        </div>
)


export default CategoryBar
