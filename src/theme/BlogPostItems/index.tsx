import React, {type ReactNode} from 'react';
import OriginalBlogPostItems from '@theme-original/BlogPostItems';
import type BlogPostItemsType from '@theme/BlogPostItems';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogPostItemsType>;

export default function BlogPostItems(props: Props): ReactNode {
  return (
    <div className="rb-cards-grid">
      <OriginalBlogPostItems {...props} />
    </div>
  );
}
