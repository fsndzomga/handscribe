'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export default function FinalDocumentPage() {
  const [finalText, setFinalText] = useState('');

  // On mount, retrieve the final document text from query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const documentText = urlParams.get('document');
    if (documentText) {
      setFinalText(decodeURIComponent(documentText));
    }
  }, []);

  const handleSave = () => {
    // Implement save logic if necessary
  }

  const handleDownload = () => {
    const blob = new Blob([finalText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcription.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Final Document</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit Your Transcription</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={finalText}
            onChange={(e) => setFinalText(e.target.value)}
            rows={15}
            className="mb-4"
          />
          <div className="flex space-x-4">
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleDownload}>Download</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
