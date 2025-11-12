import { PostDetailDialog } from '@/app/(main)/posts/_common/ui/PostDetailDialog';

interface PostDetailDialogPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailDialogPage({ params }: PostDetailDialogPageProps) {
  const { id } = await params;
  return <PostDetailDialog postId={Number(id)} />;
}
