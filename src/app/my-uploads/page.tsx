
import FileCard from '@/src/components/file-card'

async function getMine() {
  const r = await fetch(`${process.env.APP_URL}/api/uploads/list?owner=me`, { cache:'no-store' })
  return r.json()
}
export default async function MyUploads() {
  const { uploads } = await getMine()
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">My uploads</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {uploads?.map((u:any)=> <FileCard key={u.id} file={u} canDelete />)}
      </div>
    </main>
  )
}
