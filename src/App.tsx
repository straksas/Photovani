import { useRouter } from '@/lib/router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { ContactPage } from '@/pages/ContactPage';

function App() {
  const { path } = useRouter();

  let page;
  switch (path) {
    case '/':
      page = <HomePage />;
      break;
    case '/contact':
      page = <ContactPage />;
      break;
    default:
      page = <HomePage />;
      break;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPath={path} />
      <main className="flex-1">{page}</main>
      <Footer />
    </div>
  );
}

export default App;
