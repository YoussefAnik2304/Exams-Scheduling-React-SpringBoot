
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
type EmblaCarouselProps = {
	inView: boolean;
	index: number;
	formation: Formation;
}

export const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ inView, formation }) => {
	return (
		<div className={`embla__slide ${inView ? 'is-visible' : ''} flex justify-center items-center p-4`}>

				<section id="formation" className="container py-20 md:py-20">
					<div className="bg-muted/50 border rounded-xl py-12">
						<div className="px-6 flex flex-col gap-8 md:gap-12">
							<img
								src={formation.imageUrl}
								alt={formation.title}
								className="formation-image w-full h-48 object-cover rounded-lg mb-1"
							/>
							<div className="bg-green-0 flex flex-col justify-between">
								<div className="pb-6">
									<h3 className="formation-title text-2xl font-semibold mb-2">
										{formation.title}
									</h3>
									<p className="formation-description text-muted-foreground">
										{formation.description}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>


		</div>
	);
};
