# FinPro Kurulum Kılavuzu (TR)

Bu proje, profesyonel bir finansal analiz platformudur. Aşağıda hem Backend (Arka Yüz) hem de Frontend (Ön Yüz) kurulum adımları yer almaktadır.

---

## 🚀 1. Hazırlık
Projenin çalışması için bilgisayarınızda şunların kurulu olması gerekir:
- **Python 3.10+**
- **Node.js (v18 veya üzeri)** & **npm**
- **Supabase Hesabı** (Veritabanı ve Üyelik için)

---

## 🛠️ 2. Backend (Python FastAPI) Kurulumu

1. `finpro/backend` dizinine gidin:
   ```bash
   cd finpro/backend
   ```

2. Sanal ortam oluşturun ve aktif edin:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Windows için: venv\Scripts\activate
   ```

3. Gerekli kütüphaneleri yükleyin:
   ```bash
   pip install -r requirements.txt
   ```

4. `.env` dosyasını oluşturun (veya `.env.example`'dan kopyalayın) ve Supabase bilgilerinizi girin:
   ```bash
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-service-role-key
   ```

5. Sunucuyu başlatın:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

---

## 📱 3. Frontend (React Native / Expo) Kurulumu

1. `finpro/frontend` dizinine gidin:
   ```bash
   cd finpro/frontend
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install --legacy-peer-deps
   ```

3. `.env` dosyasını oluşturun ve Supabase Anon Key'inizi girin:
   ```bash
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Uygulamayı başlatın:
   - **Web için:** `npx expo start --web`
   - **Mobil için:** `npx expo start` (Ardından Expo Go uygulamasıyla QR kodu taratın)

---

## 🗄️ 4. Veritabanı Kurulumu (Supabase)

Supabase SQL Editor kısmına gidin ve kök dizindeki `finpro/schema.sql` dosyasının içeriğini yapıştırıp **Run** butonuna basın. Bu işlem gerekli tabloları (`profiles`, `portfolios`) ve güvenlik kurallarını oluşturacaktır.

---

## 🌍 Dil Desteği
Uygulama varsayılan olarak Türkçe açılır. İngilizce veya Almanca'ya geçmek için `finpro/frontend/src/i18n/index.ts` dosyasındaki `lng` değerini değiştirebilirsiniz.

---

# FinPro Setup Guide (EN)

## 🛠️ Backend Setup
1. `cd finpro/backend`
2. `pip install -r requirements.txt`
3. `uvicorn main:app --reload`

## 📱 Frontend Setup
1. `cd finpro/frontend`
2. `npm install`
3. `npx expo start`
