import PropertyDetail from "./PropertyDetail";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
