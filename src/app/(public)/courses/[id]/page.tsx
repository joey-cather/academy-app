import CourseDetailPage from '@/src/features/course/components/CourseDetailPage';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const course = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
    { cache: 'no-store' }
  ).then((res) => res.json());

  return {
    title: course.title,
    description: course.description,

    openGraph: {
      title: course.title,
      description: course.description,
      url: `${process.env.NEXT_PUBLIC_API_URL}/${id}`,
      siteName: 'Academy App',
      images: course.thumbnail && [
        {
          url: course.thumbnail,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
      type: 'article',
    },
  };
}

export default function CourseDetail() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      <CourseDetailPage />
    </div>
  );
}
