import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Plus_Jakarta_Sans } from 'next/font/google';
import ThemeScript from '@/components/common/themeScript';
import Script from 'next/script';

const jakarta = Plus_Jakarta_Sans({
	weight: ['500', '800'],
	subsets: ['latin'],
	display: 'swap', // Optimize font loading - don't block render waiting for font
	preload: true, // Preload font for better performance
});

export default function RootLayout({ children }) {
	const fontClass = jakarta.className || ''  // 确保有默认值

	return (
		<html lang="en" className={fontClass}>
			<body>
				{/* Google Analytics - Deferred loading for better performance */}
				<Script
					strategy="lazyOnload"
					src="https://www.googletagmanager.com/gtag/js?id=G-916VTN5QG7"
				/>
				<Script
					id="google-analytics"
					strategy="lazyOnload"
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'G-916VTN5QG7', {
								page_path: window.location.pathname,
							});
						`,
					}}
				/>
				<ThemeScript />
				<div className='w-full min-h-svh text-base-content bg-base-100'>
					{children}
					<ToastContainer
						position="top-center"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
				</div>
			</body>
		</html>
	);
}
