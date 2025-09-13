
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
export async function putFile(path: string, buf: Buffer, mime: string) {
  const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET!).upload(path, buf, { contentType: mime, upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(process.env.SUPABASE_BUCKET!).getPublicUrl(path);
  return data.publicUrl;
}
export async function deleteFile(path: string) {
  await supabase.storage.from(process.env.SUPABASE_BUCKET!).remove([path]);
}
