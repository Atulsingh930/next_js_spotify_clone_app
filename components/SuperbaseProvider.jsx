import { supabase } from '@/config/firbase'
import React, { Children } from 'react'
import LoginModal from './LoginModal'
import { cookies } from 'next/headers'
import { createClientComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

async function SuperbaseProvider({children}) {
    const cookieStore = cookies()
    const supabase = createClientComponentClient()
    //console.log(supabase, 'supabase in superbaseProvider')
    const data = await supabase.auth.getSession()
    //console.log(data, 'session in superbaseProvider')
  return (
    <LoginModal userDetails={data}>
        {children}
    </LoginModal>
  )
}

export default SuperbaseProvider