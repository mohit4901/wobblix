import React from 'react';
import { optimizeCloudinaryUrl } from '../utils/imageOptimizer';

const CartToast = ({ product, size, navigate }) => {
  const imageUrl = product?.image?.[0] ? optimizeCloudinaryUrl(product.image[0], 200) : '';

  return (
    <div className="flex items-center gap-4 py-1.5 select-none font-sans">
      {imageUrl && (
        <div className="w-16 h-16 bg-gray-100 border border-black/10 flex-shrink-0 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p className="text-[10px] font-black text-green-600 uppercase tracking-widest leading-none">
            Added to Cart!
          </p>
          <h4 className="font-street text-base text-black uppercase mt-1 truncate max-w-[170px] leading-tight">
            {product?.name}
          </h4>
          <p className="text-[10px] font-bold text-gray-500 uppercase mt-0.5">
            Size: <span className="text-black font-extrabold">{size}</span>
          </p>
        </div>
        <div className="mt-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate('/cart');
            }}
            className="text-[10px] font-black tracking-widest uppercase border-b-2 border-black pb-0.5 hover:text-green-600 hover:border-green-600 transition-all cursor-pointer"
          >
            Go to Cart &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartToast;
