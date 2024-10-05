import { ragChat } from "@/lib/rag-chat";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );

  return decodedComponents.join("/");
}

const Page = async ({ params }: PageProps) => {
  const reconstructuredUrl = reconstructUrl({ url: params.url as string[] });

  await ragChat.context.add({
    type: "html",
    source: reconstructuredUrl,
    config: { chunkOverlap: 50, chunkSize: 200 },
  });

  return <div>page</div>;
};

export default Page;
