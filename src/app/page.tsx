'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';
import { PurchaseDialog } from '@/components/purchase-dialog';
import { ShoppingBag, Ticket, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

type NavSection = 'meeting' | 'goods';

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

export default function Home() {
  const [activeSection, setActiveSection] = useState<NavSection>('meeting');
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);

  const goodsItems: GoodsItem[] = [
    {
      id: 'tshirt',
      name: '반팔티',
      price: 35000,
      sizes: ['S', 'M', 'L'],
      images: {
        info: 'https://picsum.photos/800/600?random=tshirt-info',
        sizeChart: 'https://picsum.photos/800/600?random=tshirt-size',
      },
    },
    {
      id: 'hoodie',
      name: '후드티',
      price: 65000,
      sizes: ['M', 'L'],
      images: {
        info: 'https://picsum.photos/800/600?random=hoodie-info',
        sizeChart: 'https://picsum.photos/800/600?random=hoodie-size',
      },
    },
    {
      id: 'keyring',
      name: '아크릴키링',
      price: 12000,
      options: ['Love it', 'Miss Me'],
      images: {
        info: 'https://picsum.photos/800/600?random=keyring-info',
        sizeChart: 'https://picsum.photos/800/600?random=keyring-size',
      },
    },
    {
      id: 'stand',
      name: '아크릴 스탠드',
      price: 15000,
      options: ['000mm x 000mm'],
      images: {
        info: 'https://picsum.photos/800/600?random=stand-info',
        sizeChart: 'https://picsum.photos/800/600?random=stand-size',
      },
    },
    {
      id: 'photocard',
      name: '포토카드',
      price: 5000,
      options: ['6종'],
      images: {
        info: 'https://picsum.photos/800/600?random=photocard-info',
      },
    },
  ];

  const totalSelectedCount = 0;

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />

      {activeSection === 'meeting' && (
        <section className="flex-1 bg-primary-light/30">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-8">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-dark mb-4">
                  팬미팅 정보
                </h2>
                <p className="text-lg text-grayscale-600 font-body">
                  유메키와 함께하는 특별한 시간을 준비하세요
                </p>
              </div>

              <Card className="border-2 border-primary-light overflow-hidden">
                <div className="relative w-full h-[600px] bg-primary-light">
                  <Image
                    src="https://picsum.photos/1200/800?random=meeting"
                    alt="팬미팅 상세 정보"
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'goods' && (
        <section className="flex-1 bg-primary-light/30 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-dark mb-4">
                굿즈 정보
              </h2>
              <p className="text-lg text-grayscale-600 font-body">
                한정판 굿즈를 지금 바로 구매하세요
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* 공통 상세페이지 이미지 */}
              <Card className="border-2 border-primary-light overflow-hidden">
                <div className="relative w-full h-auto">
                  <Image
                    src="https://picsum.photos/1200/800?random=common-detail"
                    alt="공통 상세페이지"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </Card>

              {/* 굿즈별 정보 */}
              {goodsItems.map((item) => (
                <div key={item.id} className="space-y-6">
                  {/* 상품 정보 이미지 */}
                  <Card className="border-2 border-primary-light overflow-hidden">
                    <div className="relative w-full h-auto">
                      <Image
                        src={item.images.info}
                        alt={`${item.name} 정보`}
                        width={1200}
                        height={600}
                        className="w-full h-auto"
                      />
                    </div>
                  </Card>

                  {/* 사이즈표 이미지 (사이즈가 있는 경우만) */}
                  {item.images.sizeChart && (
                    <Card className="border-2 border-primary-light overflow-hidden">
                      <div className="relative w-full h-auto">
                        <Image
                          src={item.images.sizeChart}
                          alt={`${item.name} 사이즈표`}
                          width={1200}
                          height={600}
                          className="w-full h-auto"
                        />
                      </div>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 플로팅 버튼 (공연정보 섹션) */}
      {activeSection === 'meeting' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex gap-4">
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary-dark text-white text-lg px-12 py-6 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all"
            onClick={() => window.open('https://www.hypetown.kr/event/mguchc1l-z86g', '_blank')}
          >
            <Ticket className="w-5 h-5 mr-2" />
            티켓팅하기
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white hover:bg-primary-light text-primary-dark border-2 border-primary-dark text-lg px-12 py-6 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all"
            onClick={() => setActiveSection('goods')}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            굿즈
          </Button>
        </div>
      )}

      {/* 플로팅 버튼 (굿즈 섹션) */}
      {activeSection === 'goods' && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex gap-4">
          <Button
            size="lg"
            variant="outline"
            className="bg-white hover:bg-primary-light text-primary-dark border-2 border-primary-dark text-lg px-10 py-6 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all"
            onClick={() => setActiveSection('meeting')}
          >
            <Ticket className="w-5 h-5 mr-2" />
            공연정보 확인하기
          </Button>
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary-dark text-white text-lg px-12 py-6 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all"
            onClick={() => setPurchaseDialogOpen(true)}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            구매하기
            {totalSelectedCount > 0 && (
              <span className="ml-2 bg-white text-secondary rounded-full px-2 py-0.5 text-sm font-bold">
                {totalSelectedCount}
              </span>
            )}
          </Button>
        </div>
      )}

      <PurchaseDialog
        items={goodsItems}
        open={purchaseDialogOpen}
        onOpenChange={setPurchaseDialogOpen}
      />
    </div>
  );
}
