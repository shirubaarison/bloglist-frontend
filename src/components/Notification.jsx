const Notification = ( { notification }) => {
    if (!notification) return null

    return (
        <div className='notification alert alert-success'>
            {notification}
        </div>
    )
}
export default Notification