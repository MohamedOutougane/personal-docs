import React, {type ReactNode} from 'react';
import OriginalBlogPostItem from '@theme-original/BlogPostItem';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Link from '@docusaurus/Link';
import TOCCollapsible from '@theme/TOCCollapsible';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItem(props: Props): ReactNode {
  const {frontMatter, metadata, assets, isBlogPostPage, toc} = useBlogPost();

  // ── Page individuelle : TOC mobile collapsible + rendu normal ──
  if (isBlogPostPage) {
    return (
      <>
        {toc.length > 1 && (
          <div className="rb-toc-mobile">
            <TOCCollapsible
              toc={toc}
              minHeadingLevel={2}
              maxHeadingLevel={3}
            />
          </div>
        )}
        <OriginalBlogPostItem {...props} />
      </>
    );
  }

  // ── Page de liste : card personnalisée — image + titre + meta ──
  // On utilise assets.image (URL résolue par Docusaurus) en priorité
  const image = assets.image ?? (frontMatter.image as string | undefined);
  const {permalink, title, description, date, tags, readingTime} = metadata;

  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="rb-blog-card">
      {/* Image featured — couvre la card au clic via l'overlay link */}
      <div className="rb-blog-card__img-wrapper">
        {image ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            className="rb-blog-card__img"
          />
        ) : (
          <div className="rb-blog-card__img-placeholder" />
        )}
      </div>

      <div className="rb-blog-card__body">
        {/* Titre + overlay link qui couvre toute la card */}
        <h2 className="rb-blog-card__title">
          <Link to={permalink} className="rb-blog-card__overlay-link">
            {title}
          </Link>
        </h2>

        {description && (
          <p className="rb-blog-card__desc">{description}</p>
        )}

        <div className="rb-blog-card__footer">
          <time className="rb-blog-card__date">{formattedDate}</time>
          {readingTime !== undefined && (
            <span className="rb-blog-card__reading-time">
              &nbsp;· {Math.ceil(readingTime)} min
            </span>
          )}
        </div>

        {tags.length > 0 && (
          <div className="rb-blog-card__tags">
            {tags.map((tag) => (
              <Link
                key={tag.permalink}
                to={tag.permalink}
                className="rb-blog-card__tag">
                {tag.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
