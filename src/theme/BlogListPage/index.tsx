import React, {useState, type ReactNode} from 'react';
import OriginalBlogListPage from '@theme-original/BlogListPage';
import type BlogListPageType from '@theme/BlogListPage';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogListPageType>;

export default function BlogListPage(props: Props): ReactNode {
  const [query, setQuery] = useState('');

  const filteredItems = query.trim()
    ? props.items.filter(({content: C}) => {
        const meta = (C as any).metadata as {
          title: string;
          description?: string;
          tags: {label: string}[];
        };
        const q = query.toLowerCase();
        return (
          meta.title.toLowerCase().includes(q) ||
          (meta.description ?? '').toLowerCase().includes(q) ||
          meta.tags.some((t) => t.label.toLowerCase().includes(q))
        );
      })
    : props.items;

  return (
    <>
      <div className="container rb-section-search">
        <input
          type="search"
          placeholder={`Rechercher dans ${props.metadata.blogTitle}…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rb-section-search__input"
          aria-label={`Rechercher dans ${props.metadata.blogTitle}`}
        />
        {query.trim() && (
          <p className="rb-section-search__count">
            {filteredItems.length} résultat{filteredItems.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      <OriginalBlogListPage {...props} items={filteredItems} />
    </>
  );
}
