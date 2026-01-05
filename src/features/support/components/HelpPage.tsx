import { useState } from 'react';
import { ChevronRight, Plus, Minus, Phone, MessageCircle, Mail } from 'lucide-react';
import { useOrderStore } from '../../../store/useOrderStore';

export const HelpPage = () => {
  const { setView } = useOrderStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Di mana saja cakupan wilayah pengurusan surat kendaraan yang dilayani oleh JumpaPay?",
      answer: "JumpaPay melayani pengurusan surat kendaraan dengan kode plat kendaraan B (Jadetabek)."
    },
    {
      question: "Layanan apa saja yang disediakan oleh JumpaPay?",
      answer: "Kami melayani perpanjangan STNK tahunan, lima tahunan, mutasi, balik nama, ganti plat, hingga pengurusan STNK hilang untuk kendaraan pribadi maupun perusahaan."
    },
    {
      question: "Berapa estimasi waktu yang dibutuhkan untuk menyelesaikan seluruh proses, terhitung sejak pengambilan dokumen hingga dokumen selesai dan dikembalikan?",
      answer: "Estimasi waktu bervariasi tergantung jenis layanan dan domisili SAMSAT, namun rata-rata berkisar antara 3-7 hari kerja setelah dokumen kami terima secara lengkap."
    },
    {
      question: "Apa saja persyaratan dokumen administrasi dalam pengurusan surat kendaraan melalui JumpaPay?",
      answer: "Umumnya diperlukan KTP asli pemilik kendaraan, STNK asli, dan BPKB asli (untuk layanan tertentu seperti ganti plat atau mutasi). Tim kami akan menginformasikan detailnya saat Anda melakukan pemesanan."
    },
    {
      question: "Berapa biaya antar-jemput dokumen yang dikenakan JumpaPay?",
      answer: "Biaya antar-jemput dokumen sudah termasuk ke dalam paket layanan yang Anda pilih di aplikasi JumpaPay, sehingga tidak ada biaya tambahan untuk kurir kami."
    },
    {
      question: "Apakah JumpaPay melayani pengurusan kendaraan perusahaan selain perorangan?",
      answer: "Ya, kami melayani pengurusan surat kendaraan baik untuk perorangan maupun aset perusahaan dengan skala armada besar."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 space-y-6 md:space-y-8 font-inter">
      <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium mb-1 md:mb-2">
        <button onClick={() => setView('order')} className="text-gray-400 hover:text-jumpapay-blue transition-colors cursor-pointer">Order</button>
        <ChevronRight size={12} className="text-gray-300" />
        <span className="text-gray-800">Bantuan</span>
      </div>

      <div className="space-y-1 md:space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bantuan</h1>
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-md md:max-w-none">
          Ada kendala atau pertanyaan? Tim JumpaPay siap membantu kamu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
        <div className="lg:col-span-5 order-1">
          <div className="rounded-3xl md:rounded-4xl overflow-hidden bg-sky-100 aspect-4/5 lg:h-120 shadow-sm">
            <img 
              src="/support/customer-service.png" 
              alt="JumpaPay Support" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4 md:space-y-6 order-2">
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <a href="tel:628119509889" className="bg-gray-50 rounded-2xl md:rounded-3xl p-3 md:p-6 flex flex-col items-center gap-2 md:gap-3 text-center border border-gray-100 hover:shadow-md transition-all group">
              <div className="bg-sky-100 md:bg-sky-50 text-sky-500 p-2 md:p-3 rounded-full group-hover:bg-sky-500 group-hover:text-white transition-colors">
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-800 leading-tight">Hubungi JumpaPay</span>
            </a>
            <a href="https://wa.me/628119509889" target="_blank" rel="noopener noreferrer" className="bg-gray-50 rounded-2xl md:rounded-3xl p-3 md:p-6 flex flex-col items-center gap-2 md:gap-3 text-center border border-gray-100 hover:shadow-md transition-all group">
              <div className="bg-green-100 md:bg-green-50 text-green-500 p-2 md:p-3 rounded-full group-hover:bg-green-500 group-hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-800 leading-tight">Whatsapp JumpaPay</span>
            </a>
            <a href="mailto:info@jumpapay.com" className="bg-gray-50 rounded-2xl md:rounded-3xl p-3 md:p-6 flex flex-col items-center gap-2 md:gap-3 text-center border border-gray-100 hover:shadow-md transition-all group">
              <div className="bg-blue-100 md:bg-blue-50 text-blue-500 p-2 md:p-3 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-800 leading-tight">Email JumpaPay</span>
            </a>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 md:p-8 space-y-4 md:space-y-6 border border-gray-100 shadow-sm">
            <h3 className="text-base md:text-lg font-bold text-gray-800">Jam Operational JumpaPay</h3>
            <div className="space-y-4 md:space-y-6">
              <div>
                <p className="text-xs md:text-sm font-bold text-gray-800 mb-2 uppercase tracking-wider">Jam Operational Customer Service</p>
                <ul className="text-xs md:text-sm text-gray-500 space-y-1 list-disc ml-4">
                  <li>Senin – Jum'at : Jam 08:00 – 20:00 WIB</li>
                  <li>Sabtu & Minggu : Jam 08:00 – 17:00 WIB</li>
                </ul>
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-gray-800 mb-2 uppercase tracking-wider">Jam Jemput Dokumen</p>
                <ul className="text-xs md:text-sm text-gray-500 space-y-1 list-disc ml-4">
                  <li>Senin – Jum'at : Jam 08:00 – 12:00 WIB</li>
                  <li>Minggu : Jam 09:00 – 14:00 WIB</li>
                </ul>
              </div>
            </div>
            <p className="text-[10px] md:text-xs text-gray-400 italic leading-relaxed pt-2">
              Catatan: Pengambilan dokumen untuk pemesanan di hari Minggu dilakukan di hari Senin.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6 pt-6 md:pt-8 order-3">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">Pertanyaan Seputar Layanan JumpaPay</h2>
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 md:px-8 py-4 md:py-5 flex items-center justify-between text-left hover:bg-gray-100/30 transition-colors"
              >
                <span className="text-[13px] md:text-sm font-bold text-gray-800 pr-4 leading-snug">{faq.question}</span>
                <div className="text-gray-400 shrink-0">
                  {openIndex === index ? <Minus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} /> : <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-5 md:px-8 pb-4 md:pb-6 text-[12px] md:text-[13px] text-gray-500 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300 font-normal">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};