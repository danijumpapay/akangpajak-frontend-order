import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RefundFormData, RefundErrors } from "../types";

interface RefundFormProps {
  formData: RefundFormData;
  errors: RefundErrors;
  isLoading: boolean;
  onNominalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (field: keyof RefundFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RefundForm = ({ 
  formData, 
  errors, 
  isLoading, 
  onNominalChange, 
  onInputChange, 
  onSubmit 
}: RefundFormProps) => (
  <form onSubmit={onSubmit} className="space-y-6 text-left">
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-800 ml-1">Nomor Order</label>
        <Input 
          disabled 
          value={formData.orderNumber} 
          className="bg-gray-50 border-gray-100 rounded-2xl h-12 cursor-not-allowed font-medium mt-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-800 ml-1">Nominal Awal</label>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
             <Input 
              disabled 
              value="345.600" 
              className="pl-10 bg-gray-50 border-gray-100 rounded-2xl h-12 cursor-not-allowed font-medium mt-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-800 ml-1">Nominal Aktual</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
            <Input 
              placeholder="0"
              value={formData.nominalAktual}
              onChange={onNominalChange}
              className={`pl-10 bg-white border rounded-2xl h-12 focus-visible:ring-[#27AAE1]/5 ${errors.nominalAktual ? 'border-red-500' : 'border-gray-100'} mt-2`}
            />
          </div>
          {errors.nominalAktual && <p className="text-[11px] text-red-500 font-medium ml-1">{errors.nominalAktual}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-800 ml-1">Pilih Bank</label>
          <Select 
            value={formData.bank} 
            onValueChange={(value) => onInputChange('bank', value)}
          >
            <SelectTrigger className={`w-full h-12 bg-white border rounded-2xl px-4 text-sm outline-none focus:ring-0 focus:border-[#27AAE1] transition-all ${errors.bank ? 'border-red-500' : 'border-gray-100'} mt-2`}>
              <SelectValue placeholder="Pilih bank yang dituju" />
            </SelectTrigger>
            <SelectContent className="rounded-xl min-w-(--radix-select-trigger-width)">
              <SelectItem value="bjb">BJB</SelectItem>
              <SelectItem value="bca">BCA</SelectItem>
              <SelectItem value="bni">BNI</SelectItem>
            </SelectContent>
          </Select>
          {errors.bank && <p className="text-[11px] text-red-500 font-medium ml-1">{errors.bank}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-800 ml-1">Nomor Rekening</label>
          <Input 
            placeholder="Ketik nomor rekening Anda"
            className={`bg-white border rounded-2xl h-12 focus-visible:ring-[#27AAE1]/5 ${errors.rekening ? 'border-red-500' : 'border-gray-100'} mt-2`}
            value={formData.rekening}
            onChange={(e) => onInputChange('rekening', e.target.value)}
          />
          {errors.rekening && <p className="text-[11px] text-red-500 font-medium ml-1">{errors.rekening}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-800 ml-1">Catatan Tambahan</label>
        <Textarea 
          placeholder="Ketik catatan tambahan untuk pengajuan refund di sini"
          className="bg-white border-gray-100 rounded-2xl min-h-25 focus-visible:ring-[#27AAE1]/5 resize-none mt-2"
          value={formData.catatan}
          onChange={(e) => onInputChange('catatan', e.target.value)}
        />
      </div>
    </div>

    <div className="pt-4">
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full h-14 bg-white border-2 border-[#27AAE1] text-[#27AAE1] hover:bg-[#27AAE1] hover:text-white rounded-full font-bold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Memproses...
          </>
        ) : (
          "Ajukan Pengembalian"
        )}
      </Button>
    </div>
  </form>
);