# ⚡ WOBBLIX | The Future of Gen-Z Streetwear E-Commerce
### *A Production-Grade MERN Ecosystem Built for Scale and High-Impact Brand Identity*

---

## 💎 Business Model & Vision
**Wobblix** is not just a storefront; it’s a vertically integrated streetwear engine. Our business model focuses on **High-Margin, Limited-Drop Apparel** targeting the Gen-Z demographic in India. 

### **The Strategy:**
- **The "Drop" Model**: Utilizing artificial scarcity through limited-time collection launches to drive immediate conversion.
- **Direct-to-Consumer (D2C)**: Eliminating middlemen to maintain 60-70% gross margins on premium oversized apparel.
- **Minimalist Luxury Branding**: A "Bone & Red" aesthetic that positions Wobblix as an elite streetwear house rather than a generic clothing brand.

---

## 🏗️ System Design: High-Level Architecture (HLD)

Wobblix is built on a decoupled, micro-service oriented architecture using the **MERN Stack** (MongoDB, Express, React, Node.js).

### **Data Flow:**
1.  **Storefront (React)**: High-performance SPA with fluid animations and SEO-optimized SSR/SSG-ready components.
2.  **API Gateway (Express)**: Centralized routing engine handling requests from both the storefront and the administrative console.
3.  **Database Layer (MongoDB Atlas)**: Distributed NoSQL database optimized for high-read product catalogs and ACID-compliant transaction records.
4.  **Media Engine (Cloudinary)**: Offloads heavy asset processing from the main server, serving compressed, optimized WebP images via global CDN.

---

## ⚙️ Low-Level Design (LLD) & Technical Core

### **1. Authentication (JWT Security)**
We implement a **Stateless JWT (JSON Web Token)** authentication flow.
- **Login**: Backend validates credentials -> signs a payload `{ userId, role }` -> returns a token.
- **Middleware**: The `authUser` middleware intercepts every request, decodes the token, and verifies authenticity before allowing sensitive DB operations (Cart, Orders).
- **Security**: All passwords are salted and hashed using **Bcrypt** with 10 rounds of computational complexity.

### **2. Payment Logic (Razorpay Integration)**
The system is built for **99.9% Payment Reliability**.
- **The Loop**: Cart Amount Calculation -> Order Creation on Server -> Razorpay Payment UI -> Success Webhook -> Database Order Confirmation.
- **Security**: No sensitive card data touches our servers. We use **Razorpay Webhooks** to verify payment signatures on the backend, preventing "Man-in-the-Middle" order spoofing.

---

## 🚀 Scaling to 10,000+ Concurrent Users

To handle a massive "Drop" event (e.g., 10k users hitting the site at 12:00 PM), Wobblix is designed for horizontal scalability:

### **1. Caching Strategy (Redis Ready)**
- Product lists are served via optimized queries. In a high-traffic scenario, we implement a **Redis Cache Layer** to serve 95% of read requests without hitting the primary database.

### **2. Database Optimization**
- **Indexing**: MongoDB indexes on `category`, `subCategory`, and `price` ensure that filtering through thousands of products takes less than 10ms.
- **Read-Replicas**: Distributing traffic across multiple MongoDB clusters to handle concurrent heavy reads during sales.

### **3. Load Balancing & Clustering**
- The backend is ready for **PM2 Clustering** or **Kubernetes Pod Scaling**. Each CPU core can handle a dedicated process, effectively multiplying the request-per-second capacity by the number of available cores.

### **4. Frontend Performance**
- **Code Splitting**: Routes are lazy-loaded, ensuring the initial bundle size is minimal.
- **Asset Optimization**: Using `browser-image-compression` on the admin side so that the store never serves an image larger than 200KB.

---

## 📅 Roadmap: From Scratch to Global
1.  **Phase 1 (MVP)**: Core E-commerce logic with Razorpay and MERN. *(COMPLETED)*
2.  **Phase 2 (UX/Brand)**: Implementation of the Brutalist design and premium animations. *(COMPLETED)*
3.  **Phase 3 (Logistics)**: Deep integration with Indian courier partners (Delhivery/Shiprocket) for real-time tracking. *(IN PROGRESS)*
4.  **Phase 4 (Expansion)**: AI-driven personalized "Drop" recommendations and AR virtual try-on.

---

**PROUDLY BUILT FROM SCRATCH BY THE WOBBLIX TEAM.**
*Engineer: Mohit Mudgil*
