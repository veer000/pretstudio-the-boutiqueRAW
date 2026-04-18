import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import { CartProvider } from "./context/CartContext";
import AboutPage from "./pages/AboutPage";
import AccountPage from "./pages/AccountPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import BrandsPage from "./pages/BrandsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CollectionDetailPage from "./pages/CollectionDetailPage";
import CollectionsPage from "./pages/CollectionsPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShopPage from "./pages/ShopPage";
import SizeGuidePage from "./pages/SizeGuidePage";

const rootRoute = createRootRoute({
  component: () => (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
      <Toaster richColors position="top-right" />
    </CartProvider>
  ),
  notFoundComponent: () => <NotFoundPage />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: ShopPage,
});
const brandsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/brands",
  component: BrandsPage,
});
const collectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections",
  component: CollectionsPage,
});
const collectionDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections/$id",
  component: CollectionDetailPage,
});
const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetailPage,
});
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});
const checkoutSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout/success",
  component: OrderSuccessPage,
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});
const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: BlogPostPage,
});
const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});
const sizeGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/size-guide",
  component: SizeGuidePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  brandsRoute,
  collectionsRoute,
  collectionDetailRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  checkoutSuccessRoute,
  blogRoute,
  blogPostRoute,
  accountRoute,
  aboutRoute,
  contactRoute,
  sizeGuideRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
