'use client'
import React from 'react'
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function ProductSlider({ product }) {
    return <>
        <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 4000, })]} className="w-full">

            <CarouselContent className={'rounded-lg'}>
                {product.images.map((img, index) => (
                    <CarouselItem className={'rounded-lg'} key={index}>
                        <Card className={''}>
                            <CardContent className="flex items-center justify-center p-2">
                                <Image className="p-0 w-full min-w-40 max-w-70 md:w-full xl:p-0 object-cover rounded-lg" unoptimized width={500} height={500} src={img} alt={`product-image-${index}`} />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className={'hidden'} />
            <CarouselNext className={'hidden'} />
        </Carousel>
    </>
}
