import React from 'react'
import { Badge } from '../components/ui/badge'

const LeftBanner = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="space-y-6 px-4 py-4 lg:px-20">
                <img src='/assets/logo.png' alt='banner' width="60px" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    Connect with health-workers <br />{" "}
                    <span className="gradient-title">anytime, anywhere</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                Accessible, available, acceptable, and high-quality health workforce needed to improve health outcomes and advance universal health coverage.
                </p>
                <Badge 
                    variant="outline" 
                    className="bg-[#5f7f06]/30 border-[#a6ce39]/30 px-4 py-2 text-[#a6ce39] text-sm font-medium"
                >
                    High-quality health workforce
                </Badge>
            </div>
        </div>
    )
}

export default LeftBanner