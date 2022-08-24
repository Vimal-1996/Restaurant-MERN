export const showErrorAlertMessages = (msg) => {
    return (
        <>
            <div className="alert alert-danger" role="alert">
                {<h4>{msg}</h4>}
            </div>
        </>
    )
}

export const showSuccessAlertMessages = (msg) => {
    return (
        <>
            <div className="alert alert-success" role="alert">
                {<h4>{msg}</h4>}
            </div>
        </>
    )
}