'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Ruler } from 'lucide-react';

interface GoodsItem {
  id: string;
  name: string;
  price: number;
  sizes?: string[];
  options?: string[];
  images: {
    info: string;
    sizeChart?: string;
  };
}

interface SelectedProduct {
  itemId: string;
  itemName: string;
  price: number;
  variant: string;
  quantity: number;
}

interface PurchaseDialogProps {
  items: GoodsItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type DeliveryMethod = 'pickup' | 'domestic' | 'international';

export function PurchaseDialog({ items, open, onOpenChange }: PurchaseDialogProps) {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [step, setStep] = useState<'select' | 'delivery'>('select');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [selectedSizeChart, setSelectedSizeChart] = useState<{ name: string; image: string } | null>(null);

  useEffect(() => {
    if (open) {
      const products: SelectedProduct[] = [];
      items.forEach((item) => {
        if (item.sizes && item.sizes.length > 0) {
          item.sizes.forEach((size) => {
            products.push({
              itemId: item.id,
              itemName: item.name,
              price: item.price,
              variant: size,
              quantity: 0,
            });
          });
        } else if (item.options && item.options.length > 0) {
          item.options.forEach((option) => {
            products.push({
              itemId: item.id,
              itemName: item.name,
              price: item.price,
              variant: option,
              quantity: 0,
            });
          });
        } else {
          products.push({
            itemId: item.id,
            itemName: item.name,
            price: item.price,
            variant: '',
            quantity: 0,
          });
        }
      });
      setSelectedProducts(products);
      setStep('select');
      setDeliveryMethod('pickup');
    }
  }, [open, items]);

  const updateQuantity = (itemId: string, variant: string, quantity: number) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.itemId === itemId && product.variant === variant
          ? { ...product, quantity: Math.max(0, quantity) }
          : product
      )
    );
  };

  const deliveryFee = {
    pickup: 0,
    domestic: 3000,
    international: 12000,
  };

  const validProducts = selectedProducts.filter((p) => p.quantity > 0);
  const subtotal = validProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shippingFee = validProducts.length > 0 ? deliveryFee[deliveryMethod] : 0;
  const total = subtotal + shippingFee;

  const handlePurchase = () => {
    if (step === 'select') {
      if (validProducts.length === 0) {
        return;
      }
      setStep('delivery');
    } else {
      console.log('결제 진행:', {
        products: validProducts,
        deliveryMethod,
        total,
      });
      alert('결제가 진행됩니다. (실제 결제 연동 필요)');
      onOpenChange(false);
    }
  };

  const groupedItems = items.map((item) => {
    const itemProducts = selectedProducts.filter((p) => p.itemId === item.id);
    return { item, products: itemProducts };
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary-dark">
            {step === 'select' ? '굿즈 선택' : '배송 방법 선택'}
          </DialogTitle>
          <DialogDescription>
            원하는 굿즈를 선택하고 수량을 입력해주세요
          </DialogDescription>
        </DialogHeader>

        {step === 'select' && (
          <div className="space-y-6 py-4">
            {groupedItems.map(({ item, products }) => (
              <div
                key={item.id}
                className="border-2 border-primary-light rounded-lg p-4 space-y-3"
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-primary-light">
                    <Image
                      src={item.images.info}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg text-primary-dark">{item.name}</h3>
                        <p className="text-grayscale-600 mt-1">
                          {item.price.toLocaleString()}원
                        </p>
                      </div>
                      {item.images.sizeChart && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            setSelectedSizeChart({
                              name: item.name,
                              image: item.images.sizeChart!,
                            });
                            setSizeChartOpen(true);
                          }}
                        >
                          <Ruler className="w-4 h-4 mr-1" />
                          사이즈표
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {products.map((product) => (
                    <div
                      key={`${product.itemId}-${product.variant}`}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 font-medium text-primary-dark">
                        {product.variant || item.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(product.itemId, product.variant, product.quantity - 1)
                          }
                          disabled={product.quantity <= 0}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          min="0"
                          value={product.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            updateQuantity(product.itemId, product.variant, val);
                          }}
                          className="text-center w-16 h-8"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(product.itemId, product.variant, product.quantity + 1)
                          }
                        >
                          +
                        </Button>
                        {product.quantity > 0 && (
                          <span className="ml-3 text-sm text-grayscale-600 min-w-[80px] text-right">
                            {(item.price * product.quantity).toLocaleString()}원
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {validProducts.length === 0 && (
              <div className="text-center py-8 text-grayscale-500">
                구매할 굿즈를 선택해주세요
              </div>
            )}

            {validProducts.length > 0 && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-lg">
                    <span className="text-grayscale-600">상품 금액</span>
                    <span className="font-semibold">{subtotal.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-secondary">
                    <span>총 결제 금액</span>
                    <span>{subtotal.toLocaleString()}원</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {step === 'delivery' && (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <Label className="text-base font-semibold">배송 방법 선택</Label>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={(value) => setDeliveryMethod(value as DeliveryMethod)}
              >
                <div className="flex items-center space-x-2 p-4 border-2 border-primary-light rounded-lg hover:border-secondary transition-colors">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="font-semibold">팬미팅 현장에서 수령하기</div>
                    <div className="text-sm text-grayscale-600">
                      11월 9일 백암아트홀
                    </div>
                    <div className="text-sm text-grayscale-500 mt-1">배송비 무료</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border-2 border-primary-light rounded-lg hover:border-secondary transition-colors">
                  <RadioGroupItem value="domestic" id="domestic" />
                  <Label htmlFor="domestic" className="flex-1 cursor-pointer">
                    <div className="font-semibold">배송받기 (국내)</div>
                    <div className="text-sm text-grayscale-500 mt-1">
                      배송비 3,000원
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border-2 border-primary-light rounded-lg hover:border-secondary transition-colors">
                  <RadioGroupItem value="international" id="international" />
                  <Label htmlFor="international" className="flex-1 cursor-pointer">
                    <div className="font-semibold">배송받기 (해외)</div>
                    <div className="text-sm text-grayscale-500 mt-1">
                      배송비 12,000원
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-2 bg-primary-light/30 p-4 rounded-lg">
              {validProducts.map((product) => {
                const item = items.find((i) => i.id === product.itemId);
                return (
                  <div
                    key={`${product.itemId}-${product.variant}`}
                    className="flex justify-between text-sm text-grayscale-600"
                  >
                    <span>
                      {product.itemName}{' '}
                      {product.variant && `(${product.variant})`} x{product.quantity}
                    </span>
                    <span>
                      {(product.price * product.quantity).toLocaleString()}원
                    </span>
                  </div>
                );
              })}
              <Separator />
              <div className="flex justify-between text-base">
                <span className="text-grayscale-600">상품 금액</span>
                <span className="font-semibold">{subtotal.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-grayscale-600">배송비</span>
                <span className="font-semibold">{shippingFee.toLocaleString()}원</span>
              </div>
              <Separator />
              <div className="flex justify-between text-2xl font-bold text-secondary">
                <span>최종 결제 금액</span>
                <span>{total.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex gap-2">
          {step === 'delivery' && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep('select')}
            >
              이전
            </Button>
          )}
          <Button
            type="button"
            className="bg-secondary hover:bg-secondary-dark text-white flex-1"
            onClick={handlePurchase}
            disabled={step === 'select' && validProducts.length === 0}
          >
            {step === 'select' ? '결제하기' : '결제 진행'}
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* 사이즈표 이미지 팝업 */}
      <Dialog open={sizeChartOpen} onOpenChange={setSizeChartOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary-dark">
              {selectedSizeChart?.name} 사이즈표
            </DialogTitle>
          </DialogHeader>
          {selectedSizeChart && (
            <div className="relative w-full h-auto">
              <Image
                src={selectedSizeChart.image}
                alt={`${selectedSizeChart.name} 사이즈표`}
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
