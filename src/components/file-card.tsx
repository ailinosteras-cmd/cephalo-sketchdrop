
export default function FileCard({ file, canDelete=false }: { file:any, canDelete?: boolean }) {
  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      {file.thumbUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={file.thumbUrl} alt={file.name} className="w-full h-48 object-cover" />
      ) : <div className="w-full h-48 bg-muted" />}
      <div className="p-4">
        <div className="font-medium">{file.name}</div>
        <div className="mt-1 text-sm opacity-70">{file.tags?.join(', ')}</div>
        <div className="mt-3 flex items-center gap-2">
          <a className="btn-secondary" href={file.fileUrl} download>Download</a>
          {canDelete && (
            <button className="btn-danger" onClick={async()=>{
              await fetch('/api/uploads/delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:file.id})});
              location.reload();
            }}>Delete</button>
          )}
        </div>
      </div>
    </div>
  )
}
