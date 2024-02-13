const Error = ( { error }) => {
	if (!error) return null

	return (
		<div className='notification error alert alert-danger'>
			{error}
		</div>
	)
}

export default Error