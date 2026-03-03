import React from 'react'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog'

const PreviewFormdata = ({ formdata }) => {
    return (
        <DialogContent className="w-[95vw] md:w-[70vw] overflow-y-auto !max-w-none">
            <DialogHeader>
                <DialogTitle>Preview</DialogTitle>
                <DialogDescription>
                Confirm <span className='font-bold'> form information</span>. Click save when you&apos;re
                done.
                </DialogDescription>
            </DialogHeader>
            <div className='w-full md:flex md:flex-wrap md:items-center md:justify-between'>
            {
                formdata && Object.entries(formdata).map(([key, value], index) => (
                    <div 
                        key={key || index}  // ✅ Add unique key
                        className='w-full md:w-[48%] flex items-center text-sm pb-6'  // ✅ Use visible border color
                    >
                        <span className='w-1/2 capitalize'>
                            {key?.replaceAll('_', ' ') || ''}
                        </span>
                        <span className='w-1/2 font-semibold'>
                            {typeof value === 'object' && value !== null
                                    ? JSON.stringify(value)  // ✅ Handle objects
                                    : String(value)
                            }
                        </span>
                    </div>
                ))
            }
            </div>
        </DialogContent>
    )
}

export default PreviewFormdata