# tMinus1 App with Rise 
This is an official project with Rise Academy for mobile App dev

The app structure plan!!!

Tminus1/
├── app/                          # Expo Router (file-based routing)
│   ├── _layout.tsx               # Root layout (fonts, providers)
│   ├── index.tsx                 # Entry → redirects to onboarding or home
│   │
│   ├── onboarding/
│   │   ├── _layout.tsx           # Stack navigator for onboarding
│   │   ├── splash.tsx
│   │   ├── screen1.tsx
│   │   ├── screen2.tsx
│   │   └── screen3.tsx
│   │
│   ├── auth/
│   │   ├── _layout.tsx           # Stack navigator for auth
│   │   ├── sign-in.tsx           # Sign in (main)
│   │   ├── sign-in-fingerprint.tsx
│   │   ├── sign-up.tsx
│   │   ├── sign-up-details.tsx
│   │   ├── sign-up-verify.tsx    # OTP screen
│   │   └── sign-up-complete.tsx
│   │
│   └── (tabs)/                   # Bottom tab navigator
│       ├── _layout.tsx           # Tab bar config
│       │
│       ├── home/
│       │   ├── _layout.tsx       # Stack inside Home tab
│       │   ├── index.tsx         # Home screen 1
│       │   ├── dashboard.tsx     # Home screen 2
│       │   ├── notifications.tsx
│       │   └── qr-scanner.tsx
│       │
│       ├── market/
│       │   ├── _layout.tsx
│       │   └── index.tsx
│       │
│       ├── trade/
│       │   ├── _layout.tsx
│       │   ├── index.tsx         # Trade landing
│       │   ├── buy.tsx
│       │   └── sell.tsx
│       │
│       ├── activity/
│       │   ├── _layout.tsx
│       │   └── index.tsx
│       │
│       └── wallet/
│           ├── _layout.tsx
│           └── index.tsx
│
├── src/
│   ├── components/
│   │   ├── ui/                   # Buttons, inputs, cards, etc.
│   │   ├── onboarding/
│   │   ├── auth/
│   │   ├── home/
│   │   ├── trade/
│   │   └── shared/               # Header, TabBar, modals
│   │
│   ├── screens/                  # (optional) screen logic separated from routing)
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useBiometrics.ts
│   │   └── useOTP.ts
│   │
│   ├── store/                    # Zustand or Redux
│   │   ├── authStore.ts
│   │   ├── walletStore.ts
│   │   └── tradeStore.ts
│   │
│   ├── services/                 # API calls
│   │   ├── api.ts                # Axios/fetch base config
│   │   ├── authService.ts
│   │   ├── tradeService.ts
│   │   └── marketService.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── constants/
│   │   ├── colors.ts             #Done!!!!yes!!!
│   │   ├── fonts.ts.              #Done!!!!yes!!!
│   │   └── routes.ts
│   │
│   └── utils/
│       ├── formatCurrency.ts
│       └── storage.ts            # AsyncStorage helpers
│
├── assets/
│   ├── images/               #Done!!!!yes!!!
│   ├── icons/                #Done!!!!yes!!!
│   └── fonts/                #Done!!!!yes!!!
│
├── app.json
├── babel.config.js
├── tsconfig.json
└── package.json


# for the trade screen here is the plan
Trade Screen
├── Header (avatar + icons)
├── Tab bar (Convert, Spot, Margin, Fiat)
├── Price + pair
├── Candlestick chart
├── Time intervals (1m, 5m, 15m...)
├── Buy / Sell toggle bar
├── Order Books table (main screen)
└── Bottom Panel (slides up when Buy/Sell tapped)
    ├── Limit / Market / Stop Limit tabs
    ├── Price input
    ├── Quantity input
    ├── Percentage slider (25/50/75/100%)
    ├── Total
    └── Buy or Sell button


// file structure
app/(tabs)/trades/
├── _layout.tsx
└── index.tsx          ← everything lives here (panel state handles buy/sell)

src/components/trades/
├── TradeHeader.tsx
├── TradeTabs.tsx        ← Convert, Spot, Margin, Fiat
├── PriceDisplay.tsx
├── CandlestickChart.tsx
├── IntervalTabs.tsx     ← 1m 5m 15m 1d More
├── BuySellToggle.tsx
├── OrderBook.tsx
└── TradePanel.tsx       ← the sliding bottom panel
