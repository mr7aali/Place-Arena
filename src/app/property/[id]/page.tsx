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
  console.log(id);
  const res = await fetch(
    `https://place-arena-backend.vercel.app/api/v1/property/${id}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch property data");
  }
  const property = await res.json();
  console.log(property);

  return <PropertyDetail property={property} />;
}
