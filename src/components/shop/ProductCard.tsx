import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Star } from 'lucide-react';

const badgeStyles = {
  new: 'bg-success text-primary-foreground',
  sale: 'bg-sale text-primary-foreground',
  bestseller: 'bg-accent text-accent-foreground',
};

const ProductCard = ({ product }: { product: Product }) => (
  <Link
    to={`/product/${product.id}`}
    className="group block overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
  >
    <div className="relative aspect-square overflow-hidden bg-muted">
      <img
        src={product.images[0]}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {product.badge && (
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeStyles[product.badge]}`}
        >
          {product.badge}
        </span>
      )}
    </div>
    <div className="p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {product.category}
      </p>
      <h3 className="mt-1 font-display text-base font-semibold text-foreground">
        {product.name}
      </h3>
      <div className="mt-2 flex items-center gap-1">
        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
        <span className="text-xs text-muted-foreground">
          {product.rating} ({product.reviews})
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-bold text-primary">
          NPR {product.price.toLocaleString()}
        </span>
        {product.originalPrice && (
          <span className="text-sm text-muted-foreground line-through">
            NPR {product.originalPrice.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  </Link>
);

export default ProductCard;
