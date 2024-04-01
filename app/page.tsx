import { getFrameMetadata } from 'frog/next'
import type { Metadata } from 'next'
import Image from 'next/image'

import styles from './page.module.css'

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `https://learning-frog.vercel.app/api`,
  )
  return {
    other: frameTags,
  }
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      THIS IS THE WEBPAGE I WANT TO SHARE MY FRAME FROM 
      CO-LOCATE MY FRAME AT THIS PAGE ROUTE!!!
      </div>
    </main>
  )
}
