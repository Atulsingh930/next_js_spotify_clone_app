"use client"

import Header from '@/components/Header'
import Library from '@/components/Library'
import React from 'react'

function page() {
  return (
    <div className="bg-neutral-900 overflow-y-auto h-full w-full rounded-lg">
        <Header/>
        <Library/>
    </div>
  )
}

export default page