import React from 'react'
import { Badge } from '../components/ui/badge'

const LeftBanner = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="space-y-4 px-4 py-4 lg:px-20">
                <img src='/assets/logo.png' alt='banner' width="60px" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    <span className="gradient-title">Form & source agnostic, Seamless data collation</span>
                </h1>
                <p className="font-extralight text-lg md:text-xl max-w-md">
                Dynamically generate digital forms, turn structured requirements into ready-to-use forms on demand and capture accurate data without manual form building..
                </p>
                <Badge 
                    variant="outline" 
                    className="bg-[#5f7f06]/5 dark:bg-[#5f7f06]/30 border-[#a6ce39]/30 px-4 py-2 dark:text-[#86a729] text-[#a6ce39] text-sm font-medium"
                >
                    Dynamic forms. Zero manual building
                </Badge>
            </div>
        </div>
    )
}

export default LeftBanner