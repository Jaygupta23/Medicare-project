import React from 'react'
import loading from '../loading.gif'

const NormalSpinner = () => {
    return (
        <div className='text-center w-75'>
            <img className='my-3 ' src={loading} alt="loading" />
        </div>

    )
}

export default NormalSpinner
