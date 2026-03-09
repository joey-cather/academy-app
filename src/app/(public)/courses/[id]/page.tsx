import CourseDetailPage from '@/src/features/course/components/CourseDetailPage';
import { Metadata } from 'next';
import { Course } from '@/src/features/course/types/type';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://academy-app-deploy.vercel.app';
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const getCourseForSeo = async (id: string): Promise<Course | null> => {
  if (!apiBaseUrl) return null;

  const response = await fetch(`${apiBaseUrl}/api/courses/${id}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { data: Course };
  return payload.data;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseForSeo(id);

  if (!course) {
    return {
      title: '강좌 상세 | 아카데미 앱',
      description: '아카데미 앱 강좌 상세 페이지입니다.',
      alternates: {
        canonical: `/courses/${id}`,
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageUrl = `${siteUrl}/courses/${id}`;
  const description = course.description.slice(0, 160);

  return {
    title: `${course.title} | 아카데미 앱`,
    description,
    alternates: {
      canonical: `/courses/${id}`,
    },
    keywords: [
      course.title,
      course.category,
      course.level,
      '온라인 강의',
      '아카데미 앱',
    ],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: course.title,
      description,
      url: pageUrl,
      siteName: 'Academy App',
      locale: 'ko_KR',
      images: course.thumbnail
        ? [
            {
              url: course.thumbnail,
              width: 1200,
              height: 630,
              alt: course.title,
            },
          ]
        : undefined,
      type: 'article',
    },
    twitter: {
      card: course.thumbnail ? 'summary_large_image' : 'summary',
      title: course.title,
      description,
      images: course.thumbnail ? [course.thumbnail] : undefined,
    },
  };
}

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseForSeo(id);
  const pageUrl = `${siteUrl}/courses/${id}`;

  const courseJsonLd = course
    ? {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title,
        description: course.description,
        provider: {
          '@type': 'Organization',
          name: 'Academy App',
          url: siteUrl,
        },
        url: pageUrl,
        image: course.thumbnail,
        educationalLevel: course.level,
      }
    : null;

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      {courseJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseJsonLd),
          }}
        />
      ) : null}
      <CourseDetailPage />
    </div>
  );
}
