import { useRouter } from 'next/router';

export default function StudioPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return <div>Studio Home</div>;
  }

  if (slug[0] === "index") {
    return <div>Index Page</div>;
  }

  if (slug[0] === "tool") {
    return <div>Tool Page</div>;
  }

  return <div>404 - Page Not Found</div>;
}
