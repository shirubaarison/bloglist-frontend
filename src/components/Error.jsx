const Error = ( { error }) => {
    if (!error) return null

    return (
        <div className='notification error'>
            {error}
        </div>
    )
}

export default Error