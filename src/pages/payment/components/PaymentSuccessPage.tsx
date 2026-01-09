import { CheckCircle2, ArrowRight, Download } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export const PaymentSuccessPage = () => {
  const { setStep, setView } = useOrderStore();

  const handleGoToTracking = () => {
    setView('tracking');
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-3xl mx-auto md:py-8 space-y-8 font-inter animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-left">
        <Breadcrumbs 
          parentPage="Pembayaran" 
          onParentClick={() => setStep(3)} 
          currentPage="Status Pembayaran" 
        />
      </div>

      <div className="bg-white border border-gray-100 rounded-[32px] md:rounded-[40px] p-8 md:p-12 shadow-sm text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 className="text-green-500" size={48} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900">Pesanan Berhasil Dibuat!</h1>
          <p className="text-gray-500 text-sm md:text-base">Terima kasih, pesanan Anda sedang kami proses.</p>
        </div>

        <div className="bg-gray-50 rounded-[24px] p-6 space-y-2">
          <p className="text-sm font-medium text-gray-500">Total Pembayaran</p>
          <p className="text-2xl font-black text-gray-900 underline decoration-[#27AAE1]/20 underline-offset-4">
            Rp2.651.000
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <button 
            onClick={handleGoToTracking}
            className="w-full bg-[#27AAE1] text-white py-4 rounded-2xl font-extrabold text-sm shadow-lg shadow-sky-100 hover:bg-sky-500 transition-all flex items-center justify-center gap-2 group"
          >
            Cek Status Pesanan 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="w-full bg-white border-2 border-gray-100 text-gray-600 py-4 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            <Download size={18} /> Unduh Invoice (PDF)
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-400 font-medium italic">
          Butuh bantuan? Hubungi WhatsApp JumpaPay <span className="text-[#27AAE1] cursor-pointer not-italic font-bold">0811-9509-889</span>
        </p>
      </div>
    </div>
  );
};