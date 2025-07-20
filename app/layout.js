import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Plus_Jakarta_Sans } from 'next/font/google';
import ThemeScript from '@/components/common/themeScript';

const jakarta = Plus_Jakarta_Sans({
	weight: ['500', '800'],
	subsets: ['latin'],
});

export default function RootLayout({ children }) {
	const fontClass = jakarta.className || ''  // 确保有默认值

	return (
		<html lang="en" className={fontClass}>
			<body>
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
