import './globals.css'
import Sidebar from '@/components/Sidebar'
// import { Provider } from 'react-redux' 
import LoginModal from '@/components/LoginModal'
import {GlobalProvider} from './store';
// import { store } from './store'
import localFont from 'next/font/local'
import PlayerContent from '@/components/PlayerContent'
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { MantineProvider } from '@mantine/core';



export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music',
  
}
const myFont = localFont({
  src: [
    {
      path: '../utils/font/GothamBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../utils/font/GothamBoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../utils/font/GothamBook.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../utils/font/GothamBookItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../utils/font/GothamLight.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../utils/font/GothamLightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../utils/font/GothamMedium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../utils/font/GothamMediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../utils/font/Gotham-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../utils/font/Gotham-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
        {
      path: '../utils/font/Gotham-XLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../utils/font/Gotham-XLightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../utils/font/Gotham-Black.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../utils/font/Gotham-UltraItalic.woff2',
      weight: '800',
      style: 'italic',
    },
  ],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <MantineProvider>
          <GlobalProvider>
            <LoginModal>
              <Sidebar>
                {children}
              </Sidebar>
              <PlayerContent/>
              <Footer/>
            </LoginModal>
            <Toaster/>
          </GlobalProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
