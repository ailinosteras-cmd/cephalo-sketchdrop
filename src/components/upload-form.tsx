
'use client'
import { useState } from 'react'

export default function UploadForm() {
  const [busy, setBusy] = useState(false)
  const onSubmit = async (e:any) => {
    e.preventDefault(); setBusy(true)
    const fd = new FormData(e.currentTarget)
    fd.set('legal', e.currentTarget.legal.checked ? 'true' : 'false')
    const res = await fetch('/api/uploads/create',{ method:'POST', body: fd })
    if (res.ok) window.location.href = '/my-uploads'
    else alert('Upload failed')
    setBusy(false)
  }
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <input type="file" name="file" required className="file-input" accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.img,.svg" />
      <input name="name" placeholder="Name" className="input" required />
      <input name="tags" placeholder="Tags (comma-separated)" className="input" />
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="legal" required />
        <span>
          I confirm this is a photo/illustration created by me using AI, I take full responsibility, and allow others to use it freely.
        </span>
      </label>
      <button className="btn" disabled={busy} type="submit">{busy ? 'Uploading…' : 'Upload'}</button>
    </form>
  )
}
