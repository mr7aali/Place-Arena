import { useParams } from "next/navigation";
import PropertyDetail from "./PropertyDetail";

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
    { id: "11" },
    { id: "12" },
  ];
}
// interface PropertyPageProps {
//   params: { id: string };
// }
export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // const params = useParams<{ id: string }>();
  const { id } = await params;
  return <PropertyDetail propertyId={id} />;
}
