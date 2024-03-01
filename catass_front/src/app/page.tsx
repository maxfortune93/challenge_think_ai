
import { SearchBarMediaCard } from "@/components";
import { fetchTags } from "@/services";
import { sortDataAscending } from '@/utils';

export default async function Home() {

  const getAllTags = await fetchTags();
  
  const sortTag = sortDataAscending(getAllTags)

  return (
    <main className="overflow-hidde">
      <div className="mt-12 padding-x padding-y max-width ">
      <SearchBarMediaCard tagsArrayResponse={sortTag}/>
      </div>
    </main>
  );
}
