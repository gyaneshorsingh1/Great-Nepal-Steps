
-- Fix 1: Remove public coupon enumeration and create RPC validation function
DROP POLICY IF EXISTS "Anyone can validate coupons" ON public.coupons;

CREATE OR REPLACE FUNCTION public.validate_coupon(coupon_code TEXT)
RETURNS TABLE(is_valid BOOLEAN, discount_percentage NUMERIC)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (c.is_active AND (c.expiry_date IS NULL OR c.expiry_date > NOW()))::BOOLEAN,
    c.discount_percentage
  FROM coupons c
  WHERE c.code = coupon_code
  LIMIT 1;
END;
$$;

-- Fix 2: Add database constraints for input validation
ALTER TABLE public.orders ADD CONSTRAINT positive_total_amount CHECK (total_amount >= 0);
ALTER TABLE public.orders ADD CONSTRAINT positive_delivery_charge CHECK (delivery_charge >= 0);
ALTER TABLE public.products ADD CONSTRAINT positive_price CHECK (price >= 0);
ALTER TABLE public.products ADD CONSTRAINT valid_stock CHECK (stock >= 0);
ALTER TABLE public.products ADD CONSTRAINT positive_discount CHECK (discount_price IS NULL OR discount_price >= 0);
