import { AppProps } from 'next/app';
import '../tailwind.css';
import '../App.scss';
import { Toaster } from 'react-hot-toast';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <Toaster />
  </>
);

export default App;
