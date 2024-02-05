"use client"
import Encryption from '@/components/main/Encryption';
import Hero from '@/components/main/Hero'
import Projects from '@/components/main/Projects';
import Skills from '@/components/main/Skills';
import ThreeDScreenshot from '@/components/main/ThreeDScreenshot';
import Image from "next/image";

export default function Home() {
  return (
    <main className='h-full w-full'>
      <div className='flex flex-col gap-20'>
        <Hero/>
        <Skills />
        <Encryption />
        <div className='flex flex-col items-center gap-20'>
        <h1 className='text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20'>
            My Projects
        </h1>
        <ThreeDScreenshot screenshotUrl="/FreedomhacksSS.png" />
        </div>
      </div>
    </main>
  );
}
