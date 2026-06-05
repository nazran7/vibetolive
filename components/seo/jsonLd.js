export default function JsonLd({ data }) {
	if (!data || (Array.isArray(data) && data.length === 0)) {
		return null;
	}

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
