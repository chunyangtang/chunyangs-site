import { getCollection, type CollectionEntry } from 'astro:content';

type Entry = CollectionEntry<'blog' | 'publications' | 'projects'>;
type DetailEntry = CollectionEntry<'publications' | 'projects'>;

export const contentHref = (entry: Pick<Entry, 'collection' | 'id'>) =>
  `/${entry.collection}/${entry.id}`;

// A visible card does not imply a detail route. Both views use this same policy.
export const detailHref = (entry: DetailEntry) =>
  entry.data.detailPage ? contentHref(entry) : undefined;

function validatePublicationDetails(entries: CollectionEntry<'publications'>[]) {
  for (const entry of entries) {
    const body = entry.body?.replace(/<!--[\s\S]*?-->/g, '').trim();
    if (entry.data.detailPage && !body) {
      throw new Error(
        `${entry.collection}/${entry.id}: detailPage is enabled but the Markdown body is empty. Add content or set detailPage: false.`,
      );
    }
  }
  return entries;
}

const newestFirst = (a: { data: { pubDate: Date } }, b: { data: { pubDate: Date } }) =>
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

export const getBlogPosts = async () => (await getCollection('blog')).sort(newestFirst);

export const getPublications = async () =>
  validatePublicationDetails(await getCollection('publications')).sort(newestFirst);

export const getProjects = async () =>
  (await getCollection('projects')).sort(
    (a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id),
  );

export const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
  year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
});
