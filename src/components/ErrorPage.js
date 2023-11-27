import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div>
            <h1>Oops Error!!!</h1>
            <h3>
                {error?.error?.message}
            </h3>
        </div>
    )
}

export default ErrorPage