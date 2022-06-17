import {ChangeEvent, useState} from "react";


export type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (
    {
        title,
        onChange
    }
) => {
    const [value, setValue] = useState<string>(title)
    const [activateMode, setActivateMode] = useState<boolean>(false)

    const onDoubleClickHandler = () => {
        setActivateMode(true)
    }

    const onBlurHandler = () => {
        setActivateMode(false)
        onChange(value)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div className="title">
            {activateMode
                ? <input onBlur={onBlurHandler}
                         onChange={onChangeHandler}
                         autoFocus
                         value={value}
                />
                : <span onDoubleClick={onDoubleClickHandler} >{value}</span>
            }
        </div>
    )
}