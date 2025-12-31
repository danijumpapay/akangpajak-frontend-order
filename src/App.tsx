import { Navbar } from './components/shared/navbar';
import { PromoSlider } from './features/order/components/promo-slider'; 
import { ServiceGrid } from './features/order/components/service-grid';
import { OrderForm } from './features/order/components/order-form';
import { useOrderStore } from './store/use-order-store';
import { Home, Search, Video, HelpCircle } from 'lucide-react';

function App() {
  const { step, resetOrder } = useOrderStore();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 pb-32">
        {step === 1 ? (
          <div className="flex flex-col gap-6 md:gap-12 mt-4 md:mt-8">
            <div className="md:hidden">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Cari Layanan" 
                  className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-jumpapay-blue shadow-sm"
                />
              </div>
            </div>

            <PromoSlider />
            <ServiceGrid />
          </div>
        ) : (
          <div className="mt-10 max-w-2xl mx-auto px-2">
            <OrderForm />
          </div>
        )}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 px-2 z-50">
        <button
          onClick={() => resetOrder()}
          className={`flex flex-col items-center gap-1 ${step === 1 ? 'text-jumpapay-blue' : 'text-gray-400'}`}
        >
          <Home size={22} strokeWidth={step === 1 ? 2.5 : 2} />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-gray-400">
          <Search size={22} strokeWidth={2} />
          <span className="text-[10px] font-semibold">Cek Order</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-gray-400">
          <Video size={22} strokeWidth={2} />
          <span className="text-[10px] font-semibold">Tutorial</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-gray-400">
          <HelpCircle size={22} strokeWidth={2} />
          <span className="text-[10px] font-semibold">Bantuan</span>
        </button>
      </div>
    </div>
  );
}

export default App;