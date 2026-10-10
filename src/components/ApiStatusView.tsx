import React, { useState, useEffect } from 'react';
import { ApiStatusInfo } from '../types.ts';
import {
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Server,
  ShieldCheck,
  Zap,
  ExternalLink,
  Code2,
} from 'lucide-react';

export const ApiStatusView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [services, setServices] = useState<{
    api1_hd?: ApiStatusInfo;
    api2_upscale?: ApiStatusInfo;
    api3_wink?: ApiStatusInfo;
  }>({});

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      if (data.services) {
        setServices(data.services);
        setLastUpdated(new Date().toLocaleTimeString('id-ID'));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-sky-500" />
            <span>Status Layanan AI & Diagnostik</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pantauan status koneksi, latensi, dan ketersediaan 3 endpoint AI pemrosesan gambar secara nyata.
          </p>
        </div>

        <button
          type="button"
          onClick={checkStatus}
          disabled={loading}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
            loading
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-white border border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-600'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-sky-500' : ''}`} />
          <span>{loading ? 'Memeriksa...' : 'Periksa Ulang Sekarang'}</span>
        </button>
      </div>

      {lastUpdated && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Terakhir diperiksa pukul {lastUpdated}</span>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* API 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                API 1
              </span>
              <h3 className="font-bold text-slate-800 text-sm mt-1">HD Image Engine</h3>
            </div>
            {services.api1_hd?.ok ? (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Normal
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                Siap Pakai
              </span>
            )}
          </div>

          <div className="text-xs text-slate-500 font-mono break-all bg-slate-50 p-2 rounded-lg border border-slate-100">
            https://api.nexadev.my.id/tools/hd/
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Metode:</span>
              <strong className="font-mono">GET ?image=</strong>
            </div>
            <div className="flex justify-between">
              <span>Format Output:</span>
              <span>JSON (Image URL)</span>
            </div>
            <div className="flex justify-between">
              <span>Spesialisasi:</span>
              <span>Pengurangan blur & de-noise</span>
            </div>
          </div>
        </div>

        {/* API 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                API 2
              </span>
              <h3 className="font-bold text-slate-800 text-sm mt-1">Image Upscale Engine</h3>
            </div>
            {services.api2_upscale?.ok ? (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Normal
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                Siap Pakai
              </span>
            )}
          </div>

          <div className="text-xs text-slate-500 font-mono break-all bg-slate-50 p-2 rounded-lg border border-slate-100">
            https://api.nexadev.my.id/api/upscale
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Metode:</span>
              <strong className="font-mono">GET ?url=</strong>
            </div>
            <div className="flex justify-between">
              <span>Format Output:</span>
              <span>Biner (image/jpeg)</span>
            </div>
            <div className="flex justify-between">
              <span>Spesialisasi:</span>
              <span>Super Resolution 2x/4x</span>
            </div>
          </div>
        </div>

        {/* API 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                API 3
              </span>
              <h3 className="font-bold text-slate-800 text-sm mt-1">Wink AI Engine</h3>
            </div>
            {services.api3_wink?.ok ? (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Normal
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                Siap Pakai
              </span>
            )}
          </div>

          <div className="text-xs text-slate-500 font-mono break-all bg-slate-50 p-2 rounded-lg border border-slate-100">
            https://api.nexadev.my.id/api/wink
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Metode:</span>
              <strong className="font-mono">GET ?url=</strong>
            </div>
            <div className="flex justify-between">
              <span>Format Output:</span>
              <span>JSON (Result URL)</span>
            </div>
            <div className="flex justify-between">
              <span>Spesialisasi:</span>
              <span>Potret, wajah & kecantikan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture & Reliability Architecture */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 space-y-4">
        <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <Zap className="w-5 h-5 text-sky-500" />
          <span>Sistem Pembatasan Kuota & Perlindungan API</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-2xl bg-sky-50/50 space-y-2 border border-sky-100">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
              <Server className="w-4 h-4 text-sky-600" />
              <span>Batas 3x per 24 Jam</span>
            </h4>
            <p className="leading-relaxed text-slate-500">
              Setiap pengguna diberikan kuota 3 kali pemrosesan HD per 24 jam untuk foto dan video bergerak. Batasan ini diterapkan guna melindungi kunci API dari kelebihan beban, menjaga antrean tetap cepat, dan mencegah penyalahgunaan server.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 space-y-2 border border-indigo-100">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Engine Video Bergerak H.264</span>
            </h4>
            <p className="leading-relaxed text-slate-500">
              Peningkatan kualitas video memproses video bergerak penuh menggunakan filter neural Lanczos scaling, unsharp de-blur, dan peredam noise spatio-temporal dengan tetap mempertahankan sinkronisasi audio AAC serta durasi aslinya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
