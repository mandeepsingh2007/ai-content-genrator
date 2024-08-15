"use client"
import React from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'
import { useState } from 'react'
const Dashboard = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>()
  return (
    <div>
      <SearchSection onSearchInput={(value:string)=>setUserSearchInput(value)}/>
      <TemplateListSection userSearchInput={userSearchInput}/>
      </div>
  )
}

export default Dashboard