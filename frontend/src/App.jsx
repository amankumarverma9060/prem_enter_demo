
import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Plus,
  Minus,
  ArrowRight,
  Phone,
  ShieldCheck,
  Truck,
  Leaf,
  Award,
  ChevronRight,
  Package,
  MessageCircle,
  Trash2,
} from "lucide-react";

// Apna official WhatsApp number yahan add karna hai.
// Example: 919876543210 (country code ke saath, + sign nahi)
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

const categories = [
  "All Products",
  "Incense & Dhoop",
  "Pooja Items",
  "Food Products",
  "Freshness & Sprays",
];

const products = [
  {
    id: 1,
    name: "Guggle Herbal Incense Cones",
    category: "Incense & Dhoop",
    price: 60,
    image: "/images/products/guggle-cones.jpg",
    description: "Herbal incense cones",
  },
  {
    id: 2,
    name: "Chandan Herbal Incense Cones",
    category: "Incense & Dhoop",
    price: 70,
    image: "/images/products/chandan-cones.jpg",
    description: "Chandan fragrance",
  },
  {
    id: 3,
    name: "Gulab Herbal Incense Cones",
    category: "Incense & Dhoop",
    price: 65,
    image: "/images/products/gulab-cones.jpg",
    description: "Rose fragrance",
  },
  {
    id: 4,
    name: "Phool Loban",
    category: "Pooja Items",
    price: 125,
    image: "/images/products/phool-loban.jpg",
    description: "Pack of 50g",
  },
  {
    id: 5,
    name: "Guggal",
    category: "Pooja Items",
    price: 125,
    image: "/images/products/guggal.jpg",
    description: "Pack of 50g",
  },
  {
    id: 6,
    name: "Bhimseni Camphor",
    category: "Pooja Items",
    price: 180,
    image: "/images/products/camphor.jpg",
    description: "Pack of 50g",
  },
  {
    id: 7,
    name: "Rose Water",
    category: "Freshness & Sprays",
    price: 100,
    image: "/images/products/rose-water.jpg",
    description: "100 ml",
  },
  {
    id: 8,
    name: "Cooler Freshness Rose",
    category: "Freshness & Sprays",
    price: 100,
    image: "/images/products/cooler-freshness.jpg",
    description: "Rose fragrance · 100 ml",
  },
  {
    id: 9,
    name: "Mango Pickle",
    category: "Food Products",
    price: 150,
    image: "/images/products/mango-pickle.jpg",
    description: "Pack of 250g",
  },
  {
    id: 10,
    name: "Turmeric Powder",
    category: "Food Products",
    price: 100,
    image: "/images/products/turmeric.jpg",
    description: "Pack of 250g",
  },
  {
    id: 11,
    name: "Macaroni",
    category: "Food Products",
    price: 164,
    image: "/images/products/macaroni.jpg",
    description: "Pack of 500g",
  },
  {
    id: 12,
    name: "Sattu",
    category: "Food Products",
    price: 44,
    image: "/images/products/sattu.jpg",
    description: "Pack of 250g",
  },
];

function App() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Products" ||
        product.category === activeCategory;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Please add products to your cart.");
      return;
    }

    if (WHATSAPP_NUMBER.includes("X")) {
      alert("Bhai, pehle App.jsx mein apna WhatsApp number add karo.");
      return;
    }

    const orderItems = cart
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
      )
      .join("\n");

    const message = `Hello Prem Enterprises,

I want to place an order.

Customer Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}

Order Details:
${orderItems}

Total Amount: ₹${cartTotal}

Please confirm my order.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="website">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, sans-serif; color: #252525; }
        button, input, textarea { font: inherit; }
        button { cursor: pointer; }
        .website { min-height: 100vh; background: #fff; }
        .topbar { background: #173f2a; color: white; text-align: center; padding: 9px 12px; font-size: 12px; letter-spacing: .3px; }
        .header { position: sticky; top: 0; z-index: 20; background: white; border-bottom: 1px solid #eee; }
        .headerInner { max-width: 1200px; margin: auto; padding: 14px 22px; display: flex; align-items: center; gap: 25px; }
        .brand { display: flex; align-items: center; gap: 10px; min-width: 205px; text-decoration: none; color: #173f2a; }
        .brandLogo { width: 54px; height: 54px; object-fit: contain; }
        .logoFallback { width: 54px; height: 54px; border-radius: 50%; background: #173f2a; color: white; display: grid; place-items: center; font-weight: 800; font-size: 20px; }
        .brandName { font-size: 20px; font-weight: 800; line-height: 1.1; }
        .brandSub { font-size: 11px; color: #a17425; letter-spacing: 2px; margin-top: 4px; }
        .nav { display: flex; align-items: center; gap: 24px; flex: 1; }
        .nav a { color: #333; text-decoration: none; font-size: 14px; font-weight: 600; }
        .nav a:hover { color: #a17425; }
        .headerActions { display: flex; align-items: center; gap: 12px; }
        .searchBox { display: flex; align-items: center; gap: 7px; border: 1px solid #e6e6e6; border-radius: 30px; padding: 9px 12px; width: 180px; }
        .searchBox input { border: 0; outline: 0; width: 100%; min-width: 0; font-size: 13px; }
        .cartButton { border: 0; border-radius: 30px; padding: 11px 15px; background: #173f2a; color: white; display: flex; gap: 8px; align-items: center; position: relative; }
        .cartNumber { background: #d6a64d; color: #172d20; border-radius: 20px; padding: 2px 6px; font-size: 11px; font-weight: 800; }
        .mobileMenuButton { display: none; border: 0; background: transparent; }
        .hero { background: linear-gradient(110deg, #173f2a 0%, #28583b 60%, #9b793d 100%); color: white; overflow: hidden; }
        .heroInner { max-width: 1200px; min-height: 420px; margin: auto; padding: 65px 25px; display: flex; align-items: center; justify-content: space-between; gap: 35px; }
        .heroContent { max-width: 600px; }
        .eyebrow { color: #f2d49a; font-size: 12px; letter-spacing: 3px; font-weight: 700; text-transform: uppercase; }
        .hero h1 { font-size: clamp(36px, 5vw, 60px); line-height: 1.08; margin: 18px 0; }
        .hero p { color: #e5eee7; font-size: 16px; line-height: 1.8; max-width: 510px; }
        .heroButtons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
        .primaryButton, .secondaryButton { display: inline-flex; align-items: center; gap: 9px; padding: 14px 21px; border-radius: 5px; text-decoration: none; font-weight: 700; font-size: 14px; }
        .primaryButton { background: #d5a64f; color: #1c2c20; border: 1px solid #d5a64f; }
        .secondaryButton { color: white; border: 1px solid #ffffff80; }
        .heroVisual { width: 310px; height: 310px; border: 1px solid #ffffff45; border-radius: 50%; display: grid; place-items: center; flex-shrink: 0; background: #ffffff12; }
        .heroVisualInner { width: 245px; height: 245px; border: 1px solid #ffffff60; border-radius: 50%; display: grid; place-items: center; text-align: center; padding: 25px; }
        .heroVisual strong { display: block; font-size: 46px; color: #f1d29a; }
        .heroVisual span { font-size: 13px; letter-spacing: 2px; }
        .trustStrip { max-width: 1150px; margin: 25px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .trustItem { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 17px 10px; background: #f8f8f4; border-radius: 7px; color: #173f2a; }
        .trustItem strong { display: block; font-size: 13px; }
        .trustItem span { display: block; font-size: 11px; color: #777; margin-top: 4px; }
        .section { max-width: 1200px; margin: 65px auto; padding: 0 22px; }
        .sectionHeading { text-align: center; margin-bottom: 30px; }
        .sectionHeading span { color: #a17425; font-size: 11px; letter-spacing: 3px; font-weight: 800; text-transform: uppercase; }
        .sectionHeading h2 { font-size: 32px; color: #173f2a; margin: 10px 0; }
        .sectionHeading p { color: #777; font-size: 14px; }
        .categoryGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .categoryCard { min-height: 125px; background: #f5f5ef; border: 1px solid #ecece3; border-radius: 8px; padding: 22px; text-align: left; color: #173f2a; transition: .2s; }
        .categoryCard:hover { background: #173f2a; color: white; transform: translateY(-3px); }
        .categoryCard h3 { font-size: 16px; margin: 12px 0 5px; }
        .categoryCard span { font-size: 12px; opacity: .7; }
        .filterBar { display: flex; justify-content: center; flex-wrap: wrap; gap: 9px; margin-bottom: 25px; }
        .filterButton { border: 1px solid #ddd; background: white; color: #555; padding: 10px 16px; border-radius: 25px; font-size: 12px; }
        .filterButton.active, .filterButton:hover { background: #173f2a; border-color: #173f2a; color: white; }
        .productGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .productCard { border: 1px solid #eee; border-radius: 8px; overflow: hidden; background: white; transition: .2s; }
        .productCard:hover { box-shadow: 0 9px 25px #0000000d; transform: translateY(-3px); }
        .productImage { height: 205px; background: #f7f7f3; position: relative; display: grid; place-items: center; overflow: hidden; }
        .productImage img { width: 100%; height: 100%; object-fit: contain; padding: 12px; position: absolute; inset: 0; }
        .imageFallback { color: #9b9b8c; text-align: center; font-size: 12px; padding: 15px; }
        .productInfo { padding: 15px; }
        .productCategory { color: #a17425; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800; }
        .productInfo h3 { font-size: 15px; margin: 8px 0; min-height: 36px; color: #26382b; }
        .productDescription { color: #888; font-size: 12px; margin-bottom: 12px; }
        .productBottom { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .productPrice { font-size: 17px; font-weight: 800; color: #173f2a; }
        .productPrice small { display: block; color: #999; font-size: 10px; font-weight: 400; }
        .addButton { border: 0; border-radius: 5px; background: #173f2a; color: white; padding: 10px 12px; display: flex; align-items: center; gap: 5px; font-size: 12px; }
        .addButton:hover { background: #a17425; }
        .aboutSection { background: #f5f5ef; padding: 55px 22px; }
        .aboutInner { max-width: 1100px; margin: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 45px; align-items: center; }
        .aboutLabel { color: #a17425; letter-spacing: 2px; font-size: 11px; font-weight: 800; }
        .aboutInner h2 { color: #173f2a; font-size: 32px; margin: 12px 0; }
        .aboutInner p { color: #666; line-height: 1.8; font-size: 14px; }
        .aboutHighlight { border-left: 3px solid #d5a64f; padding: 15px 20px; background: white; color: #173f2a; line-height: 1.7; font-weight: 600; }
        .aboutBadge { min-height: 240px; background: #173f2a; color: white; border-radius: 10px; display: grid; place-items: center; text-align: center; padding: 30px; }
        .aboutBadge strong { display: block; font-size: 28px; color: #f1d29a; margin: 12px 0; }
        .aboutBadge span { color: #d9e4dc; font-size: 13px; }
        .footer { background: #122f20; color: white; padding: 45px 22px 20px; }
        .footerInner { max-width: 1150px; margin: auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 35px; }
        .footer h3 { color: #f1d29a; font-size: 16px; }
        .footer p, .footer a { color: #c8d3cb; font-size: 13px; line-height: 1.8; text-decoration: none; }
        .footerLinks { display: flex; flex-direction: column; gap: 7px; }
        .copyright { max-width: 1150px; margin: 30px auto 0; padding-top: 18px; border-top: 1px solid #ffffff25; text-align: center; color: #aab9af; font-size: 11px; }
        .overlay { position: fixed; inset: 0; z-index: 50; background: #0008; display: flex; justify-content: flex-end; }
        .cartPanel { background: white; width: min(440px, 100%); height: 100%; overflow-y: auto; padding: 22px; }
        .cartHeader { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 15px; }
        .cartHeader h2 { color: #173f2a; margin: 0; }
        .closeButton { border: 0; background: #f2f2f2; border-radius: 50%; width: 35px; height: 35px; display: grid; place-items: center; }
        .cartItem { display: flex; justify-content: space-between; gap: 10px; padding: 16px 0; border-bottom: 1px solid #eee; }
        .cartItem h4 { margin: 0 0 7px; font-size: 14px; }
        .cartItem p { margin: 0; color: #777; font-size: 12px; }
        .quantityControls { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
        .quantityControls button { border: 1px solid #ddd; background: white; border-radius: 4px; width: 25px; height: 25px; display: grid; place-items: center; }
        .cartTotal { display: flex; justify-content: space-between; font-weight: 800; font-size: 18px; padding: 20px 0; color: #173f2a; }
        .checkoutForm { display: grid; gap: 10px; }
        .checkoutForm input, .checkoutForm textarea { width: 100%; border: 1px solid #ddd; border-radius: 5px; padding: 12px; outline-color: #173f2a; }
        .checkoutForm textarea { min-height: 75px; resize: vertical; }
        .checkoutButton { width: 100%; border: 0; border-radius: 5px; padding: 14px; background: #173f2a; color: white; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .emptyCart { text-align: center; color: #777; padding: 50px 10px; }
        .emptyCart svg { color: #a17425; }
        @media(max-width: 900px) {
          .nav { gap: 13px; }
          .brand { min-width: auto; }
          .searchBox { width: 145px; }
          .productGrid { grid-template-columns: repeat(3, 1fr); }
          .heroVisual { width: 250px; height: 250px; }
          .heroVisualInner { width: 200px; height: 200px; }
        }
        @media(max-width: 650px) {
          .topbar { font-size: 10px; }
          .headerInner { padding: 10px 14px; gap: 10px; flex-wrap: wrap; }
          .brandLogo, .logoFallback { width: 43px; height: 43px; }
          .brandName { font-size: 16px; }
          .brandSub { font-size: 9px; }
          .mobileMenuButton { display: block; margin-left: auto; }
          .nav { display: none; width: 100%; flex-basis: 100%; flex-direction: column; align-items: flex-start; padding: 12px 5px; border-top: 1px solid #eee; }
          .nav.open { display: flex; }
          .headerActions { width: 100%; order: 3; }
          .searchBox { flex: 1; width: auto; }
          .cartButton { padding: 10px 13px; }
          .heroInner { min-height: auto; padding: 48px 22px; }
          .heroVisual { display: none; }
          .hero h1 { font-size: 39px; }
          .hero p { font-size: 14px; }
          .trustStrip { grid-template-columns: 1fr; margin: 15px auto; gap: 8px; }
          .trustItem { justify-content: flex-start; padding: 13px 18px; }
          .section { margin: 45px auto; padding: 0 14px; }
          .sectionHeading h2 { font-size: 26px; }
          .categoryGrid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .categoryCard { padding: 15px; min-height: 115px; }
          .productGrid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .productImage { height: 155px; }
          .productInfo { padding: 11px; }
          .productInfo h3 { font-size: 13px; }
          .productPrice { font-size: 15px; }
          .addButton { padding: 9px; font-size: 11px; }
          .aboutInner { grid-template-columns: 1fr; gap: 22px; }
          .aboutInner h2 { font-size: 26px; }
          .footerInner { grid-template-columns: 1fr 1fr; gap: 20px; }
          .footerInner > div:first-child { grid-column: 1 / -1; }
        }
      `}</style>

      <div className="topbar">
        PREM ENTERPRISES · PM BRAND · QUALITY PRODUCTS FOR EVERY HOME
      </div>

      <header className="header">
        <div className="headerInner">
          <a href="#home" className="brand">
            <img
              src="/images/pm-logo.png"
              alt="PM Brand Logo"
              className="brandLogo"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div>
              <div className="brandName">PREM ENTERPRISES</div>
              <div className="brandSub">PM BRAND</div>
            </div>
          </a>

          <button
            className="mobileMenuButton"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>

          <nav className={`nav ${mobileMenu ? "open" : ""}`}>
            <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
            <a href="#categories" onClick={() => setMobileMenu(false)}>Categories</a>
            <a href="#products" onClick={() => setMobileMenu(false)}>Products</a>
            <a href="#about" onClick={() => setMobileMenu(false)}>About Us</a>
            <a href="#contact" onClick={() => setMobileMenu(false)}>Contact</a>
          </nav>

          <div className="headerActions">
            <div className="searchBox">
              <Search size={17} color="#777" />
              <input
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveCategory("All Products");
                }}
              />
            </div>

            <button className="cartButton" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={17} />
              Cart <span className="cartNumber">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="heroInner">
            <div className="heroContent">
              <div className="eyebrow">Welcome to Prem Enterprises</div>
              <h1>Tradition, Quality & Trust.</h1>
              <p>
                Discover PM Brand products for your home, pooja and everyday
                needs. Explore our collection of incense, pooja essentials,
                food products and more.
              </p>
              <div className="heroButtons">
                <a href="#products" className="primaryButton">
                  Explore Products <ArrowRight size={17} />
                </a>
                <a href="#about" className="secondaryButton">
                  Know More
                </a>
              </div>
            </div>

            <div className="heroVisual">
              <div className="heroVisualInner">
                <div>
                  <strong>PM</strong>
                  <span>PREM ENTERPRISES</span>
                  <p style={{ color: "#f1d29a", fontSize: 11, letterSpacing: 2 }}>
                    PM BRAND
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="trustStrip">
          <div className="trustItem">
            <ShieldCheck size={27} />
            <div><strong>Quality Products</strong><span>Carefully selected collection</span></div>
          </div>
          <div className="trustItem">
            <Truck size={27} />
            <div><strong>Order with Ease</strong><span>Simple ordering process</span></div>
          </div>
          <div className="trustItem">
            <Leaf size={27} />
            <div><strong>Wide Collection</strong><span>Products for everyday needs</span></div>
          </div>
        </div>

        <section className="section" id="categories">
          <div className="sectionHeading">
            <span>Explore Our Collection</span>
            <h2>Shop By Category</h2>
            <p>Choose from our range of PM Brand products.</p>
          </div>

          <div className="categoryGrid">
            <button className="categoryCard" onClick={() => {
              setActiveCategory("Incense & Dhoop");
              document.getElementById("products").scrollIntoView({ behavior: "smooth" });
            }}>
              <Leaf size={25} />
              <h3>Incense & Dhoop</h3>
              <span>Explore collection <ChevronRight size={13} /></span>
            </button>

            <button className="categoryCard" onClick={() => {
              setActiveCategory("Pooja Items");
              document.getElementById("products").scrollIntoView({ behavior: "smooth" });
            }}>
              <Award size={25} />
              <h3>Pooja Items</h3>
              <span>Explore collection <ChevronRight size={13} /></span>
            </button>

            <button className="categoryCard" onClick={() => {
              setActiveCategory("Food Products");
              document.getElementById("products").scrollIntoView({ behavior: "smooth" });
            }}>
              <Package size={25} />
              <h3>Food Products</h3>
              <span>Explore collection <ChevronRight size={13} /></span>
            </button>

            <button className="categoryCard" onClick={() => {
              setActiveCategory("Freshness & Sprays");
              document.getElementById("products").scrollIntoView({ behavior: "smooth" });
            }}>
              <ShieldCheck size={25} />
              <h3>Freshness & Sprays</h3>
              <span>Explore collection <ChevronRight size={13} /></span>
            </button>
          </div>
        </section>

        <section className="section" id="products">
          <div className="sectionHeading">
            <span>PM Brand Products</span>
            <h2>Our Products</h2>
            <p>Browse our featured products and add your favourites to cart.</p>
          </div>

          <div className="filterBar">
            {categories.map((category) => (
              <button
                key={category}
                className={`filterButton ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="productGrid">
            {filteredProducts.map((product) => (
              <article className="productCard" key={product.id}>
                <div className="productImage">
                  <div className="imageFallback">
                    <Package size={28} />
                    <p>{product.name}</p>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <div className="productInfo">
                  <div className="productCategory">{product.category}</div>
                  <h3>{product.name}</h3>
                  <div className="productDescription">{product.description}</div>
                  <div className="productBottom">
                    <div className="productPrice">
                      ₹{product.price}
                      <small>Catalogue MRP</small>
                    </div>
                    <button className="addButton" onClick={() => addToCart(product)}>
                      <Plus size={15} /> Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p style={{ textAlign: "center", color: "#777", padding: 30 }}>
              No products found. Try another search.
            </p>
          )}
        </section>

        <section className="aboutSection" id="about">
          <div className="aboutInner">
            <div>
              <div className="aboutLabel">ABOUT PREM ENTERPRISES</div>
              <h2>Welcome to the World of PM Brand</h2>
              <p>
                Prem Enterprises brings together a diverse collection of
                products, including incense cones, pooja essentials, food
                products and freshness items.
              </p>
              <p>
                Our aim is to make our product range easy to explore and
                convenient to order for customers.
              </p>
              <div className="aboutHighlight">
                Explore our catalogue and connect with Prem Enterprises
                for product and order enquiries.
              </div>
            </div>
            <div className="aboutBadge">
              <Award size={42} color="#f1d29a" />
              <strong>PREM ENTERPRISES</strong>
              <span>PM BRAND · PRODUCT COLLECTION</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footerInner">
          <div>
            <h3>PREM ENTERPRISES</h3>
            <p>
              PM Brand product collection. Explore our products and contact
              us for orders and enquiries.
            </p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <div className="footerLinks">
              <a href="#home">Home</a>
              <a href="#categories">Categories</a>
              <a href="#products">Products</a>
              <a href="#about">About Us</a>
            </div>
          </div>
          <div>
            <h3>Contact</h3>
            <p>For product details and orders, connect with us.</p>
            <p><MessageCircle size={15} /> WhatsApp Ordering</p>
          </div>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} Prem Enterprises · PM Brand. All Rights Reserved.
        </div>
      </footer>

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <div className="cartPanel" onClick={(e) => e.stopPropagation()}>
            <div className="cartHeader">
              <h2>Your Cart ({cartCount})</h2>
              <button className="closeButton" onClick={() => setCartOpen(false)}>
                <X size={19} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="emptyCart">
                <ShoppingBag size={45} />
                <h3>Your cart is empty</h3>
                <p>Add some products to get started.</p>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div className="cartItem" key={item.id}>
                    <div>
                      <h4>{item.name}</h4>
                      <p>₹{item.price} × {item.quantity}</p>
                      <div className="quantityControls">
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          <Minus size={13} />
                        </button>
                        <strong>{item.quantity}</strong>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          <Plus size={13} />
                        </button>
                        <button onClick={() => updateQuantity(item.id, -item.quantity)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                ))}

                <div className="cartTotal">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>

                <form className="checkoutForm" onSubmit={placeOrder}>
                  <h3>Customer Details</h3>
                  <input
                    required
                    placeholder="Your full name"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  />
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  />
                  <textarea
                    required
                    placeholder="Delivery address"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  />
                  <button className="checkoutButton" type="submit">
                    <MessageCircle size={18} /> Continue Order on WhatsApp
                  </button>
                  <p style={{ color: "#888", fontSize: 11, lineHeight: 1.5 }}>
                    Your order details will be sent to Prem Enterprises on WhatsApp.
                    Final order confirmation will be provided by the business.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
