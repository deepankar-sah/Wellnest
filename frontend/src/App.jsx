import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes';
import { Toaster } from 'react-hot-toast';
import './styles/index.css';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          success: {
            duration:
              5000,
            style: {
              background: 'green',
              color: 'white',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: 'red',
              color: 'white',
            },
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
