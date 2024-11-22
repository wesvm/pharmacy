import { PropsWithChildren } from "react";
import { Helmet } from "react-helmet-async"

export interface SEOProps extends PropsWithChildren {
  title: string;
  description?: string;
  keywords?: string;
}

const SEO = ({ title, description, keywords, children }: SEOProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
      </Helmet>
      {children}
    </>

  )
}

export default SEO;