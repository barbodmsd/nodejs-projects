import { useState } from "react"

const useFormField=()=>{
    const [field,setField]=useState()
    const handleChange=(e)=>{
        setField({
            ...field,
            [e.target.name]:e.target.value
        })
    }
    return [field,handleChange]
}

export default useFormField