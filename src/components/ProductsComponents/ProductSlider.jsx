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
                                <Image className="p-0 w-1/2 md:w-full md:p-5 xl:w-3/4 xl:p-0 object-cover" width={500} height={500} src={img} alt={`product-image-${index}`} />
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
