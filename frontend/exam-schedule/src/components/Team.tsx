import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import YoussefImage from "../assets/images/youssef.jpg"
import AchrafImage from "../assets/images/achraf.png"



interface TeamProps {
  image: string
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    image: AchrafImage,
    name: "Achraf Dahraoui",
    position: "Computer Science Student",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/achraf-dahraoui-a3276a200/" },

      {
        name: "GitHub",
        url: "https://github.com/achrafdaa/",
      },
    ],
  },
  {
    image: YoussefImage,
    name: "Youssef Anik",
    position: "Computer Science Student",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/youssef-anik-937b92273/" },

      {
        name: "GitHub",
        url: "",
      },
    ],
  },
];

export function Team() {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin size-5" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
              </svg>;

      case "GitHub":
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github size-5" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
              </svg>;
    }
  };

  return (
      <section id="team" className="container mx-auto py-10 sm:py-20">
        <h2 className="text-center text-3xl md:text-4xl font-bold">
        <span className="text-primary">
          Our Dedicated{" "}
        </span>
          Crew
        </h2>

        <p className="text-center mt-4 mb-10 text-xl text-muted-foreground">
            Experience Excellence: Meet Our Hardworking Team
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 gap-y-10">
          {teamList.map(
              ({image, name, position, socialNetworks}: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="flex justify-center items-center pb-2">
                  <div className="h-28 aspect-square mb-2">
                      <img className="h-full w-full rounded-full object-cover" src={image}  alt="image"/>
                  </div>
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>

              {/**<CardContent className="text-center pb-2">*/}
              {/*  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>*/}
              {/*</CardContent>*/}

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
}
