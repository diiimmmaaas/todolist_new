import styles from './AddItemForm.module.scss';
import React, { ChangeEvent, useState } from "react";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (
    {
        addItem
    }
) => {

    const [value, setValue] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setValue(e.currentTarget.value)
    }

    const onClickHandler = () => {
        if (value.trim() !== '') {
            addItem(value)
            setValue('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div className={styles.addItemForm}>
            {error && <span>{error}</span>}
            <input value={value} onChange={onChangeHandler} type="text"/>
            <button onClick={onClickHandler}>+</button>
        </div>
    )
}