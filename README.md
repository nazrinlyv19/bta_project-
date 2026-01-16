# Enterprise QA Banking Dashboard

Bu layihə enterprise bank üçün daxili QA dashboard sistemidir. Latest React versiyaları ilə yaradılmışdır.

## 🚀 Texnologiyalar

- **React 19.2.0** - Ən son React versiyası
- **Vite 7.2.4** - Sürətli build tool
- **Tailwind CSS 4.1.18** - Modern CSS framework
- **React Router DOM** - Client-side routing
- **JavaScript** - TypeScript deyil, saf JS

## 📦 Quraşdırma

Bütün dependency-lər artıq quraşdırılıb. Əgər yenidən quraşdırmaq lazım olarsa:

```bash
npm install
```

## 🏃‍♂️ İstifadə

### Development server-i işə salmaq

```bash
npm run dev
```

Bu əmr development server-i işə salacaq. Adətən `http://localhost:5173` ünvanında açılır.

### Production üçün build

```bash
npm run build
```

Build edilmiş fayllar `dist/` qovluğunda olacaq.

### Preview build

```bash
npm run preview
```

## 🔐 Login Məlumatları

Bu sistem **mock authentication** istifadə edir. Real backend yoxdur.

**Giriş üçün:** İstənilən username və password daxil edin (boş olmamalıdır).

Login səhifəsi yalnız unauthorized istifadəçiləri blok etmək üçündür. QA Chapter Lead-ləri artıq access-ə malikdirlər.

## 📁 Struktur

```
bta/
├── src/
│   ├── pages/
│   │   ├── Login.jsx        # Login səhifəsi (50/50 split layout)
│   │   └── Dashboard.jsx    # Dashboard placeholder
│   ├── App.jsx              # Router konfiqurasiyası
│   ├── main.jsx             # Giriş nöqtəsi
│   └── index.css            # Tailwind directives
├── public/                  # Statik fayllar
├── index.html              # HTML şablon
├── tailwind.config.js      # Tailwind konfiqurasiyası
├── postcss.config.js       # PostCSS konfiqurasiyası
└── package.json            # Paket konfiqurasiyası
```

## 🎨 Login Page Xüsusiyyətləri

### Layout
- **50/50 Split Design:**
  - **Sol tərəf:** Dark corporate background (slate-900), ecosystem logo/image placeholder, dekorativ elementlər
  - **Sağ tərəf:** White background, centered login form, minimal dizayn

### Form Components
- Username input (icon ilə)
- Password input (show/hide toggle ilə)
- Error message display
- Sign In button
- SSL security badge
- Footer məlumatı

### Dizayn Prinsipi
- Corporate / Enterprise banking style
- No animations
- No gradients on right side
- Rounded inputs (rounded-lg)
- Clean spacing
- Desktop-first design
- Fully responsive

## 🛣️ Routing

- `/` - Login səhifəsi
- `/dashboard` - Dashboard (login-dən sonra)
- Digər bütün route-lar `/`-ə redirect olur

## 📝 Authentication Flow

1. İstifadəçi username və password daxil edir
2. Hər ikisi dolu olmalıdır
3. Uğurlu olsa → `/dashboard`-a yönlənir
4. Xəta olsa → error mesajı görsənir
5. Dashboard-dan logout → login səhifəsinə qayıdır

## 💡 Qeydlər

- Hot Module Replacement (HMR) aktiv olub
- Tailwind CSS-in bütün utility class-ları istifadəyə hazırdır
- React Router ilə SPA (Single Page Application) funksionallığı
- Mock authentication - real backend integration yoxdur
- Bütün komponentilərdə functional components və hooks istifadə olunur

## 🔧 Gələcək Təkmilləşdirmələr

- Real backend API integration
- JWT token authentication
- Remember me functionality
- Forgot password flow
- Multi-factor authentication (MFA)
- Session management
- Dashboard content expansion

---

© 2024 Enterprise QA Systems. Authorized Personnel Only.
