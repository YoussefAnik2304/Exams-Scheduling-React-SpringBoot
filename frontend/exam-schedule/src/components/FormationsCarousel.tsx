import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarousel } from "@/components/ui/EmblaCarousel"
import { DotButton, useDotButton } from './ui/EmblaCarouselDotButton'
import "../stylesheets/embla.css"

class Formation {
	title: string;
	description: string;
	imageUrl: string;

	constructor(title: string, description: string, imageUrl: string) {
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
	}
}

type PropType = {
	slides: Formation[]
	options?: EmblaOptionsType
}

const FormationsCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 2000 })])
	const [slidesInView, setSlidesInView] = useState<number[]>([])

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi)

	const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
		setSlidesInView((slidesInView) => {
			if (slidesInView.length === emblaApi.slideNodes().length) {
				emblaApi.off('slidesInView', updateSlidesInView)
			}
			const inView = emblaApi
				.slidesInView()
				.filter((index) => !slidesInView.includes(index))
			return slidesInView.concat(inView)
		})
	}, [])

	useEffect(() => {
		if (!emblaApi) return

		updateSlidesInView(emblaApi)
		emblaApi.on('slidesInView', updateSlidesInView)
		emblaApi.on('reInit', updateSlidesInView)
	}, [emblaApi, updateSlidesInView])

	return (
		<div className="embla">
			<div className="overflow-hidden rounded-3xl" ref={emblaRef}>
				<div className="embla__container flex">
					{slides.map((formation, index) => (
						<EmblaCarousel inView={slidesInView.indexOf(index) > -1} key={index} index={index} formation={formation} />
					))}
				</div>
			</div>

			<div className="flex justify-center items-center mt-7">
				<div className="flex flex-nowrap justify-center items-center gap-x-2.5">
					{scrollSnaps.map((_: number, index: number) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={'cursor-pointer rounded-full w-2 h-2 bg-gray-400 '.concat(
								index === selectedIndex ? 'bg-[#343fff] w-5 transition-all duration-300' : ''
							)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default FormationsCarousel;
