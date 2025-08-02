'use client'

import { useParams } from 'next/navigation'
import React from 'react'

function Page() {
    const param = useParams()
    return (
        <div className="max-w-5xl min-h-screen flex-wrap justify-center ">
            im parameter page vro {param.id}
        </div>
    )
}

export default Page