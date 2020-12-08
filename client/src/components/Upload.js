import React, {useRef} from 'react'

export default function Upload() {

    const fileInput = useRef()

    const handleChange = (e) => {
        e.preventDefault();

       
    }

    return (
        <div>
            <h1>Upload</h1>

            <form onSubmit={handleChange()}>
                <div>
                    <input
                        type="file"
                        ref={fileInput}
                    />
                </div>
                <button>Add</button>
            </form>
        </div>
    )
}
