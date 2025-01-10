'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

type ImageItem = {
  id: string;
  file: File;
  preview: string;
  base64: string;
  transcription: string | null;
}

export default function TranscribePage() {
  const [images, setImages] = useState<ImageItem[]>([])
  const [isBrowser, setIsBrowser] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files).map(async (file) => {
        const base64 = await convertToBase64(file);
        return {
          id: `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          preview: URL.createObjectURL(file),
          base64,
          transcription: null // Initially, transcription is null
        };
      });

      Promise.all(newImages).then((imagesWithBase64) => {
        setImages(prev => [...prev, ...imagesWithBase64]);
      });
    }
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(images)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setImages(items)
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleTranscribe = async () => {
    setLoading(true);

    // Transcribe each image one by one and update state with each transcription
    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      // Fetch the transcription for the current image
      const transcription = await fetchTranscription(image.base64);

      // Update the state with the new transcription
      setImages(prevImages =>
        prevImages.map((img, idx) =>
          idx === i ? { ...img, transcription } : img
        )
      );
    }

    setLoading(false);
  }

  const fetchTranscription = async (imageBase64: string): Promise<string> => {
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64 }),
      });

      const data = await response.json();
      return data.transcription || 'Error transcribing image';
    } catch (error) {
      console.error('Error fetching transcription:', error);
      return 'Error transcribing image';
    }
  }

  // Consolidate all transcriptions into one document
  const consolidateTranscriptions = () => {
    const consolidatedText = images.map(image => image.transcription).join("\n\n");
    return consolidatedText;
  }

  const handleSaveDocument = () => {
    const consolidatedText = consolidateTranscriptions();
    // Navigate to the final document page and pass the consolidated text as a prop
    window.location.href = `/transcribe/final?document=${encodeURIComponent(consolidatedText)}`;
  }

  if (!isBrowser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Transcribe Your Handwritten Notes</h1>
      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="file" multiple accept="image/*" onChange={handleImageUpload} className="mb-4" />

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                  {images.map((image, index) => (
                    <Draggable key={image.id} draggableId={image.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative bg-gray-100 rounded-lg overflow-hidden"
                        >
                          <Image
                            src={image.preview}
                            alt={`Image ${index + 1}`}
                            width={200}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute bottom-0 right-0 bg-white px-2 py-1 text-sm rounded-tl-lg">
                            {index + 1}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Button onClick={handleTranscribe} className="mt-6" disabled={images.length === 0 || loading}>
            {loading ? 'Transcribing...' : 'Transcribe All'}
          </Button>

          {/* Button to save transcriptions and pass them to the final document page */}
          <Button onClick={handleSaveDocument} className="mt-6 ml-6" disabled={images.length === 0 || loading}>
            Save Transcriptions as Document
          </Button>
        </CardContent>
      </Card>

      {/* Show transcriptions only once they are available */}
      {images.length > 0 && !loading && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Transcription Results</h2>
          {images.map((image, index) => (
            <Card key={image.id} className="mb-4">
              <CardHeader>
                <CardTitle>Image {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{image.transcription || 'No transcription available'}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
