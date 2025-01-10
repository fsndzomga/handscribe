'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreateDocument() {
  const [images, setImages] = useState<File[]>([])
  const [digitizedText, setDigitizedText] = useState<string>('')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files))
    }
  }

  const handleDigitize = async () => {
    // TODO: Implement image processing and text extraction using a VLM
    setDigitizedText('Digitized text will appear here...')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Document</h1>
      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>Upload images of your handwritten notes</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="file" multiple accept="image/*" onChange={handleImageUpload} />
          <div className="mt-4">
            {images.map((image, index) => (
              <p key={index}>{image.name}</p>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleDigitize} disabled={images.length === 0}>
            Digitize Notes
          </Button>
        </CardFooter>
      </Card>
      {digitizedText && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Digitized Text</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-64 p-2 border rounded"
              value={digitizedText}
              onChange={(e) => setDigitizedText(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button>Save Document</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

