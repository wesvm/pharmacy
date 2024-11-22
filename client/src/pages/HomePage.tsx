import { SimpleCard } from "@/components/simple-card";
import SEO from "@/setup/seo";

export default function HomePage() {
  return (
    <SEO
      title="Pharmacy"
      description="Visualiza las estadísticas de compras, ventas, etc."
    >
      <SimpleCard className="mb-4">
        <h1 className="font-bold text-2xl">Bienvenido!</h1>
      </SimpleCard>

    </SEO>
  )
}