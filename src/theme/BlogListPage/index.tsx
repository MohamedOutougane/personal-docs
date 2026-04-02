import React, {type ReactNode} from 'react';
import OriginalBlogListPage from '@theme-original/BlogListPage';
import type BlogListPageType from '@theme/BlogListPage';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof BlogListPageType>;

export default function BlogListPage(props: Props): ReactNode {
  return <OriginalBlogListPage {...props} />;
}
