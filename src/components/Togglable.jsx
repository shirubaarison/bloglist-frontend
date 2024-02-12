import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hiddenWhenVisible = { display: visible ? 'none' : ''}
    const shownWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hiddenWhenVisible}>
                <button className='btn btn-primary' onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={shownWhenVisible}>
                {props.children}
                <button className='btn btn-primary' onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable