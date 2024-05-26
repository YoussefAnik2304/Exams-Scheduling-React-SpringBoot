import university from "../assets/images/univ.png";

export function About() {
  return (
    <section id="about" className="container py-20 md:py-20">
      <div className="bg-muted/50 border rounded-xl py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={university}
            alt=""
            className="w-[400px] h-[300px] object-cover rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-primary">
                  About{" "}
                </span>
                Examify
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Examify is an advanced exam management application created for the Ecole Nationale des Sciences Appliquées d'Al-Hoceima (ENSAH).
                It simplifies exam scheduling and manages exam rooms and personnel efficiently.
                <br/>Examify enhances the organization and supervision of exams,
                contributing to a smoother and more effective evaluation process at ENSAH.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
