export const JSONLD: React.FC<{ schema: string }> = ({ schema }) => {
	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />;
};
