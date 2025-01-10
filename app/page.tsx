import { Button } from '@/components/ui/button';
import { Brain, Lightbulb, ArrowRight, FileText } from 'lucide-react';

import Image from 'next/image';

export default function HomePage() {
  return (
    <main>
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Rediscover the Power of
                <span className="block text-orange-500">Handwriting</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                HandScribe encourages you to write by hand and easily digitize your notes using AI technology.
                Transform your handwritten notes into digital text instantly.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <a
                  href="/transcribe"
                >
                  <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-lg px-8 py-4 inline-flex items-center justify-center">
                    Start Transcribing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <Image
                src="/homepage.webp"
                alt="Person writing in a notebook with natural lighting"
                width={450}
                height={450}
                className="rounded-lg shadow-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <Brain className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Improved Learning
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Handwriting enhances memory retention and comprehension. Write naturally and digitize later.
                </p>
              </div>
            </div>

            <div className="mt-5 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <Lightbulb className="h-6 w-6"/>
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Boosted Creativity
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Writing by hand stimulates creativity and idea generation. Let your thoughts flow freely.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <FileText className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Easy Digitization
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Convert your handwritten notes to digital text with one click using advanced AI technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Ready to start writing?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Join HandScribe today and experience the perfect blend of traditional handwriting and modern technology.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <a
                href="/transcribe"
              >
                <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-xl px-12 py-6 inline-flex items-center justify-center">
                  Start Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
