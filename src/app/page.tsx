
import SearchBar from '@/src/components/search-bar'
import FileCard from '@/src/components/file-card'

async function getUploads(searchParams: { q?: string }) {
  const q = searchParams.q ? `?q=${encodeURIComponent(searchParams.q)}` : ''
  const r = await fetch(`${process.env.APP_URL}/api/uploads/list${q}`, { cache: 'no-store' })
  return r.json()
}
export default async function Library({ searchParams }: any) {
  const { uploads } = await getUploads(searchParams)
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Library</h1>
        <SearchBar/>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {uploads?.map((u:any)=> <FileCard key={u.id} file={u} />)}
      </div>
    </main>
  )
}
