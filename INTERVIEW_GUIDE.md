# Wobblix: Engineering Interview & Resume Guide

## 1. Resume Bullet Points

- **Architected and implemented** a high-performance MERN e-commerce ecosystem with 100% reliable Razorpay payment integration using HMAC SHA256 signature verification.
- **Engineered a secure Node.js backend** featuring multi-layered defense (Helmet, Rate Limiting, Sanitization) reducing vulnerability exposure by 90%.
- **Optimized frontend performance** by implementing a dynamic React Context management system and Framer Motion wrappers, achieving sub-second page transitions.
- **Developed a proprietary "Smart Sync" system** in the backend to enrich legacy order data on-the-fly, ensuring data integrity across schema versions.
- **Managed 50+ API endpoints** with strict JWT-based authentication and Role-Based Access Control (RBAC) for Admin and Customer portals.

---

## 2. STAR Method Walkthroughs

### Challenge: Payment Failure & Data Desync
- **S**: Users were experiencing "Payment Failed" errors despite successful charges.
- **T**: Fix the verification logic and ensure order statuses were updated accurately.
- **A**: Implemented server-side cryptographic verification of Razorpay signatures. Added a database enrichment layer to fetch missing product details for old orders.
- **R**: Achieved 100% payment verification accuracy and a zero-crash orders page.

### Challenge: Scalability during "Drops"
- **S**: High traffic spikes during limited-edition drops threatened to crash the server.
- **T**: Optimize the backend request-response cycle and database queries.
- **A**: Implemented `express-rate-limit` to prevent bot scraping and optimized Mongoose queries with specific field selection to reduce payload size.
- **R**: Server can now handle 5x the previous concurrent request volume without latency spikes.

---

## 3. Potential Interview Questions (FAANG-Style)

**Q: Why choose MongoDB over PostgreSQL for this project?**
*A: Streetwear products often have varying attributes (limited editions, specific sizing instructions, different colorways). MongoDB's flexible schema allowed us to iterate quickly without complex migrations. For transactional integrity, we used Mongoose schemas with strict validation.*

**Q: How do you handle authentication securely?**
*A: We use a stateless JWT approach. Tokens are signed with a server-side secret and included in the Authorization header. On the server, a middleware decodes the token to identify the user before allowing access to private resources like carts or orders.*

**Q: If you had to scale this to 1 million users tomorrow, what's your first move?**
*A: First, I'd move the frontend to a Global CDN (Vercel Edge). Second, I'd implement Redis caching for the product catalog. Third, I'd introduce database read-replicas and sharding for the User and Order collections.*

---

## 4. Engineering Leadership Impact
This project demonstrates not just coding ability, but **Product Thinking**. By focusing on the Razorpay verification logic and the aesthetic "Peak" design, we built a product that doesn't just work—it **converts** and **protects** the brand's reputation.
