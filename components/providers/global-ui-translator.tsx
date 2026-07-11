"use client";

import { useEffect, useMemo } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import type { Locale } from "@/lib/i18n";

type PhraseMap = Record<string, string>;
type LocalePhraseMaps = Partial<Record<Locale, PhraseMap>>;

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA", "CANVAS", "SVG"]);
const TRANSLATED_TEXT = "data-original-text";
const TRANSLATED_ATTR_PREFIX = "data-original-attr-";
const TRANSLATED_VALUE = "data-original-value";
const ATTRIBUTES = ["placeholder", "aria-label", "title", "alt"] as const;

const englishPhrases = [
  "Home",
  "Products",
  "Product",
  "PCB Products",
  "PCBA Products",
  "PCB Product Center",
  "All Products",
  "Rigid PCB",
  "Flexible PCB",
  "Rigid-Flex PCB",
  "Aluminum PCB",
  "High Frequency PCB",
  "HDI PCB",
  "SMT Assembly",
  "THT Assembly",
  "Box Build Assembly",
  "Turnkey Assembly",
  "Engineering Service",
  "About FT PCB",
  "About SysPCB",
  "PCB Manufacture",
  "PCB Assembly",
  "Capability",
  "Value Add Service",
  "Contact",
  "Contact Us",
  "Navigation",
  "Select Country",
  "Shopping cart",
  "Toggle navigation",
  "Precision PCB Partner",
  "Wuping Feitian Electronic Technology Company Limited",
  "Explore our company at a glance",
  "Browse PCB products, manufacturing capabilities, and assembly services from one clean menu.",
  "Instant Quote",
  "PCB Prototype",
  "SMT Stencil",
  "Length",
  "Width",
  "Layers",
  "Thickness",
  "Quantity",
  "PCB Quantity",
  "SMT Pads",
  "Through Holes",
  "Unique Parts",
  "Stencil Type",
  "Size",
  "Side",
  "Choose Layers",
  "Choose Thickness",
  "Choose Stencil Type",
  "Choose Side",
  "Standard",
  "Custom",
  "Enter Length",
  "Enter Width",
  "Enter Quantity",
  "Contact Email",
  "Phone / WhatsApp",
  "Upload Gerber / BOM File",
  "Files Ready for Review",
  "Uploading files...",
  "ZIP, RAR, 7Z, XLSX, CSV, PDF supported",
  "ZIP, XLSX, CSV, PDF supported",
  "Engineering team will review your uploaded PCB files.",
  "Quote Now",
  "Engineer Review",
  "PCB fabrication, PCBA, flex PCB and stencil quote support.",
  "Wuping Feitian Electronic Technology",
  "Precision PCB Manufacturing",
  "Professional PCB, PCBA, flexible PCB, SMT stencil and engineering solutions worldwide.",
  "Search",
  "Search PCB products...",
  "Product Overview",
  "Related Products",
  "Add to Cart",
  "Add To Cart",
  "Buy Now",
  "View Details",
  "View Products",
  "Browse Products",
  "Learn More",
  "Read More",
  "Get Quote",
  "Sales Inquiry",
  "Support Team",
  "Cart",
  "Shopping Cart",
  "Review your PCB order",
  "Cart Summary",
  "Total Products",
  "Proceed to Checkout",
  "Secure Checkout",
  "Shipping Address",
  "Payment Method",
  "Payment Successful!",
  "Payment Needs Review",
  "Confirming Payment...",
  "Payment History",
  "Dashboard",
  "Customer Dashboard",
  "My Orders",
  "My Cart",
  "Quotes",
  "Profile",
  "Settings",
  "Support",
  "Orders",
  "Payments",
  "Wishlist",
  "Address Book",
  "Add Address",
  "Edit Address",
  "Payment Transactions",
  "Payment ID",
  "Project Name",
  "PCB Parameters",
  "Save Quote to Dashboard",
  "Upload Gerber",
  "PCB Assembly (PCBA)",
  "Assembly Parameters",
  "Assembly Type",
  "Assembly Sides",
  "Submit Assembly Request",
  "Login",
  "Logout",
  "Register",
  "Welcome Back",
  "Email Address",
  "Password",
  "Confirm Password",
  "Create Account",
  "Create an account",
  "Full Name",
  "Company Name",
  "Phone Number",
  "Address (Optional)",
  "Already have an account?",
  "Don't have an account?",
  "Forgot Password",
  "Reset Password",
  "Verify Email",
  "Back to Login",
  "Name",
  "Email",
  "Phone",
  "Address",
  "City",
  "Country",
  "Save",
  "Submit",
  "Cancel",
  "Delete",
  "Edit",
  "Update",
  "Create",
  "Loading",
  "Loading...",
  "Overview",
  "Quality",
  "Factory",
  "Manufacturing",
  "Assembly",
  "Headquarters",
  "Email Us",
  "Call Us",
  "Factory Address",
  "Shenzhen Address",
  "On-Time Delivery",
  "Export Countries",
  "Years Experience",
  "PCB Models",
  "Theme",
  "Light",
  "Dark",
  "System",
  "Active",
  "Pending",
  "Approved",
  "Rejected",
  "Reviewing",
  "Completed",
  "Status",
  "Action",
  "Actions",
  "Price",
  "Total",
  "Subtotal",
  "Description",
  "Category",
  "Upload",
  "Download",
  "Preview",
  "Close",
  "Open",
  "Next",
  "Previous",
  "Continue",
  "Back",
  "Submit Request",
  "Message",
  "Subject",
  "Send Message",
  "Your files are already sent for quote review.",
  "Upload your Gerber/BOM file first for the fastest quote.",
  "Please enter a valid contact email before uploading.",
  "Upload failed. Please try again.",
  "Upload complete.",
];

const maps: LocalePhraseMaps = {
  zh: {
    "Home": "首页", "Products": "产品", "Product": "产品", "PCB Products": "PCB产品", "PCBA Products": "PCBA产品", "PCB Product Center": "PCB产品中心", "All Products": "全部产品", "Rigid PCB": "刚性PCB", "Flexible PCB": "柔性PCB", "Rigid-Flex PCB": "软硬结合板", "Aluminum PCB": "铝基板", "High Frequency PCB": "高频PCB", "HDI PCB": "HDI PCB", "SMT Assembly": "SMT贴片", "THT Assembly": "插件装配", "Box Build Assembly": "整机组装", "Turnkey Assembly": "一站式装配", "Engineering Service": "工程服务", "About FT PCB": "关于FT PCB", "About SysPCB": "关于FT PCB", "PCB Manufacture": "PCB制造", "PCB Assembly": "PCB装配", "Capability": "能力", "Value Add Service": "增值服务", "Contact": "联系", "Contact Us": "联系我们", "Navigation": "导航", "Select Country": "选择国家", "Shopping cart": "购物车", "Toggle navigation": "切换导航", "Instant Quote": "即时报价", "PCB Prototype": "PCB样板", "SMT Stencil": "SMT钢网", "Length": "长度", "Width": "宽度", "Layers": "层数", "Thickness": "厚度", "Quantity": "数量", "Standard": "标准", "Custom": "定制", "Contact Email": "联系邮箱", "Phone / WhatsApp": "电话 / WhatsApp", "Upload Gerber / BOM File": "上传Gerber / BOM文件", "Files Ready for Review": "文件已提交审核", "Uploading files...": "正在上传文件...", "Quote Now": "立即报价", "Engineer Review": "工程师审核", "Precision PCB Manufacturing": "精密PCB制造", "Search": "搜索", "Add to Cart": "加入购物车", "Add To Cart": "加入购物车", "Buy Now": "立即购买", "View Products": "查看产品", "Learn More": "了解更多", "Get Quote": "获取报价", "Cart": "购物车", "Dashboard": "仪表盘", "My Orders": "我的订单", "Quotes": "报价", "Profile": "资料", "Settings": "设置", "Support": "支持", "Orders": "订单", "Payments": "支付", "Wishlist": "愿望清单", "Login": "登录", "Logout": "退出", "Register": "注册", "Welcome Back": "欢迎回来", "Email Address": "邮箱地址", "Password": "密码", "Confirm Password": "确认密码", "Create Account": "创建账户", "Full Name": "姓名", "Company Name": "公司名称", "Phone Number": "电话号码", "Forgot Password": "忘记密码", "Name": "姓名", "Email": "邮箱", "Phone": "电话", "Address": "地址", "City": "城市", "Country": "国家", "Save": "保存", "Submit": "提交", "Cancel": "取消", "Delete": "删除", "Edit": "编辑", "Update": "更新", "Create": "创建", "Loading": "加载中", "Loading...": "加载中...", "Overview": "概览", "Quality": "质量", "Factory": "工厂", "Manufacturing": "制造", "Assembly": "装配", "Headquarters": "总部", "Email Us": "给我们发邮件", "Call Us": "致电我们", "Status": "状态", "Action": "操作", "Actions": "操作", "Price": "价格", "Total": "总计", "Description": "描述", "Category": "类别", "Upload": "上传", "Download": "下载", "Preview": "预览", "Close": "关闭", "Open": "打开", "Next": "下一步", "Previous": "上一步", "Continue": "继续", "Back": "返回", "Message": "消息", "Subject": "主题", "Send Message": "发送消息"
  },
  ja: {
    "Home": "ホーム", "Products": "製品", "Product": "製品", "PCB Products": "PCB製品", "PCBA Products": "PCBA製品", "PCB Product Center": "PCB製品センター", "All Products": "すべての製品", "Rigid PCB": "リジッドPCB", "Flexible PCB": "フレキシブルPCB", "Rigid-Flex PCB": "リジッドフレックスPCB", "Aluminum PCB": "アルミPCB", "High Frequency PCB": "高周波PCB", "HDI PCB": "HDI PCB", "SMT Assembly": "SMT実装", "THT Assembly": "THT実装", "Box Build Assembly": "ボックスビルド実装", "Turnkey Assembly": "ターンキー実装", "Engineering Service": "エンジニアリングサービス", "About FT PCB": "FT PCBについて", "About SysPCB": "FT PCBについて", "PCB Manufacture": "PCB製造", "PCB Assembly": "PCB実装", "Capability": "対応能力", "Value Add Service": "付加価値サービス", "Contact": "お問い合わせ", "Contact Us": "お問い合わせ", "Navigation": "ナビゲーション", "Select Country": "国を選択", "Shopping cart": "ショッピングカート", "Toggle navigation": "ナビゲーション切替", "Precision PCB Partner": "精密PCBパートナー", "Explore our company at a glance": "当社を素早くご確認ください", "Browse PCB products, manufacturing capabilities, and assembly services from one clean menu.": "PCB製品、製造能力、実装サービスをひとつのメニューから確認できます。", "Instant Quote": "即時見積", "PCB Prototype": "PCB試作", "SMT Stencil": "SMTステンシル", "Length": "長さ", "Width": "幅", "Layers": "層数", "Thickness": "厚さ", "Quantity": "数量", "PCB Quantity": "PCB数量", "SMT Pads": "SMTパッド", "Through Holes": "スルーホール", "Unique Parts": "部品点数", "Stencil Type": "ステンシル種類", "Size": "サイズ", "Side": "面", "Choose Layers": "層数を選択", "Choose Thickness": "厚さを選択", "Standard": "標準", "Custom": "カスタム", "Enter Length": "長さを入力", "Enter Width": "幅を入力", "Enter Quantity": "数量を入力", "Contact Email": "連絡用メール", "Phone / WhatsApp": "電話 / WhatsApp", "Upload Gerber / BOM File": "Gerber / BOMファイルをアップロード", "Files Ready for Review": "ファイルはレビュー準備完了", "Uploading files...": "ファイルをアップロード中...", "ZIP, RAR, 7Z, XLSX, CSV, PDF supported": "ZIP、RAR、7Z、XLSX、CSV、PDFに対応", "ZIP, XLSX, CSV, PDF supported": "ZIP、XLSX、CSV、PDFに対応", "Engineering team will review your uploaded PCB files.": "エンジニアリングチームがアップロードされたPCBファイルを確認します。", "Quote Now": "今すぐ見積", "Engineer Review": "エンジニアレビュー", "PCB fabrication, PCBA, flex PCB and stencil quote support.": "PCB製造、PCBA、フレキシブルPCB、ステンシル見積に対応。", "Precision PCB Manufacturing": "精密PCB製造", "Professional PCB, PCBA, flexible PCB, SMT stencil and engineering solutions worldwide.": "PCB、PCBA、フレキシブルPCB、SMTステンシル、エンジニアリングソリューションを世界中に提供。", "Search": "検索", "Search PCB products...": "PCB製品を検索...", "Product Overview": "製品概要", "Related Products": "関連製品", "Add to Cart": "カートに追加", "Add To Cart": "カートに追加", "Buy Now": "今すぐ購入", "View Details": "詳細を見る", "View Products": "製品を見る", "Browse Products": "製品を閲覧", "Learn More": "詳しく見る", "Read More": "続きを読む", "Get Quote": "見積依頼", "Sales Inquiry": "営業問い合わせ", "Support Team": "サポートチーム", "Cart": "カート", "Shopping Cart": "ショッピングカート", "Review your PCB order": "PCB注文を確認", "Cart Summary": "カート概要", "Total Products": "合計製品", "Proceed to Checkout": "チェックアウトへ進む", "Secure Checkout": "安全なチェックアウト", "Shipping Address": "配送先住所", "Payment Method": "支払い方法", "Payment Successful!": "支払いが完了しました！", "Payment Needs Review": "支払い確認が必要です", "Confirming Payment...": "支払いを確認中...", "Payment History": "支払い履歴", "Dashboard": "ダッシュボード", "Customer Dashboard": "顧客ダッシュボード", "My Orders": "注文履歴", "My Cart": "マイカート", "Quotes": "見積", "Profile": "プロフィール", "Settings": "設定", "Support": "サポート", "Orders": "注文", "Payments": "支払い", "Wishlist": "ウィッシュリスト", "Address Book": "住所録", "Add Address": "住所を追加", "Edit Address": "住所を編集", "Payment Transactions": "支払い取引", "Payment ID": "支払いID", "Project Name": "プロジェクト名", "PCB Parameters": "PCBパラメータ", "Save Quote to Dashboard": "見積をダッシュボードに保存", "Upload Gerber": "Gerberをアップロード", "PCB Assembly (PCBA)": "PCB実装（PCBA）", "Assembly Parameters": "実装パラメータ", "Assembly Type": "実装タイプ", "Assembly Sides": "実装面", "Submit Assembly Request": "実装リクエストを送信", "Login": "ログイン", "Logout": "ログアウト", "Register": "登録", "Welcome Back": "お帰りなさい", "Email Address": "メールアドレス", "Password": "パスワード", "Confirm Password": "パスワード確認", "Create Account": "アカウント作成", "Create an account": "アカウントを作成", "Full Name": "氏名", "Company Name": "会社名", "Phone Number": "電話番号", "Address (Optional)": "住所（任意）", "Already have an account?": "すでにアカウントをお持ちですか？", "Don't have an account?": "アカウントをお持ちでないですか？", "Forgot Password": "パスワードを忘れた", "Reset Password": "パスワードをリセット", "Verify Email": "メールを確認", "Back to Login": "ログインに戻る", "Name": "名前", "Email": "メール", "Phone": "電話", "Address": "住所", "City": "市区町村", "Country": "国", "Save": "保存", "Submit": "送信", "Cancel": "キャンセル", "Delete": "削除", "Edit": "編集", "Update": "更新", "Create": "作成", "Loading": "読み込み中", "Loading...": "読み込み中...", "Overview": "概要", "Quality": "品質", "Factory": "工場", "Manufacturing": "製造", "Assembly": "実装", "Headquarters": "本社", "Email Us": "メールで問い合わせ", "Call Us": "電話で問い合わせ", "Factory Address": "工場住所", "Shenzhen Address": "深圳住所", "On-Time Delivery": "納期遵守", "Export Countries": "輸出国", "Years Experience": "年の経験", "PCB Models": "PCBモデル", "Light": "ライト", "Dark": "ダーク", "System": "システム", "Active": "有効", "Pending": "保留中", "Approved": "承認済み", "Rejected": "却下", "Reviewing": "確認中", "Completed": "完了", "Status": "ステータス", "Action": "操作", "Actions": "操作", "Price": "価格", "Total": "合計", "Subtotal": "小計", "Description": "説明", "Category": "カテゴリ", "Upload": "アップロード", "Download": "ダウンロード", "Preview": "プレビュー", "Close": "閉じる", "Open": "開く", "Next": "次へ", "Previous": "前へ", "Continue": "続行", "Back": "戻る", "Submit Request": "リクエストを送信", "Message": "メッセージ", "Subject": "件名", "Send Message": "メッセージを送信", "Please enter a valid contact email before uploading.": "アップロード前に有効な連絡用メールを入力してください。", "Upload failed. Please try again.": "アップロードに失敗しました。もう一度お試しください。"
  },
  ko: { "Home": "홈", "Products": "제품", "Contact": "문의", "Login": "로그인", "Register": "회원가입", "Dashboard": "대시보드", "Instant Quote": "즉시 견적", "Quote Now": "견적 받기", "Engineer Review": "엔지니어 검토", "Upload Gerber / BOM File": "Gerber / BOM 파일 업로드", "Search": "검색", "Cart": "장바구니", "Add to Cart": "장바구니에 추가", "Buy Now": "지금 구매", "Email Address": "이메일 주소", "Password": "비밀번호", "Create Account": "계정 만들기", "Save": "저장", "Submit": "제출", "Cancel": "취소", "Delete": "삭제", "Edit": "편집", "Update": "업데이트", "Loading...": "로딩 중...", "Select Country": "국가 선택" },
  bn: { "Home": "হোম", "Products": "প্রোডাক্ট", "Contact": "যোগাযোগ", "Login": "লগইন", "Register": "রেজিস্টার", "Dashboard": "ড্যাশবোর্ড", "Instant Quote": "তাৎক্ষণিক কোটেশন", "Quote Now": "এখন কোটেশন নিন", "Engineer Review": "ইঞ্জিনিয়ার রিভিউ", "Upload Gerber / BOM File": "Gerber / BOM ফাইল আপলোড করুন", "Search": "সার্চ", "Cart": "কার্ট", "Add to Cart": "কার্টে যোগ করুন", "Buy Now": "এখন কিনুন", "Email Address": "ইমেইল ঠিকানা", "Password": "পাসওয়ার্ড", "Create Account": "অ্যাকাউন্ট তৈরি করুন", "Save": "সেভ", "Submit": "সাবমিট", "Cancel": "ক্যানসেল", "Delete": "ডিলিট", "Edit": "এডিট", "Update": "আপডেট", "Loading...": "লোড হচ্ছে...", "Select Country": "দেশ নির্বাচন করুন" },
  de: { "Home": "Startseite", "Products": "Produkte", "Contact": "Kontakt", "Login": "Anmelden", "Register": "Registrieren", "Dashboard": "Dashboard", "Instant Quote": "Sofortangebot", "Quote Now": "Jetzt anfragen", "Engineer Review": "Ingenieurprüfung", "Upload Gerber / BOM File": "Gerber-/BOM-Datei hochladen", "Search": "Suchen", "Cart": "Warenkorb", "Add to Cart": "In den Warenkorb", "Buy Now": "Jetzt kaufen", "Email Address": "E-Mail-Adresse", "Password": "Passwort", "Create Account": "Konto erstellen", "Save": "Speichern", "Submit": "Senden", "Cancel": "Abbrechen", "Delete": "Löschen", "Edit": "Bearbeiten", "Update": "Aktualisieren", "Loading...": "Lädt...", "Select Country": "Land auswählen" },
  hi: { "Home": "होम", "Products": "उत्पाद", "Contact": "संपर्क", "Login": "लॉगिन", "Register": "रजिस्टर", "Dashboard": "डैशबोर्ड", "Instant Quote": "तुरंत कोटेशन", "Quote Now": "अभी कोटेशन लें", "Engineer Review": "इंजीनियर समीक्षा", "Upload Gerber / BOM File": "Gerber / BOM फाइल अपलोड करें", "Search": "खोजें", "Cart": "कार्ट", "Add to Cart": "कार्ट में जोड़ें", "Buy Now": "अभी खरीदें", "Email Address": "ईमेल पता", "Password": "पासवर्ड", "Create Account": "अकाउंट बनाएं", "Save": "सेव", "Submit": "सबमिट", "Cancel": "रद्द", "Delete": "डिलीट", "Edit": "एडिट", "Update": "अपडेट", "Loading...": "लोड हो रहा है...", "Select Country": "देश चुनें" },
  ur: { "Home": "ہوم", "Products": "مصنوعات", "Contact": "رابطہ", "Login": "لاگ ان", "Register": "رجسٹر", "Dashboard": "ڈیش بورڈ", "Instant Quote": "فوری کوٹیشن", "Quote Now": "ابھی کوٹیشن لیں", "Engineer Review": "انجینئر ریویو", "Upload Gerber / BOM File": "Gerber / BOM فائل اپ لوڈ کریں", "Search": "تلاش", "Cart": "کارٹ", "Add to Cart": "کارٹ میں شامل کریں", "Buy Now": "ابھی خریدیں", "Email Address": "ای میل ایڈریس", "Password": "پاس ورڈ", "Create Account": "اکاؤنٹ بنائیں", "Save": "محفوظ کریں", "Submit": "جمع کریں", "Cancel": "منسوخ", "Delete": "حذف", "Edit": "ترمیم", "Update": "اپ ڈیٹ", "Loading...": "لوڈ ہو رہا ہے...", "Select Country": "ملک منتخب کریں" },
  fr: { "Home": "Accueil", "Products": "Produits", "Contact": "Contact", "Login": "Connexion", "Register": "Inscription", "Dashboard": "Tableau de bord", "Instant Quote": "Devis instantané", "Quote Now": "Demander un devis", "Engineer Review": "Revue ingénieur", "Upload Gerber / BOM File": "Téléverser Gerber / BOM", "Search": "Rechercher", "Cart": "Panier", "Add to Cart": "Ajouter au panier", "Buy Now": "Acheter maintenant", "Email Address": "Adresse e-mail", "Password": "Mot de passe", "Create Account": "Créer un compte", "Save": "Enregistrer", "Submit": "Envoyer", "Cancel": "Annuler", "Delete": "Supprimer", "Edit": "Modifier", "Update": "Mettre à jour", "Loading...": "Chargement...", "Select Country": "Choisir le pays" },
  it: {
    "Home": "Home", "Products": "Prodotti", "Product": "Prodotto", "PCB Products": "Prodotti PCB", "PCBA Products": "Prodotti PCBA", "PCB Product Center": "Centro prodotti PCB", "All Products": "Tutti i prodotti", "Rigid PCB": "PCB rigido", "Flexible PCB": "PCB flessibile", "Rigid-Flex PCB": "PCB rigido-flessibile", "Aluminum PCB": "PCB in alluminio", "High Frequency PCB": "PCB ad alta frequenza", "HDI PCB": "PCB HDI", "SMT Assembly": "Assemblaggio SMT", "THT Assembly": "Assemblaggio THT", "Box Build Assembly": "Assemblaggio box build", "Turnkey Assembly": "Assemblaggio chiavi in mano", "Engineering Service": "Servizio di ingegneria", "About FT PCB": "Informazioni su FT PCB", "About SysPCB": "Informazioni su FT PCB", "PCB Manufacture": "Produzione PCB", "PCB Assembly": "Assemblaggio PCB", "Capability": "Capacità", "Value Add Service": "Servizi a valore aggiunto", "Contact": "Contatto", "Contact Us": "Contattaci", "Navigation": "Navigazione", "Select Country": "Seleziona paese", "Shopping cart": "Carrello", "Toggle navigation": "Apri navigazione", "Precision PCB Partner": "Partner PCB di precisione", "Wuping Feitian Electronic Technology Company Limited": "Società Wuping Feitian Electronic Technology Co., Ltd.", "Wuping Feitian Electronic Technology Company Limited logo": "Logo della società Wuping Feitian Electronic Technology", "Explore our company at a glance": "Scopri la nostra azienda in sintesi", "Browse PCB products, manufacturing capabilities, and assembly services from one clean menu.": "Esplora prodotti PCB, capacità produttive e servizi di assemblaggio da un unico menu.", "Instant Quote": "Preventivo immediato", "PCB Prototype": "Prototipo PCB", "SMT Stencil": "Stencil SMT", "Length": "Lunghezza", "Width": "Larghezza", "Layers": "Strati", "Thickness": "Spessore", "Quantity": "Quantità", "PCB Quantity": "Quantità PCB", "SMT Pads": "Pad SMT", "Through Holes": "Fori passanti", "Unique Parts": "Componenti unici", "Stencil Type": "Tipo stencil", "Size": "Dimensione", "Side": "Lato", "Choose Layers": "Scegli strati", "Choose Thickness": "Scegli spessore", "Standard": "Standard", "Custom": "Personalizzato", "Enter Length": "Inserisci lunghezza", "Enter Width": "Inserisci larghezza", "Enter Quantity": "Inserisci quantità", "Contact Email": "Email di contatto", "Phone / WhatsApp": "Telefono / WhatsApp", "Upload Gerber / BOM File": "Carica file Gerber / BOM", "Files Ready for Review": "File pronti per la revisione", "Uploading files...": "Caricamento file...", "ZIP, RAR, 7Z, XLSX, CSV, PDF supported": "Supporta ZIP, RAR, 7Z, XLSX, CSV, PDF", "ZIP, XLSX, CSV, PDF supported": "Supporta ZIP, XLSX, CSV, PDF", "Engineering team will review your uploaded PCB files.": "Il team tecnico esaminerà i file PCB caricati.", "Quote Now": "Richiedi preventivo", "Engineer Review": "Revisione tecnica", "PCB fabrication, PCBA, flex PCB and stencil quote support.": "Supporto preventivi per PCB, PCBA, PCB flessibili e stencil.", "Wuping Feitian Electronic Technology": "Wuping Feitian Electronic Technology", "Precision PCB Manufacturing": "Produzione PCB di precisione", "Professional PCB, PCBA, flexible PCB, SMT stencil and engineering solutions worldwide.": "Soluzioni professionali globali per PCB, PCBA, PCB flessibili, stencil SMT e ingegneria.", "Search": "Cerca", "Search PCB products...": "Cerca prodotti PCB...", "Product Overview": "Panoramica prodotto", "Related Products": "Prodotti correlati", "Add to Cart": "Aggiungi al carrello", "Add To Cart": "Aggiungi al carrello", "Add": "Aggiungi", "Buy Now": "Acquista ora", "View Details": "Vedi dettagli", "View Products": "Vedi prodotti", "Browse Products": "Sfoglia prodotti", "Learn More": "Scopri di più", "Read More": "Leggi di più", "Get Quote": "Richiedi preventivo", "Sales Inquiry": "Richiesta commerciale", "Support Team": "Team di supporto", "Cart": "Carrello", "Shopping Cart": "Carrello acquisti", "Review your PCB order": "Controlla il tuo ordine PCB", "Cart Summary": "Riepilogo carrello", "Total Products": "Totale prodotti", "Proceed to Checkout": "Procedi al pagamento", "Secure Checkout": "Pagamento sicuro", "Shipping Address": "Indirizzo di spedizione", "Payment Method": "Metodo di pagamento", "Payment Successful!": "Pagamento riuscito!", "Payment Needs Review": "Pagamento da verificare", "Confirming Payment...": "Conferma pagamento...", "Payment History": "Storico pagamenti", "Dashboard": "Pannello", "Customer Dashboard": "Pannello cliente", "My Orders": "I miei ordini", "My Cart": "Il mio carrello", "Quotes": "Preventivi", "Profile": "Profilo", "Settings": "Impostazioni", "Support": "Supporto", "Orders": "Ordini", "Payments": "Pagamenti", "Wishlist": "Lista desideri", "Address Book": "Rubrica indirizzi", "Add Address": "Aggiungi indirizzo", "Edit Address": "Modifica indirizzo", "Payment Transactions": "Transazioni di pagamento", "Payment ID": "ID pagamento", "Project Name": "Nome progetto", "PCB Parameters": "Parametri PCB", "Save Quote to Dashboard": "Salva preventivo nel pannello", "Upload Gerber": "Carica Gerber", "PCB Assembly (PCBA)": "Assemblaggio PCB (PCBA)", "Assembly Parameters": "Parametri assemblaggio", "Assembly Type": "Tipo assemblaggio", "Assembly Sides": "Lati assemblaggio", "Submit Assembly Request": "Invia richiesta di assemblaggio", "Login": "Accedi", "Logout": "Esci", "Register": "Registrati", "Welcome Back": "Bentornato", "Email Address": "Indirizzo email", "Password": "Password", "Confirm Password": "Conferma password", "Create Account": "Crea account", "Create an account": "Crea un account", "Full Name": "Nome completo", "Company Name": "Nome azienda", "Phone Number": "Numero di telefono", "Address (Optional)": "Indirizzo (opzionale)", "Already have an account?": "Hai già un account?", "Don't have an account?": "Non hai un account?", "Forgot Password": "Password dimenticata", "Reset Password": "Reimposta password", "Verify Email": "Verifica email", "Back to Login": "Torna al login", "Name": "Nome", "Email": "Email", "Phone": "Telefono", "Address": "Indirizzo", "City": "Città", "Country": "Paese", "Save": "Salva", "Submit": "Invia", "Cancel": "Annulla", "Delete": "Elimina", "Edit": "Modifica", "Update": "Aggiorna", "Create": "Crea", "Loading": "Caricamento", "Loading...": "Caricamento...", "Overview": "Panoramica", "Quality": "Qualità", "Factory": "Fabbrica", "Manufacturing": "Produzione", "Assembly": "Assemblaggio", "Headquarters": "Sede centrale", "Email Us": "Scrivici", "Call Us": "Chiamaci", "Factory Address": "Indirizzo fabbrica", "Shenzhen Address": "Indirizzo Shenzhen", "On-Time Delivery": "Consegna puntuale", "Export Countries": "Paesi di esportazione", "Years Experience": "Anni di esperienza", "PCB Models": "Modelli PCB", "Light": "Chiaro", "Dark": "Scuro", "System": "Sistema", "Active": "Attivo", "Pending": "In attesa", "Approved": "Approvato", "Rejected": "Rifiutato", "Reviewing": "In revisione", "Completed": "Completato", "Status": "Stato", "Action": "Azione", "Actions": "Azioni", "Price": "Prezzo", "Total": "Totale", "Subtotal": "Subtotale", "Description": "Descrizione", "Category": "Categoria", "Upload": "Carica", "Download": "Scarica", "Preview": "Anteprima", "Close": "Chiudi", "Open": "Apri", "Next": "Avanti", "Previous": "Indietro", "Continue": "Continua", "Back": "Indietro", "Submit Request": "Invia richiesta", "Message": "Messaggio", "Subject": "Oggetto", "Send Message": "Invia messaggio", "Featured": "In evidenza", "Starting at": "A partire da", "In Stock": "Disponibile", "Out of Stock": "Non disponibile", "PCB FABRICATION": "FABBRICAZIONE PCB", "ADVANCED PCB": "PCB AVANZATO", "Rigid PCB Prototype": "Prototipo PCB rigido", "SMT Assembly Service": "Servizio di assemblaggio SMT", "HDI Multilayer PCB": "PCB HDI multistrato", "High-quality FR-4 prototype boards for validation, testing, and short-run manufacturing.": "Schede prototipo FR-4 di alta qualità per validazione, test e produzione a breve tiratura.", "Surface mount assembly for production-ready electronics with AOI inspection support.": "Assemblaggio a montaggio superficiale per elettronica pronta alla produzione con supporto di ispezione AOI.", "High-density interconnect boards for compact, high-performance electronic products.": "Schede di interconnessione ad alta densità per prodotti elettronici compatti e ad alte prestazioni.", "High-quality precision PCB engineered for maximum performance and durability in critical applications.": "PCB di precisione di alta qualità progettato per massime prestazioni e durata in applicazioni critiche.", "Please enter a valid contact email before uploading.": "Inserisci un'email di contatto valida prima del caricamento.", "Upload failed. Please try again.": "Caricamento non riuscito. Riprova.", "Upload complete.": "Caricamento completato.", "All rights reserved.": "Tutti i diritti riservati."
  },  es: { "Home": "Inicio", "Products": "Productos", "Contact": "Contacto", "Login": "Iniciar sesión", "Register": "Registrarse", "Dashboard": "Panel", "Instant Quote": "Cotización instantánea", "Quote Now": "Cotizar ahora", "Engineer Review": "Revisión de ingeniero", "Upload Gerber / BOM File": "Subir archivo Gerber / BOM", "Search": "Buscar", "Cart": "Carrito", "Add to Cart": "Añadir al carrito", "Buy Now": "Comprar ahora", "Email Address": "Correo electrónico", "Password": "Contraseña", "Create Account": "Crear cuenta", "Save": "Guardar", "Submit": "Enviar", "Cancel": "Cancelar", "Delete": "Eliminar", "Edit": "Editar", "Update": "Actualizar", "Loading...": "Cargando...", "Select Country": "Seleccionar país" },
  ru: { "Home": "Главная", "Products": "Продукты", "Contact": "Контакты", "Login": "Войти", "Register": "Регистрация", "Dashboard": "Панель", "Instant Quote": "Мгновенный расчет", "Quote Now": "Получить расчет", "Engineer Review": "Проверка инженером", "Upload Gerber / BOM File": "Загрузить Gerber / BOM", "Search": "Поиск", "Cart": "Корзина", "Add to Cart": "В корзину", "Buy Now": "Купить сейчас", "Email Address": "Электронная почта", "Password": "Пароль", "Create Account": "Создать аккаунт", "Save": "Сохранить", "Submit": "Отправить", "Cancel": "Отмена", "Delete": "Удалить", "Edit": "Редактировать", "Update": "Обновить", "Loading...": "Загрузка...", "Select Country": "Выберите страну" },
  pt: { "Home": "Início", "Products": "Produtos", "Contact": "Contato", "Login": "Entrar", "Register": "Registrar", "Dashboard": "Painel", "Instant Quote": "Cotação instantânea", "Quote Now": "Solicitar cotação", "Engineer Review": "Revisão do engenheiro", "Upload Gerber / BOM File": "Enviar arquivo Gerber / BOM", "Search": "Pesquisar", "Cart": "Carrinho", "Add to Cart": "Adicionar ao carrinho", "Buy Now": "Comprar agora", "Email Address": "E-mail", "Password": "Senha", "Create Account": "Criar conta", "Save": "Salvar", "Submit": "Enviar", "Cancel": "Cancelar", "Delete": "Excluir", "Edit": "Editar", "Update": "Atualizar", "Loading...": "Carregando...", "Select Country": "Selecionar país" },
  ar: { "Home": "الرئيسية", "Products": "المنتجات", "Contact": "اتصل بنا", "Login": "تسجيل الدخول", "Register": "إنشاء حساب", "Dashboard": "لوحة التحكم", "Instant Quote": "عرض سعر فوري", "Quote Now": "اطلب عرض سعر", "Engineer Review": "مراجعة مهندس", "Upload Gerber / BOM File": "رفع ملف Gerber / BOM", "Search": "بحث", "Cart": "السلة", "Add to Cart": "أضف إلى السلة", "Buy Now": "اشتر الآن", "Email Address": "البريد الإلكتروني", "Password": "كلمة المرور", "Create Account": "إنشاء حساب", "Save": "حفظ", "Submit": "إرسال", "Cancel": "إلغاء", "Delete": "حذف", "Edit": "تعديل", "Update": "تحديث", "Loading...": "جار التحميل...", "Select Country": "اختر الدولة" },
  tr: { "Home": "Ana Sayfa", "Products": "Ürünler", "Contact": "İletişim", "Login": "Giriş", "Register": "Kayıt ol", "Dashboard": "Panel", "Instant Quote": "Anında teklif", "Quote Now": "Teklif al", "Engineer Review": "Mühendis incelemesi", "Upload Gerber / BOM File": "Gerber / BOM dosyası yükle", "Search": "Ara", "Cart": "Sepet", "Add to Cart": "Sepete ekle", "Buy Now": "Hemen al", "Email Address": "E-posta adresi", "Password": "Şifre", "Create Account": "Hesap oluştur", "Save": "Kaydet", "Submit": "Gönder", "Cancel": "İptal", "Delete": "Sil", "Edit": "Düzenle", "Update": "Güncelle", "Loading...": "Yükleniyor...", "Select Country": "Ülke seç" },
  af: { "Home": "Tuis", "Products": "Produkte", "Contact": "Kontak", "Login": "Teken in", "Register": "Registreer", "Dashboard": "Paneel", "Instant Quote": "Onmiddellike kwotasie", "Quote Now": "Kry kwotasie", "Engineer Review": "Ingenieur-oorsig", "Upload Gerber / BOM File": "Laai Gerber / BOM-lêer op", "Search": "Soek", "Cart": "Mandjie", "Add to Cart": "Voeg by mandjie", "Buy Now": "Koop nou", "Email Address": "E-posadres", "Password": "Wagwoord", "Create Account": "Skep rekening", "Save": "Stoor", "Submit": "Dien in", "Cancel": "Kanselleer", "Delete": "Verwyder", "Edit": "Wysig", "Update": "Dateer op", "Loading...": "Laai...", "Select Country": "Kies land" },
};


Object.assign(maps.zh ?? {}, {
  "Featured": "精选", "Starting at": "起价", "In Stock": "有库存", "Out of Stock": "缺货", "Add": "添加", "PCB FABRICATION": "PCB制造", "ADVANCED PCB": "高级PCB", "Rigid PCB Prototype": "刚性PCB样板", "SMT Assembly Service": "SMT贴片服务", "HDI Multilayer PCB": "HDI多层PCB", "High-quality FR-4 prototype boards for validation, testing, and short-run manufacturing.": "用于验证、测试和小批量制造的高质量FR-4样板。", "Surface mount assembly for production-ready electronics with AOI inspection support.": "面向量产电子产品的表面贴装服务，支持AOI检测。", "High-density interconnect boards for compact, high-performance electronic products.": "用于紧凑型高性能电子产品的高密度互连板。", "Wuping Feitian Electronic Technology Company Limited": "武平飞天电子科技有限公司", "All rights reserved.": "保留所有权利。"
});

Object.assign(maps.ja ?? {}, {
  "Featured": "注目", "Starting at": "開始価格", "In Stock": "在庫あり", "Out of Stock": "在庫なし", "Add": "追加", "PCB FABRICATION": "PCB製造", "ADVANCED PCB": "先進PCB", "Rigid PCB Prototype": "リジッドPCB試作", "SMT Assembly Service": "SMT実装サービス", "HDI Multilayer PCB": "HDI多層PCB", "High-quality FR-4 prototype boards for validation, testing, and short-run manufacturing.": "検証、テスト、小ロット製造向けの高品質FR-4試作基板。", "Surface mount assembly for production-ready electronics with AOI inspection support.": "AOI検査に対応した量産向け電子機器の表面実装サービス。", "High-density interconnect boards for compact, high-performance electronic products.": "小型で高性能な電子製品向けの高密度インターコネクト基板。", "Wuping Feitian Electronic Technology Company Limited": "武平飛天電子科技有限公司", "All rights reserved.": "全著作権所有。"
});
const aliasLocales: Partial<Record<Locale, Locale>> = {};

function normalizeText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function makePhraseMap(locale: Locale): PhraseMap {
  if (locale === "en") return {};

  const alias = aliasLocales[locale];
  const direct = maps[locale] ?? (alias ? maps[alias] : undefined) ?? maps.en ?? {};
  const fallback = maps.ja ?? {};
  const map: PhraseMap = {};

  englishPhrases.forEach((phrase) => {
    map[phrase] = direct[phrase] ?? fallback[phrase] ?? phrase;
  });

  Object.assign(map, direct);
  return map;
}

function translateText(text: string, map: PhraseMap) {
  const normalized = normalizeText(text);
  if (!normalized) return text;

  const exact = map[normalized];
  if (exact) return text.replace(normalized, exact);

  let translated = text;
  Object.keys(map)
    .filter((phrase) => phrase.length > 2)
    .sort((a, b) => b.length - a.length)
    .forEach((phrase) => {
      if (!translated.includes(phrase)) return;
      translated = translated.replace(new RegExp(escapeRegExp(phrase), "g"), map[phrase]);
    });

  return translated;
}

function restoreOriginals(root: ParentNode) {
  root.querySelectorAll?.(`[${TRANSLATED_TEXT}]`).forEach((element) => {
    const original = element.getAttribute(TRANSLATED_TEXT);
    if (original !== null) {
      element.textContent = original;
      element.removeAttribute(TRANSLATED_TEXT);
    }
  });

  root.querySelectorAll?.("input, button, a, img, select, textarea, [aria-label], [title]").forEach((element) => {
    ATTRIBUTES.forEach((attr) => {
      const original = element.getAttribute(`${TRANSLATED_ATTR_PREFIX}${attr}`);
      if (original !== null) {
        element.setAttribute(attr, original);
        element.removeAttribute(`${TRANSLATED_ATTR_PREFIX}${attr}`);
      }
    });

    if (element instanceof HTMLInputElement && ["button", "submit", "reset"].includes(element.type)) {
      const original = element.getAttribute(TRANSLATED_VALUE);
      if (original !== null) {
        element.value = original;
        element.removeAttribute(TRANSLATED_VALUE);
      }
    }
  });
}

function translateAttributes(element: Element, map: PhraseMap) {
  ATTRIBUTES.forEach((attr) => {
    const current = element.getAttribute(attr);
    if (!current || element.closest("[data-no-translate]")) return;

    const originalKey = `${TRANSLATED_ATTR_PREFIX}${attr}`;
    const original = element.getAttribute(originalKey) ?? current;
    element.setAttribute(originalKey, original);
    element.setAttribute(attr, translateText(original, map));
  });

  if (element instanceof HTMLInputElement && ["button", "submit", "reset"].includes(element.type) && element.value) {
    const original = element.getAttribute(TRANSLATED_VALUE) ?? element.value;
    element.setAttribute(TRANSLATED_VALUE, original);
    element.value = translateText(original, map);
  }
}

function translateNode(root: ParentNode, map: PhraseMap) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || SKIP_TAGS.has(parent.tagName) || parent.closest("[data-no-translate]")) {
        return NodeFilter.FILTER_REJECT;
      }

      return normalizeText(node.textContent ?? "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  textNodes.forEach((node) => {
    const parent = node.parentElement;
    if (!parent) return;

    const original = parent.getAttribute(TRANSLATED_TEXT) ?? node.textContent ?? "";
    parent.setAttribute(TRANSLATED_TEXT, original);
    node.textContent = translateText(original, map);
  });

  root.querySelectorAll?.("input, button, a, img, select, textarea, [aria-label], [title]").forEach((element) => translateAttributes(element, map));
}

export default function GlobalUiTranslator() {
  const { locale } = useLanguage();
  const phraseMap = useMemo(() => makePhraseMap(locale), [locale]);

  useEffect(() => {
    const body = document.body;
    let raf = 0;

    const observer = new MutationObserver(() => {
      applyTranslation();
    });

    const observe = () => observer.observe(body, { childList: true, subtree: true, characterData: true, attributes: true });

    const applyTranslation = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        observer.disconnect();
        restoreOriginals(body);
        if (locale !== "en") translateNode(body, phraseMap);
        observe();
      });
    };

    applyTranslation();

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      restoreOriginals(body);
    };
  }, [locale, phraseMap]);

  return null;
}